"use client";

import { useState } from "react";
import Link from "next/link";

export default function BoutonsSouscription({
  formule,
  libelle,
  principal,
}: {
  formule: "essentiel" | "copilote";
  libelle: string;
  principal?: boolean;
}) {
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  async function payerParCarte() {
    setEnCours(true);
    setErreur("");
    try {
      const reponse = await fetch("/api/abonnement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formule }),
      });
      const resultat = (await reponse.json()) as {
        url?: string;
        erreur?: string;
      };
      if (!reponse.ok || !resultat.url) {
        setErreur(resultat.erreur ?? "Le paiement est momentanément indisponible.");
        setEnCours(false);
        return;
      }
      window.location.assign(resultat.url);
    } catch {
      setErreur("Le paiement est momentanément indisponible.");
      setEnCours(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={payerParCarte}
        disabled={enCours}
        className={
          principal
            ? "w-full rounded-full bg-emerald-brand px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-emerald-deep disabled:opacity-60"
            : "w-full rounded-full border-2 border-emerald-brand px-6 py-3 text-center font-semibold text-emerald-deep transition hover:bg-emerald-brand hover:text-white disabled:opacity-60"
        }
      >
        {enCours ? "Ouverture du paiement..." : `${libelle} par carte bancaire`}
      </button>
      <p className="mt-2 text-center text-xs text-ink/70">
        Paiement mensuel sécurisé (Stripe), sans engagement. Ou{" "}
        <Link
          href={`/contact?sujet=abonnement&formule=${formule}`}
          className="font-semibold text-emerald-deep underline"
        >
          souscrire avec paiement par virement
        </Link>
        {" "}à réception de facture.
      </p>
      {erreur && (
        <p className="mt-2 rounded-xl bg-red-50 p-2 text-center text-xs font-semibold text-red-700">
          {erreur}
        </p>
      )}
    </div>
  );
}
