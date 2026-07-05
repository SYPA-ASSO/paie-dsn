"use client";

import { useState } from "react";

const champ =
  "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink";
const etiquette = "block text-sm font-semibold text-navy";

export default function FormulaireRenonciation() {
  const [type, setType] = useState<"retractation" | "resiliation">(
    "retractation"
  );
  const [statut, setStatut] = useState<"repos" | "envoi" | "ok" | "erreur">(
    "repos"
  );
  const [erreur, setErreur] = useState("");
  const [horodatage, setHorodatage] = useState("");

  async function confirmer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatut("envoi");
    setErreur("");
    const donnees = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const reponse = await fetch("/api/renonciation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...donnees, type }),
      });
      const resultat = (await reponse.json()) as {
        erreur?: string;
        horodatage?: string;
      };
      if (!reponse.ok) {
        setStatut("erreur");
        setErreur(resultat.erreur ?? "L'envoi a échoué.");
        return;
      }
      setHorodatage(resultat.horodatage ?? "");
      setStatut("ok");
    } catch {
      setStatut("erreur");
      setErreur("L'envoi a échoué. Merci de réessayer.");
    }
  }

  if (statut === "ok") {
    return (
      <div className="rounded-2xl bg-emerald-tint p-8 text-center">
        <p className="text-xl font-bold text-emerald-deep">
          {type === "retractation"
            ? "Votre rétractation est enregistrée"
            : "Votre demande de résiliation est enregistrée"}
        </p>
        <p className="mt-2">
          Déclaration reçue le {horodatage} (heure de Paris). Un accusé de
          réception horodaté vient de vous être adressé par e-mail : il fait
          foi de votre démarche. {type === "retractation"
            ? "Le cabinet examine l'applicabilité de votre droit de rétractation (article 12 des CGV) et vous répond sous 48 heures ouvrées ; si la rétractation est applicable, le remboursement intervient sous 14 jours au plus."
            : "Votre abonnement prendra fin au terme de la période mensuelle en cours."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={confirmer} className="space-y-5">
      <div>
        <p className={etiquette}>Votre situation&nbsp;*</p>
        <div className="mt-2 space-y-2">
          <label className="flex items-start gap-3 rounded-xl border border-line bg-white p-3 text-sm">
            <input
              type="radio"
              name="choix"
              checked={type === "retractation"}
              onChange={() => setType("retractation")}
              className="mt-0.5 h-4 w-4 accent-[#00a878]"
            />
            <span>
              <span className="font-semibold text-navy">
                Renoncer au contrat (rétractation)
              </span>
              &nbsp;: souscription de moins de 14 jours, si votre droit de
              rétractation est applicable (voir CGV, article 12).
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-line bg-white p-3 text-sm">
            <input
              type="radio"
              name="choix"
              checked={type === "resiliation"}
              onChange={() => setType("resiliation")}
              className="mt-0.5 h-4 w-4 accent-[#00a878]"
            />
            <span>
              <span className="font-semibold text-navy">
                Résilier mon abonnement
              </span>
              &nbsp;: à tout moment, effet au terme de la période mensuelle en
              cours, sans frais.
            </span>
          </label>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={etiquette}>
            Nom et prénom&nbsp;*
          </label>
          <input id="nom" name="nom" required className={champ} />
        </div>
        <div>
          <label htmlFor="email" className={etiquette}>
            E-mail utilisé lors de la souscription&nbsp;*
          </label>
          <input id="email" name="email" type="email" required className={champ} />
        </div>
        <div>
          <label htmlFor="formule" className={etiquette}>
            Formule concernée&nbsp;*
          </label>
          <select id="formule" name="formule" required className={champ}>
            <option value="L'Essentiel Social">L&apos;Essentiel Social</option>
            <option value="Le Copilote Social">Le Copilote Social</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateSouscription" className={etiquette}>
            Date de souscription (si connue)
          </label>
          <input id="dateSouscription" name="dateSouscription" className={champ} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={etiquette}>
            Précisions (facultatif)
          </label>
          <textarea id="message" name="message" rows={3} className={champ} />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="siteweb">Site web</label>
        <input id="siteweb" name="siteweb" tabIndex={-1} autoComplete="off" />
      </div>

      {statut === "erreur" && (
        <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={statut === "envoi"}
        className="w-full rounded-full bg-emerald-brand px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-deep disabled:opacity-60"
      >
        {statut === "envoi"
          ? "Envoi en cours..."
          : type === "retractation"
            ? "Confirmer la rétractation"
            : "Confirmer la résiliation"}
      </button>
      <p className="text-xs text-ink/60">
        Un accusé de réception horodaté vous est adressé immédiatement par
        e-mail. Cette fonctionnalité est accessible sans compte, pendant toute
        la durée du délai de rétractation et au-delà.
      </p>
    </form>
  );
}
