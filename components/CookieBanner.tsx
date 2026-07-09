"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CLE_CONSENTEMENT = "paie-et-dsn-consentement-mesure";
const ID_GA = "G-PB1V59BK7B";

export default function CookieBanner() {
  const [statut, setStatut] = useState<"inconnu" | "accepte" | "refuse">("inconnu");
  const [afficher, setAfficher] = useState(false);

  useEffect(() => {
    const enregistre = window.localStorage.getItem(CLE_CONSENTEMENT);
    if (enregistre === "accepte" || enregistre === "refuse") {
      setStatut(enregistre);
    } else {
      setAfficher(true);
    }
    const rouvrir = () => setAfficher(true);
    window.addEventListener("ouvrir-preferences-cookies", rouvrir);
    return () => window.removeEventListener("ouvrir-preferences-cookies", rouvrir);
  }, []);

  function choisir(valeur: "accepte" | "refuse") {
    window.localStorage.setItem(CLE_CONSENTEMENT, valeur);
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
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/98 p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur sm:p-5">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink/80">
              Nous utilisons un outil de mesure d&apos;audience (Google
              Analytics) pour comprendre la fréquentation du site. Il n&apos;est
              activé qu&apos;avec votre accord. Voir notre{" "}
              <a
                href="/politique-de-confidentialite"
                className="font-semibold text-emerald-deep underline"
              >
                politique de confidentialité
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choisir("refuse")}
                className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choisir("accepte")}
                className="rounded-full bg-emerald-brand px-4 py-2 text-sm font-semibold text-white"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
