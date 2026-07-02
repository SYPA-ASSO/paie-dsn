// Mise a jour de data/idcc.json depuis la liste officielle mensuelle
// "Liste des conventions collectives et de leur code IDCC" (Dares / DGT),
// publiee sur la page nomenclatures de travail-emploi.gouv.fr.
// Le lien du fichier change chaque mois : le script scanne la page pour
// trouver le dernier xlsx, le telecharge et le parse.
// Les conventions fusionnees (absentes de la liste officielle, qui ne
// contient que les conventions en vigueur) sont conservees via
// data/idcc-fusions.json pour le maillage "fusionnee dans l'IDCC X".
//
// Execution locale : npm install xlsx --no-save && node scripts/maj-idcc.mjs
// Execution automatique : .github/workflows/maj-idcc.yml (mensuelle).

import { writeFileSync, readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const PAGE_NOMENCLATURES =
  "https://travail-emploi.gouv.fr/dialogue-social/negociation-collective/article/conventions-collectives-nomenclatures";

async function trouverUrlXlsx() {
  const reponse = await fetch(PAGE_NOMENCLATURES, {
    headers: { "User-Agent": "paie-et-dsn.fr (mise a jour referentiel IDCC)" },
    redirect: "follow",
  });
  if (!reponse.ok) throw new Error(`Page nomenclatures inaccessible : ${reponse.status}`);
  const html = await reponse.text();
  const motifs = [
    /href="([^"]*[Ll]iste[^"]*[Cc]onventions[^"]*\.xlsx)"/,
    /href="([^"]*IDCC[^"]*\.xlsx)"/i,
    /href="([^"]*\.xlsx)"/,
  ];
  for (const motif of motifs) {
    const m = html.match(motif);
    if (m) {
      const url = m[1];
      return url.startsWith("http") ? url : `https://travail-emploi.gouv.fr${url}`;
    }
  }
  throw new Error("Aucun lien xlsx trouve sur la page nomenclatures : verifier PAGE_NOMENCLATURES et les motifs.");
}

function normaliserLigne(ligne) {
  const cles = Object.keys(ligne);
  const cleIdcc = cles.find((c) => c.trim().toUpperCase().includes("IDCC"));
  const cleTitre = cles.find((c) => c.trim().toUpperCase().includes("TITRE"));
  if (!cleIdcc || !cleTitre) return null;
  const idccBrut = String(ligne[cleIdcc] ?? "").trim();
  const titre = String(ligne[cleTitre] ?? "").trim();
  if (!idccBrut || !titre || !/^\d+$/.test(idccBrut)) return null;
  return { idcc: idccBrut.padStart(4, "0"), titre, statut: "en_vigueur" };
}

async function principal() {
  const urlXlsx = await trouverUrlXlsx();
  console.log("Fichier officiel :", urlXlsx);
  const fichier = await fetch(urlXlsx, { redirect: "follow" });
  if (!fichier.ok) throw new Error(`Telechargement impossible : ${fichier.status}`);
  const tampon = Buffer.from(await fichier.arrayBuffer());

  const classeur = XLSX.read(tampon);
  let conventions = [];
  for (const nomFeuille of classeur.SheetNames) {
    const lignes = XLSX.utils.sheet_to_json(classeur.Sheets[nomFeuille]);
    const extraites = lignes.map(normaliserLigne).filter(Boolean);
    if (extraites.length > conventions.length) conventions = extraites;
  }

  if (conventions.length < 300) {
    throw new Error(
      `Seulement ${conventions.length} conventions extraites : structure du fichier a verifier, abandon sans ecraser data/idcc.json.`
    );
  }

  // Conventions fusionnees conservees pour le maillage (hors liste officielle)
  const fusions = JSON.parse(readFileSync("data/idcc-fusions.json", "utf-8"));
  const codesEnVigueur = new Set(conventions.map((c) => c.idcc));
  for (const f of fusions) {
    if (!codesEnVigueur.has(f.idcc)) conventions.push({ ...f, statut: "fusionnee" });
  }
  conventions.sort((a, b) => a.idcc.localeCompare(b.idcc));

  const precedent = JSON.parse(readFileSync("data/idcc.json", "utf-8"));
  if (JSON.stringify(precedent.conventions) === JSON.stringify(conventions)) {
    console.log("Aucun changement dans la liste officielle.");
    return;
  }

  writeFileSync(
    "data/idcc.json",
    JSON.stringify(
      {
        source: `${urlXlsx} (Dares/DGT, via ${PAGE_NOMENCLATURES})`,
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
