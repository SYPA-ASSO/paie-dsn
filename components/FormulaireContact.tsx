"use client";

import { useState } from "react";
import Link from "next/link";

const types = [
  "Demande de devis paie et DSN",
  "Particulier employeur",
  "Abonnements veille sociale et RH",
  "Assurances de l'employeur",
  "Partenariat",
  "Autre demande",
];

const typesDevis = new Set([
  "Demande de devis paie et DSN",
  "Particulier employeur",
]);

export default function FormulaireContact() {
  const [type, setType] = useState(types[0]);
  const [statut, setStatut] = useState<"repos" | "envoi" | "ok" | "erreur">(
    "repos"
  );
  const [messageErreur, setMessageErreur] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formulaire = e.currentTarget;
    const donnees = Object.fromEntries(new FormData(formulaire).entries());
    setStatut("envoi");
    setMessageErreur("");
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...donnees,
          type,
          consentement: donnees.consentement === "on",
        }),
      });
      const resultat = (await reponse.json()) as { erreur?: string };
      if (!reponse.ok) {
        setStatut("erreur");
        setMessageErreur(resultat.erreur ?? "L'envoi a échoué.");
        return;
      }
      setStatut("ok");
      formulaire.reset();
    } catch {
      setStatut("erreur");
      setMessageErreur("L'envoi a échoué. Merci de réessayer.");
    }
  }

  if (statut === "ok") {
    return (
      <div className="rounded-2xl bg-emerald-tint p-8 text-center">
        <p className="text-xl font-bold text-emerald-deep">
          Votre demande est bien envoyée
        </p>
        <p className="mt-2">
          Nous vous répondons sous 48&nbsp;heures ouvrées. Merci de votre
          confiance.
        </p>
      </div>
    );
  }

  const champ =
    "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink";
  const etiquette = "block text-sm font-semibold text-navy";
  const devis = typesDevis.has(type);

  return (
    <form onSubmit={envoyer} className="space-y-5">
      <div>
        <label htmlFor="type" className={etiquette}>
          Votre demande&nbsp;*
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={champ}
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={etiquette}>
            Nom&nbsp;*
          </label>
          <input id="nom" name="nom" required className={champ} />
        </div>
        <div>
          <label htmlFor="prenom" className={etiquette}>
            Prénom&nbsp;*
          </label>
          <input id="prenom" name="prenom" required className={champ} />
        </div>
        <div>
          <label htmlFor="email" className={etiquette}>
            E-mail&nbsp;*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={champ}
          />
        </div>
        <div>
          <label htmlFor="telephone" className={etiquette}>
            Téléphone{devis ? "\u00a0*" : ""}
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required={devis}
            className={champ}
          />
        </div>
      </div>

      {devis && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="siret" className={etiquette}>
              SIRET{type === "Particulier employeur" ? " (si applicable)" : "\u00a0*"}
            </label>
            <input
              id="siret"
              name="siret"
              inputMode="numeric"
              required={type !== "Particulier employeur"}
              className={champ}
            />
          </div>
          <div>
            <label htmlFor="effectif" className={etiquette}>
              Effectif (nombre de salariés)&nbsp;*
            </label>
            <input
              id="effectif"
              name="effectif"
              inputMode="numeric"
              required
              className={champ}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="adresse" className={etiquette}>
              Adresse postale du siège social&nbsp;*
            </label>
            <input id="adresse" name="adresse" required className={champ} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ccn" className={etiquette}>
              Convention collective (intitulé ou IDCC)&nbsp;*
            </label>
            <input id="ccn" name="ccn" required className={champ} />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className={etiquette}>
          Votre message&nbsp;*
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={champ}
          placeholder={
            devis
              ? "Précisez votre situation : première embauche, changement de prestataire, échéance souhaitée..."
              : "Décrivez votre demande..."
          }
        />
      </div>

      {/* Honeypot anti-spam : champ invisible pour les humains */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="siteweb">Site web</label>
        <input id="siteweb" name="siteweb" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="consentement"
          required
          className="mt-1 h-4 w-4 accent-[#00a878]"
        />
        <span>
          J&apos;accepte que mes données soient utilisées pour traiter ma
          demande, conformément à la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="font-semibold text-emerald-deep underline"
          >
            Politique de confidentialité
          </Link>{" "}
          du Cabinet Cholez-Pagotto.&nbsp;*
        </span>
      </label>
      <p className="text-xs text-ink/60">*&nbsp;Champs obligatoires.</p>

      {statut === "erreur" && (
        <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
          {messageErreur}
        </p>
      )}

      <button
        type="submit"
        disabled={statut === "envoi"}
        className="w-full rounded-full bg-emerald-brand px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-deep disabled:opacity-60"
      >
        {statut === "envoi" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
