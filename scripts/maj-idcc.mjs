// Mise a jour automatique de data/idcc.json depuis la liste officielle
// des conventions collectives publiee en open data (data.gouv.fr).
//
// IMPORTANT avant la premiere execution :
// 1. Verifier le slug exact du jeu de donnees sur data.gouv.fr
//    (rechercher "liste des conventions collectives" ; jeu tenu par le
//    ministere du Travail / DARES) et le reporter dans DATASET_SLUG.
// 2. Verifier les noms de colonnes du fichier (IDCC / TITRE / statut)
//    et ajuster la fonction normaliserLigne si besoin.
//
// Execution locale : node scripts/maj-idcc.mjs
// Execution automatique : .github/workflows/maj-idcc.yml (mensuelle).

import { writeFileSync, readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const DATASET_SLUG = "liste-des-conventions-collectives"; // TODO : verifier sur data.gouv.fr
const API = `https://www.data.gouv.fr/api/1/datasets/${DATASET_SLUG}/`;

function normaliserLigne(ligne) {
  // Adapter les cles aux entetes reelles du fichier officiel.
  const idccBrut = String(ligne.IDCC ?? ligne.idcc ?? ligne["Code IDCC"] ?? "").trim();
  const titre = String(ligne.TITRE ?? ligne.titre ?? ligne["Intitulé"] ?? ligne["Titre de la convention"] ?? "").trim();
  if (!idccBrut || !titre) return null;
  const idcc = idccBrut.padStart(4, "0");
  const statutBrut = String(ligne.STATUT ?? ligne.statut ?? ligne["Etat"] ?? "").toLowerCase();
  const fusion = String(ligne.FUSION ?? ligne["IDCC de rattachement"] ?? "").trim();
  const item = {
    idcc,
    titre,
    statut: statutBrut.includes("fusion") || fusion ? "fusionnee" : "en_vigueur",
  };
  if (fusion) item.fusionDans = fusion.padStart(4, "0");
  return item;
}

async function principal() {
  const reponseDataset = await fetch(API);
  if (!reponseDataset.ok) throw new Error(`Dataset introuvable : ${reponseDataset.status}`);
  const dataset = await reponseDataset.json();

  const ressource = dataset.resources.find((r) =>
    ["xlsx", "xls", "csv"].includes((r.format || "").toLowerCase())
  );
  if (!ressource) throw new Error("Aucune ressource xlsx/csv dans le jeu de donnees");

  const reponseFichier = await fetch(ressource.url);
  if (!reponseFichier.ok) throw new Error(`Telechargement impossible : ${reponseFichier.status}`);
  const tampon = Buffer.from(await reponseFichier.arrayBuffer());

  const classeur = XLSX.read(tampon);
  const feuille = classeur.Sheets[classeur.SheetNames[0]];
  const lignes = XLSX.utils.sheet_to_json(feuille);

  const conventions = lignes
    .map(normaliserLigne)
    .filter(Boolean)
    .sort((a, b) => a.idcc.localeCompare(b.idcc));

  if (conventions.length < 300) {
    throw new Error(
      `Seulement ${conventions.length} conventions extraites : entetes de colonnes probablement a ajuster dans normaliserLigne, abandon sans ecraser le fichier.`
    );
  }

  const precedent = JSON.parse(readFileSync("data/idcc.json", "utf-8"));
  const contenu = {
    source: `${ressource.url} (data.gouv.fr, jeu "${dataset.title}")`,
    derniereMiseAJour: new Date().toISOString().slice(0, 10),
    conventions,
  };

  if (JSON.stringify(precedent.conventions) === JSON.stringify(conventions)) {
    console.log("Aucun changement dans la liste officielle.");
    return;
  }

  writeFileSync("data/idcc.json", JSON.stringify(contenu, null, 2) + "\n", "utf-8");
  console.log(`data/idcc.json mis a jour : ${conventions.length} conventions.`);
}

principal().catch((erreur) => {
  console.error(erreur);
  process.exit(1);
});
