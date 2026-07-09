"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

const CLE_CONSENTEMENT = "paie-et-dsn-consentement-mesure";
const ID_GA = "G-PB1V59BK7B";
const DUREE_VALIDITE_JOURS = 13 * 30; // 13 mois, duree maximale recommandee par la CNIL

type Consentement = { valeur: "accepte" | "refuse"; date: string };

function lireConsentement(): Consentement | null {
  try {
    const brut = window.localStorage.getItem(CLE_CONSENTEMENT);
    if (!brut) return null;
    const donnees = JSON.parse(brut) as Consentement;
    const jours =
      (Date.now() - new Date(donnees.date).getTime()) / (1000 * 60 * 60 * 24);
    if (jours > DUREE_VALIDITE_JOURS) return null;
    return donnees;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [statut, setStatut] = useState<"inconnu" | "accepte" | "refuse">("inconnu");
  const [afficher, setAfficher] = useState(false);

  useEffect(() => {
    const enregistre = lireConsentement();
    if (enregistre) {
      setStatut(enregistre.valeur);
    } else {
      setAfficher(true);
    }
    const rouvrir = () => setAfficher(true);
    window.addEventListener("ouvrir-preferences-cookies", rouvrir);
    return () => window.removeEventListener("ouvrir-preferences-cookies", rouvrir);
  }, []);

  function choisir(valeur: "accepte" | "refuse") {
    const donnees: Consentement = { valeur, date: new Date().toISOString() };
    window.localStorage.setItem(CLE_CONSENTEMENT, JSON.stringify(donnees));
    setStatut(valeur);
    setAfficher(false);
  }

  return (
    <>
      {statut === "accepte" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ID_GA}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ID_GA}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {afficher && (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm sm:bottom-5 sm:left-5">
          <div className="overflow-hidden rounded-2xl border-2 border-emerald-brand bg-navy shadow-[0_12px_40px_rgba(15,37,68,0.45)]">
            <div className="flex items-center gap-2.5 border-b border-white/10 bg-navy-soft px-4 py-3">
              <Image
                src="/logo-paie-et-dsn-fond-sombre.svg"
                alt=""
                width={22}
                height={22}
                className="shrink-0"
              />
              <div>
                <p className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
                  Cookies et confidentialité
                </p>
                <p className="text-[11px] text-white/60">
                  Paie et DSN - Service de CBT CHOLEZ-PAGOTTO
                </p>
              </div>
            </div>

            <div className="space-y-3 px-4 py-3">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-brand" />
                  Cookies techniques : toujours actifs
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Session, authentification et sécurité du paiement.
                  Exemptés de consentement (CNIL 2020-091).
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-brand" />
                  Mesure d&apos;audience : votre choix
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Google Analytics, sans publicité ni suivi entre sites.
                  Conservation 13 mois.
                </p>
              </div>
            </div>

            <div className="flex gap-2 border-t border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={() => choisir("refuse")}
                className="flex-1 rounded-full border border-white/30 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choisir("accepte")}
                className="flex-1 rounded-full bg-emerald-brand px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-deep"
              >
                Accepter
              </button>
            </div>

            <p className="border-t border-white/10 px-4 py-2.5 text-[11px] leading-relaxed text-white/55">
              Choix enregistré 13 mois.{" "}
              <a
                href="/politique-de-confidentialite"
                className="font-semibold text-amber-brand underline underline-offset-2 hover:text-amber-brand/80"
              >
                Politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
