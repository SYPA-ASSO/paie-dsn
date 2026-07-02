"use client";

import { useState } from "react";

// Taux horaire de base : saisie + DSN (decision cabinet).
const TAUX_HORAIRE = 23;

// Temps de traitement estime par bulletin, en minutes, selon la complexite
// de la convention collective (constantes ajustables).
const MINUTES_COURANTE = 30;
const MINUTES_PARTICULARITES = 40;
const MINUTES_COMPLEXE = 50;

const conventions: {
  groupe: string;
  minutes: number;
  items: string[];
}[] = [
  {
    groupe: "Conventions courantes",
    minutes: MINUTES_COURANTE,
    items: [
      "Commerce de détail et de gros à prédominance alimentaire (IDCC 2216)",
      "Commerces de détail non alimentaires (IDCC 1517)",
      "Commerces de gros (IDCC 573)",
      "Bureaux d'études techniques SYNTEC (IDCC 1486)",
      "Métallurgie (IDCC 3248)",
      "Immobilier (IDCC 1527)",
      "Pharmacie d'officine (IDCC 1996)",
      "Personnel des cabinets d'avocats (IDCC 1000)",
      "Cabinets médicaux (IDCC 1147)",
      "Cabinets dentaires (IDCC 1619)",
      "Particuliers employeurs et emploi à domicile (IDCC 3239)",
      "Experts-comptables et commissaires aux comptes (IDCC 787)",
      "Notariat (IDCC 2205)",
      "Services de l'automobile (IDCC 1090)",
      "Coiffure (IDCC 2596)",
      "Esthétique-cosmétique (IDCC 3032)",
      "Boulangerie-pâtisserie artisanale (IDCC 843)",
      "Fleuristes et animaux familiers (IDCC 1978)",
      "Optique-lunetterie de détail (IDCC 1431)",
      "Prestataires de services du secteur tertiaire (IDCC 2098)",
      "Organismes de formation (IDCC 1516)",
      "Enseignement privé non lucratif EPNL (IDCC 3218)",
      "Publicité (IDCC 86)",
      "Banque (IDCC 2120)",
      "Sociétés d'assurances (IDCC 1672)",
      "Courtage d'assurances et de réassurances (IDCC 2247)",
      "Mutualité (IDCC 2128)",
      "Industries chimiques (IDCC 44)",
      "Autre convention courante",
    ],
  },
  {
    groupe: "Conventions à particularités",
    minutes: MINUTES_PARTICULARITES,
    items: [
      "Hôtels, cafés, restaurants HCR (IDCC 1979)",
      "Restauration rapide (IDCC 1501)",
      "Restauration collective (IDCC 1266)",
      "Animation ÉCLAT (IDCC 1518)",
      "Sport (IDCC 2511)",
      "Aide, accompagnement, soins et services à domicile (IDCC 2941)",
      "Entreprises de services à la personne (IDCC 3127)",
      "Acteurs du lien social et familial ALISFA (IDCC 1261)",
      "Établissements privés sanitaires et sociaux CCN 51 (IDCC 0029)",
      "Établissements et services pour personnes inadaptées CCN 66 (IDCC 0413)",
      "Hospitalisation privée (IDCC 2264)",
      "Propreté (IDCC 3043)",
      "Prévention et sécurité (IDCC 1351)",
      "Transports routiers (IDCC 16)",
      "Gardiens, concierges et employés d'immeuble (IDCC 1043)",
      "Autre convention à particularités",
    ],
  },
  {
    groupe: "Conventions complexes (caisses ou régimes spécifiques)",
    minutes: MINUTES_COMPLEXE,
    items: [
      "Bâtiment, ouvriers jusqu'à 10 salariés (IDCC 1596)",
      "Bâtiment, ouvriers de plus de 10 salariés (IDCC 1597)",
      "Bâtiment, ETAM (IDCC 2609)",
      "Bâtiment, cadres (IDCC 2420)",
      "Travaux publics, ouvriers (IDCC 1702)",
      "Travaux publics, ETAM (IDCC 2614)",
      "Travaux publics, cadres (IDCC 3212)",
      "Autre convention à caisse ou régime spécifique",
    ],
  },
];

// Degressivite selon le volume mensuel (constantes ajustables).
function coefVolume(nb: number): number {
  if (nb <= 1) return 1;
  if (nb <= 4) return 0.97;
  if (nb <= 9) return 0.94;
  if (nb <= 19) return 0.9;
  return 0.85;
}

function arrondi50(valeur: number): number {
  return Math.round(valeur * 2) / 2;
}

function formatEuro(valeur: number): string {
  const texte = valeur.toFixed(2).replace(".", ",").replace(",00", "");
  return `${texte}\u00a0€`;
}

export default function Simulateur() {
  const [minutes, setMinutes] = useState(MINUTES_COURANTE);
  const [nb, setNb] = useState(1);

  const surDevis = nb >= 50;
  const prixBulletin = arrondi50(
    TAUX_HORAIRE * (minutes / 60) * coefVolume(nb)
  );
  const forfait = arrondi50(prixBulletin * nb);

  return (
    <div className="rounded-2xl border border-line bg-white p-8 shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink/60">
        Simulateur de tarif
      </p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
        Estimez votre forfait mensuel
      </p>

      <p className="mt-4 rounded-xl border border-amber-brand/40 bg-amber-tint p-4 text-sm leading-relaxed text-ink">
        Estimation indicative et non contractuelle, qui n&apos;engage pas le
        cabinet, pour des contrats à temps complet. Hors ouverture de dossier
        et hors reprise éventuelle de l&apos;historique (bulletins et DSN
        antérieurs), dont le coût dépend du nombre de salariés, de
        l&apos;historique à reprendre et de votre convention collective : ces
        montants figurent au devis. Convention non listée ou situation
        particulière : contactez-nous.
      </p>

      <label className="mt-5 block text-sm font-semibold text-navy">
        Votre convention collective
        <select
          className="mt-2 w-full rounded-lg border border-line bg-ivory px-3 py-2.5 text-sm text-ink"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
        >
          {conventions.map((groupe) => (
            <optgroup key={groupe.groupe} label={groupe.groupe}>
              {groupe.items.map((nom) => (
                <option key={nom} value={groupe.minutes}>
                  {nom}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-semibold text-navy">
        Nombre de bulletins par mois : {nb >= 50 ? "50 et plus" : nb}
        <input
          type="range"
          min={1}
          max={50}
          value={nb}
          onChange={(e) => setNb(Number(e.target.value))}
          className="mt-2 w-full accent-[#00a878]"
        />
      </label>

      <div className="mt-5 rounded-xl bg-emerald-tint p-5 text-center">
        {surDevis ? (
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-emerald-deep">
            Sur devis personnalisé
          </p>
        ) : (
          <>
            <p className="text-sm text-ink/70">
              Estimation indicative, sans engagement du cabinet
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-emerald-deep">
              à partir de {formatEuro(forfait)}
              <span className="text-base font-semibold text-ink/70">
                {" "}
                / mois
              </span>
            </p>
            <p className="mt-1 text-sm text-ink/70">
              soit {formatEuro(prixBulletin)} par bulletin
            </p>
          </>
        )}
      </div>

      <a
        href="#contact"
        className="mt-5 inline-block w-full rounded-full bg-emerald-brand px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-emerald-deep"
      >
        Obtenir mon devis précis sous 48&nbsp;heures
      </a>
    </div>
  );
}
