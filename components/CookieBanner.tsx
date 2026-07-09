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
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:p-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-emerald-brand bg-navy shadow-[0_-12px_40px_rgba(15,37,68,0.45)]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-navy-soft px-5 py-4">
              <Image
                src="/logo-paie-et-dsn-fond-sombre.svg"
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
              <div>
                <p className="font-[family-name:var(--font-display)] text-base font-bold text-white">
                  Cookies et confidentialité
                </p>
                <p className="text-xs text-white/60">Cabinet Cholez-Pagotto</p>
              </div>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-brand" />
                  Cookies techniques : toujours actifs
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/75">
                  Session, authentification de votre espace client et sécurité
                  du paiement. Indispensables au fonctionnement du site,
                  exemptés de consentement (CNIL 2020-091).
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-brand" />
                  Mesure d&apos;audience : votre choix
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/75">
                  Google Analytics nous aide à comprendre comment le site est
                  utilisé pour l&apos;améliorer. Aucune publicité, aucun suivi
                  entre sites. Conservation 13 mois.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => choisir("accepte")}
                className="flex-1 rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-deep"
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={() => choisir("refuse")}
                className="flex-1 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Refuser
              </button>
            </div>

            <p className="border-t border-white/10 px-5 py-3 text-xs leading-relaxed text-white/55">
              Votre choix est enregistré 13 mois.{" "}
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
