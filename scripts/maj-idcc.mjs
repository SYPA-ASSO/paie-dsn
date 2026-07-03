// Mise a jour de data/idcc.json depuis le referentiel officiel du ministere du Travail.
//
// DEPUIS LE 1ER JUIN 2026 : la liste mensuelle des conventions en vigueur est
// remplacee par un "Fichier de suivi historique des conventions collectives"
// (Dares / DG Travail / ministere de l'Agriculture), publie sur
// https://travail-emploi.gouv.fr/conventions-collectives-nomenclatures
// Ce fichier recense conventions, accords et statuts, en vigueur OU NON,
// avec dates de signature, d'effet et de fin. Le script filtre donc pour ne
// conserver que les textes encore en vigueur (sans date de fin / etat vigueur).
//
// Les conventions fusionnees utiles au maillage du site restent gerees via
// data/idcc-fusions.json.
//
// IMPORTANT (juillet 2026) : le site du ministere est protege par un captcha
// anti-robots (Cegedim). Le telechargement automatique echoue donc. PROCEDURE
// MANUELLE MENSUELLE (5 minutes) :
//   1. Ouvrir dans un navigateur :
//      https://travail-emploi.gouv.fr/conventions-collectives-nomenclatures
//   2. Telecharger "Fichier de suivi historique des conventions collectives" (xlsx)
//   3. node scripts/maj-idcc.mjs "C:/chemin/vers/le-fichier.xlsx"
//   4. git add data/idcc.json && git status && git commit -m "maj: referentiel IDCC" && git push
// Le script tente aussi le telechargement direct (au cas ou la protection
// serait levee un jour), et une automatisation via l'API Legifrance (PISTE)
// pourra etre branchee si le cabinet cree des identifiants gratuits sur
// piste.gouv.fr (me le demander).

