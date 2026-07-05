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
  const [consenti, setConsenti] = useState(false);

  async function payerParCarte() {
    setEnCours(true);
    setErreur("");
    try {
      const reponse = await fetch("/api/abonnement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formule, consentement: consenti }),
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
      <label className="flex items-start gap-2 text-left text-xs leading-relaxed text-ink/80">
        <input
          type="checkbox"
          checked={consenti}
          onChange={(e) => setConsenti(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#00a878]"
        />
        <span>
          Je demande expressément l&apos;exécution immédiate de mon abonnement
          (accès au contenu numérique et envois dès l&apos;ouverture de mes
          accès) et je reconnais perdre en conséquence mon droit de
          rétractation (article L.&nbsp;221-28, 13° du Code de la
          consommation).&nbsp;*
        </span>
      </label>
      <button
        type="button"
        onClick={payerParCarte}
        disabled={enCours || !consenti}
        className={
          principal
            ? "mt-3 w-full rounded-full bg-emerald-brand px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-emerald-deep disabled:opacity-60"
            : "mt-3 w-full rounded-full border-2 border-emerald-brand px-6 py-3 text-center font-semibold text-emerald-deep transition hover:bg-emerald-brand hover:text-white disabled:opacity-60"
        }
      >
        {enCours
          ? "Ouverture du paiement..."
          : consenti
            ? `${libelle} par carte bancaire`
            : "Cochez la case ci-dessus pour souscrire"}
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
