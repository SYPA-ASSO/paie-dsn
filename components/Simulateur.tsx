"use client";

import { useMemo, useState } from "react";
import donnees from "@/data/idcc.json";

// Taux horaire de base : saisie + DSN (decision cabinet).
const TAUX_HORAIRE = 23;

// Temps de traitement estime par bulletin, en minutes (constantes ajustables).
const MINUTES_COURANTE = 40;
const MINUTES_PARTICULARITES = 50;
const MINUTES_COMPLEXE = 60;
const MINUTES_PAR_DEFAUT = MINUTES_PARTICULARITES; // conventions non encore classees

const PLAFOND_CURSEUR = 21; // 21 = "21 et plus" : sur devis

// Classement de complexite par IDCC (a enrichir au fil des dossiers).
const CLASSEMENT: Record<string, number> = {
  // Courantes (40 min)
  "2216": MINUTES_COURANTE, "1517": MINUTES_COURANTE, "0573": MINUTES_COURANTE,
  "1486": MINUTES_COURANTE, "3248": MINUTES_COURANTE, "1527": MINUTES_COURANTE,
  "1996": MINUTES_COURANTE, "1000": MINUTES_COURANTE, "1147": MINUTES_COURANTE,
  "1619": MINUTES_COURANTE, "3239": MINUTES_COURANTE, "0787": MINUTES_COURANTE,
  "2205": MINUTES_COURANTE, "1090": MINUTES_COURANTE, "2596": MINUTES_COURANTE,
  "3032": MINUTES_COURANTE, "0843": MINUTES_COURANTE, "1978": MINUTES_COURANTE,
  "1431": MINUTES_COURANTE, "2098": MINUTES_COURANTE, "1516": MINUTES_COURANTE,
  "3218": MINUTES_COURANTE, "0086": MINUTES_COURANTE, "2120": MINUTES_COURANTE,
  "1672": MINUTES_COURANTE, "2247": MINUTES_COURANTE, "2128": MINUTES_COURANTE,
  "0044": MINUTES_COURANTE,
  // Particularites (50 min)
  "1979": MINUTES_PARTICULARITES, "1501": MINUTES_PARTICULARITES,
  "1266": MINUTES_PARTICULARITES, "1518": MINUTES_PARTICULARITES,
  "2511": MINUTES_PARTICULARITES, "2941": MINUTES_PARTICULARITES,
  "3127": MINUTES_PARTICULARITES, "1261": MINUTES_PARTICULARITES,
  "0029": MINUTES_PARTICULARITES, "0413": MINUTES_PARTICULARITES,
  "2264": MINUTES_PARTICULARITES, "3043": MINUTES_PARTICULARITES,
  "1351": MINUTES_PARTICULARITES, "0016": MINUTES_PARTICULARITES,
  "1043": MINUTES_PARTICULARITES,
  // Complexes (60 min)
  "1596": MINUTES_COMPLEXE, "1597": MINUTES_COMPLEXE, "2609": MINUTES_COMPLEXE,
  "2420": MINUTES_COMPLEXE, "1702": MINUTES_COMPLEXE, "2614": MINUTES_COMPLEXE,
  "3212": MINUTES_COMPLEXE,
};

type Convention = { idcc: string; titre: string; statut: string; fusionDans?: string };
const conventions = (donnees.conventions as Convention[]).filter(
  (c) => c.statut === "en_vigueur"
);

function normaliser(texte: string): string {
  return texte.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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
  const [recherche, setRecherche] = useState("");
  const [selection, setSelection] = useState<Convention | null>(null);
  const [nb, setNb] = useState(1);

  const suggestions = useMemo(() => {
    const terme = normaliser(recherche.trim());
    if (terme.length < 2) return [];
    return conventions
      .filter(
        (c) =>
          normaliser(c.titre).includes(terme) ||
          c.idcc.includes(terme) ||
          c.idcc.replace(/^0+/, "").startsWith(terme)
      )
      .slice(0, 8);
  }, [recherche]);

  const surDevis = nb >= PLAFOND_CURSEUR;
  const minutes = selection
    ? (CLASSEMENT[selection.idcc] ?? MINUTES_PAR_DEFAUT)
    : MINUTES_COURANTE;
  const prixBulletin = arrondi50(TAUX_HORAIRE * (minutes / 60) * coefVolume(nb));
  const forfait = arrondi50(prixBulletin * nb);
  const niveau =
    minutes === MINUTES_COURANTE
      ? "convention courante"
      : minutes === MINUTES_COMPLEXE
        ? "convention complexe"
        : "convention à particularités";

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-md sm:p-8">
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
        Votre convention collective (intitulé ou numéro IDCC)
        <input
          type="search"
          value={selection ? `${selection.titre} (IDCC ${selection.idcc.replace(/^0+/, "")})` : recherche}
          onChange={(e) => {
            setSelection(null);
            setRecherche(e.target.value);
          }}
          placeholder="Ex. 1979, bâtiment, avocats..."
          className="mt-2 w-full rounded-lg border border-line bg-ivory px-3 py-2.5 text-sm text-ink"
        />
      </label>
      {!selection && suggestions.length > 0 && (
        <ul className="mt-1 max-h-56 overflow-auto rounded-xl border border-line bg-white text-sm shadow-lg">
          {suggestions.map((c) => (
            <li key={c.idcc}>
              <button
                type="button"
                onClick={() => setSelection(c)}
                className="block w-full px-4 py-2.5 text-left hover:bg-emerald-tint"
              >
                <span className="font-semibold text-navy">{c.titre}</span>{" "}
                <span className="text-ink/60">
                  IDCC {c.idcc.replace(/^0+/, "")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {selection && (
        <p className="mt-2 text-xs text-ink/70">
          Niveau appliqué : {niveau}.{" "}
          <button
            type="button"
            onClick={() => {
              setSelection(null);
              setRecherche("");
            }}
            className="font-semibold text-emerald-deep underline"
          >
            Changer
          </button>
        </p>
      )}

      <label className="mt-4 block text-sm font-semibold text-navy">
        Nombre de bulletins par mois :{" "}
        {nb >= PLAFOND_CURSEUR ? "21 et plus" : nb}
        <input
          type="range"
          min={1}
          max={PLAFOND_CURSEUR}
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
              <span className="text-base font-semibold text-ink/70"> / mois</span>
            </p>
            <p className="mt-1 text-sm text-ink/70">
              soit {formatEuro(prixBulletin)} par bulletin
            </p>
          </>
        )}
      </div>

      <a
        href="/contact"
        className="mt-5 inline-block w-full rounded-full bg-emerald-brand px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-emerald-deep"
      >
        Obtenir mon devis précis sous 48&nbsp;heures
      </a>
    </div>
  );
}