import { writeFileSync, readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const PAGES_NOMENCLATURES = [
  "https://travail-emploi.gouv.fr/conventions-collectives-nomenclatures",
  "https://travail-emploi.gouv.fr/dialogue-social/negociation-collective/article/conventions-collectives-nomenclatures",
];

const MIN_CONVENTIONS = 300;
const MAX_CONVENTIONS = 2000;

function normaliser(texte) {
  return String(texte ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

async function trouverUrlXlsx() {
  let derniereErreur = null;
  for (const page of PAGES_NOMENCLATURES) {
    try {
      const reponse = await fetch(page, {
        headers: { "User-Agent": "Mozilla/5.0 (paie-et-dsn.fr referentiel IDCC)" },
        redirect: "follow",
      });
      if (!reponse.ok) {
        derniereErreur = new Error(`${page} -> HTTP ${reponse.status}`);
        continue;
      }
      const html = await reponse.text();
      const liens = [...html.matchAll(/href="([^"]+\.xlsx)"/gi)].map((m) => m[1]);
      console.log(`Page ${page} : ${liens.length} lien(s) xlsx trouve(s).`);
      if (liens.length === 0) continue;
      // Priorite au fichier de suivi historique, puis a l'ancienne liste,
      // en excluant les fichiers annexes (correspondance Acemo, classification).
      const score = (lien) => {
        const n = normaliser(decodeURIComponent(lien));
        if (n.includes("CORRESPONDANCE") || n.includes("CLASSIFICATION")) return -1;
        if (n.includes("SUIVI") || n.includes("HISTORIQUE")) return 3;
        if (n.includes("LISTE") && n.includes("CONVENTION")) return 2;
        if (n.includes("CONVENTION") || n.includes("IDCC")) return 1;
        return 0;
      };
      const candidats = liens
        .map((lien) => ({ lien, score: score(lien) }))
        .filter((c) => c.score >= 0)
        .sort((a, b) => b.score - a.score);
      if (candidats.length === 0) continue;
      const url = candidats[0].lien;
      return url.startsWith("http") ? url : `https://travail-emploi.gouv.fr${url}`;
    } catch (erreur) {
      derniereErreur = erreur;
    }
  }
  throw new Error(
    "Telechargement automatique impossible (le site du ministere est protege par un captcha). " +
      "Procedure manuelle : telecharger le Fichier de suivi historique depuis " +
      "https://travail-emploi.gouv.fr/conventions-collectives-nomenclatures puis executer " +
      "node scripts/maj-idcc.mjs <chemin-du-fichier.xlsx>. Derniere erreur : " +
      derniereErreur
  );
}

function detecterColonnes(lignes) {
  // Cherche la ligne d'en-tetes dans les 15 premieres lignes brutes
  for (let i = 0; i < Math.min(lignes.length, 15); i++) {
    const entetes = lignes[i].map((c) => normaliser(c));
    const colIdcc = entetes.findIndex((e) => e.includes("IDCC"));
    const colTitre = entetes.findIndex(
      (e) => e.includes("TITRE") || e.includes("INTITULE") || e.includes("LIBELLE")
    );
    if (colIdcc >= 0 && colTitre >= 0) {
      const colFin = entetes.findIndex((e) => e.includes("FIN"));
      const colEtat = entetes.findIndex(
        (e) => !e.includes("DATE") && (e.includes("ETAT") || e.includes("STATUT"))
      );
      const colNature = entetes.findIndex(
        (e) =>
          !e.includes("DATE") &&
          !e.includes("SIGNATURE") &&
          (e.includes("NATURE") || e === "TYPE" || e.includes("TYPE DE"))
      );
      console.log(
        `En-tetes ligne ${i + 1} : idcc=${entetes[colIdcc]}, titre=${entetes[colTitre]},` +
          ` fin=${colFin >= 0 ? entetes[colFin] : "absent"}, etat=${colEtat >= 0 ? entetes[colEtat] : "absent"},` +
          ` nature=${colNature >= 0 ? entetes[colNature] : "absent"}`
      );
      return { ligneEntetes: i, colIdcc, colTitre, colFin, colEtat, colNature };
    }
  }
  return null;
}

function extraireConventions(classeur) {
  let meilleur = [];
  for (const nomFeuille of classeur.SheetNames) {
    const lignes = XLSX.utils.sheet_to_json(classeur.Sheets[nomFeuille], {
      header: 1,
      raw: false,
      defval: "",
    });
    const colonnes = detecterColonnes(lignes);
    if (!colonnes) continue;

    const parIdcc = new Map();
    let exclusFin = 0;
    let exclusEtat = 0;
    let exclusNature = 0;
    let exclusForme = 0;

    const nettoyer = (valeur) =>
      String(valeur ?? "")
        .replace(/[\u00a0\u200b\ufeff]/g, " ")
        .trim();

    // Diagnostic : apercu des 3 premieres lignes de donnees
    for (let d = 1; d <= 3; d++) {
      const apercu = lignes[colonnes.ligneEntetes + d];
      if (apercu) {
        console.log(
          `  Apercu ligne ${colonnes.ligneEntetes + d + 1} : idcc=${JSON.stringify(apercu[colonnes.colIdcc])}` +
            ` titre=${JSON.stringify(String(apercu[colonnes.colTitre] ?? "").slice(0, 60))}` +
            (colonnes.colFin >= 0 ? ` fin=${JSON.stringify(apercu[colonnes.colFin])}` : "")
        );
      }
    }

    for (let i = colonnes.ligneEntetes + 1; i < lignes.length; i++) {
      const ligne = lignes[i];
      // Les IDCC du fichier Dares sont ecrits sur 5 chiffres ("00016") :
      // on accepte 1 a 5 chiffres et on normalise sur 4 (padStart apres parseInt).
      const idccBrut = nettoyer(ligne[colonnes.colIdcc]).replace(/\.0+$/, "");
      const titre = nettoyer(ligne[colonnes.colTitre]);
      if (!/^\d{1,5}$/.test(idccBrut) || !titre) {
        if (idccBrut || titre) exclusForme++;
        continue;
      }

      if (colonnes.colFin >= 0 && String(ligne[colonnes.colFin] ?? "").trim() !== "") {
        exclusFin++;
        continue; // texte termine : hors vigueur
      }
      if (colonnes.colEtat >= 0) {
        const etat = normaliser(ligne[colonnes.colEtat]);
        if (etat && !etat.includes("VIGUEUR")) {
          exclusEtat++;
          continue;
        }
      }
      if (colonnes.colNature >= 0) {
        const nature = normaliser(ligne[colonnes.colNature]);
        if (
          nature &&
          !nature.includes("CONVENTION") &&
          !nature.includes("STATUT") &&
          !nature.includes("CC")
        ) {
          exclusNature++;
          continue; // accords isoles, avenants...
        }
      }

      const idcc = String(parseInt(idccBrut, 10)).padStart(4, "0");
      if (!parIdcc.has(idcc)) {
        parIdcc.set(idcc, { idcc, titre, statut: "en_vigueur" });
      }
    }

    console.log(
      `Feuille "${nomFeuille}" : ${parIdcc.size} conventions retenues` +
        ` (exclus : ${exclusFin} terminees, ${exclusEtat} hors vigueur, ${exclusNature} autres natures, ${exclusForme} formes invalides).`
    );
    // Priorite absolue a la feuille dont le nom contient "convention" :
    // la feuille "Accords et statuts" ne doit jamais alimenter la liste.
    const feuilleConvention = normaliser(nomFeuille).includes("CONVENTION");
    const meilleureEstConvention = meilleur.feuilleConvention === true;
    if (
      (feuilleConvention && !meilleureEstConvention) ||
      (feuilleConvention === meilleureEstConvention && parIdcc.size > meilleur.length)
    ) {
      meilleur = [...parIdcc.values()];
      meilleur.feuilleConvention = feuilleConvention;
    }
  }
  return meilleur;
}

async function principal() {
  let tampon;
  let source;
  const cheminLocal = process.argv[2];
  if (cheminLocal) {
    console.log("Fichier local fourni :", cheminLocal);
    tampon = readFileSync(cheminLocal);
    source = "Fichier de suivi historique des conventions collectives (Dares/DG Travail), telecharge manuellement depuis travail-emploi.gouv.fr";
  } else {
    const urlXlsx = await trouverUrlXlsx();
    console.log("Fichier officiel :", urlXlsx);
    const fichier = await fetch(urlXlsx, {
      headers: { "User-Agent": "Mozilla/5.0 (paie-et-dsn.fr referentiel IDCC)" },
      redirect: "follow",
    });
    if (!fichier.ok) throw new Error(`Telechargement impossible : HTTP ${fichier.status}`);
    tampon = Buffer.from(await fichier.arrayBuffer());
    source = `${urlXlsx} (Dares/DG Travail)`;
  }
  const classeur = XLSX.read(tampon);
  console.log("Feuilles :", classeur.SheetNames.join(", "));

  let conventions = extraireConventions(classeur);

  if (conventions.length < MIN_CONVENTIONS || conventions.length > MAX_CONVENTIONS) {
    throw new Error(
      `${conventions.length} conventions extraites (attendu entre ${MIN_CONVENTIONS} et ${MAX_CONVENTIONS}) :` +
        ` structure du fichier a verifier, abandon sans ecraser data/idcc.json.`
    );
  }

  const fusions = JSON.parse(readFileSync("data/idcc-fusions.json", "utf-8"));
  const codes = new Set(conventions.map((c) => c.idcc));
  for (const f of fusions) {
    if (!codes.has(f.idcc)) conventions.push({ ...f, statut: "fusionnee" });
  }
  conventions.sort((a, b) => a.idcc.localeCompare(b.idcc));

  const precedent = JSON.parse(readFileSync("data/idcc.json", "utf-8"));
  if (JSON.stringify(precedent.conventions) === JSON.stringify(conventions)) {
    console.log("Aucun changement dans le referentiel officiel.");
    return;
  }

  writeFileSync(
    "data/idcc.json",
    JSON.stringify(
      {
        source,
        derniereMiseAJour: new Date().toISOString().slice(0, 10),
        conventions,
      },
      null,
      2
    ) + "\n",
    "utf-8"
  );
  console.log(`data/idcc.json mis a jour : ${conventions.length} conventions.`);
}

principal().catch((erreur) => {
  console.error(erreur);
  process.exit(1);
});
