"use client";

import { useState } from "react";

type Organisation = { id: string; nom: string };
type Utilisateur = { user_id: string; nom: string | null; role: string; organisation_id: string | null };

const champ = "mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2 text-sm";
const etiquette = "block text-sm font-semibold text-navy";

export default function AdminPanel({
  organisations,
  utilisateurs,
}: {
  organisations: Organisation[];
  utilisateurs: Utilisateur[];
}) {
  const [message, setMessage] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>, libelle: string) {
    e.preventDefault();
    const formulaire = e.currentTarget;
    setMessage("Envoi en cours...");
    const reponse = await fetch("/api/admin", {
      method: "POST",
      body: new FormData(formulaire),
    });
    const resultat = (await reponse.json()) as { erreur?: string };
    if (!reponse.ok) {
      setMessage(`Erreur (${libelle}) : ${resultat.erreur ?? "inconnue"}`);
      return;
    }
    setMessage(`${libelle} : fait. Rechargez la page pour voir la mise à jour.`);
    formulaire.reset();
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      {message && (
        <p className="lg:col-span-3 rounded-xl bg-emerald-tint p-3 text-sm font-semibold text-emerald-deep">
          {message}
        </p>
      )}

      <form
        onSubmit={(e) => envoyer(e, "Organisation créée")}
        className="rounded-2xl border border-line bg-white p-5"
      >
        <h2 className="font-bold text-navy">Créer une organisation</h2>
        <input type="hidden" name="action" value="organisation" />
        <label className={`mt-3 ${etiquette}`}>
          Nom&nbsp;*
          <input name="nom" required className={champ} />
        </label>
        <label className={`mt-3 ${etiquette}`}>
          SIRET
          <input name="siret" className={champ} />
        </label>
        <button className="mt-4 w-full rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
          Créer
        </button>
      </form>

      <form
        onSubmit={(e) => envoyer(e, "Utilisateur créé")}
        className="rounded-2xl border border-line bg-white p-5"
      >
        <h2 className="font-bold text-navy">Créer un utilisateur</h2>
        <input type="hidden" name="action" value="utilisateur" />
        <label className={`mt-3 ${etiquette}`}>
          Nom
          <input name="nom" className={champ} />
        </label>
        <label className={`mt-3 ${etiquette}`}>
          E-mail&nbsp;*
          <input name="email" type="email" required className={champ} />
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Mot de passe provisoire&nbsp;* (8 caractères min.)
          <input name="motdepasse" required minLength={8} className={champ} />
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Rôle&nbsp;*
          <select name="role" required className={champ}>
            <option value="employeur">Employeur</option>
            <option value="salarie">Salarié</option>
            <option value="admin">Admin cabinet</option>
          </select>
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Organisation
          <select name="organisation_id" className={champ}>
            <option value="">Aucune (admin)</option>
            {organisations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nom}
              </option>
            ))}
          </select>
        </label>
        <button className="mt-4 w-full rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
          Créer
        </button>
      </form>

      <form
        onSubmit={(e) => envoyer(e, "Document déposé")}
        className="rounded-2xl border border-line bg-white p-5"
      >
        <h2 className="font-bold text-navy">Déposer un document</h2>
        <input type="hidden" name="action" value="document" />
        <label className={`mt-3 ${etiquette}`}>
          Organisation&nbsp;*
          <select name="organisation_id" required className={champ}>
            {organisations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nom}
              </option>
            ))}
          </select>
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Type&nbsp;*
          <select name="type" required className={champ}>
            <option value="bulletin">Bulletin de paie</option>
            <option value="journal_paie">Journal de paie</option>
            <option value="etat_charges">État des charges</option>
            <option value="cr_dsn">Compte rendu DSN</option>
            <option value="facture">Facture</option>
            <option value="mandat">Mandat tiers déclarant</option>
            <option value="justificatif">Justificatif</option>
            <option value="autre">Autre</option>
          </select>
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Période (AAAA-MM)
          <input name="periode" placeholder="2026-07" className={champ} />
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Salarié destinataire (bulletins uniquement)
          <select name="salarie_user_id" className={champ}>
            <option value="">Aucun</option>
            {utilisateurs
              .filter((u) => u.role === "salarie")
              .map((u) => (
                <option key={u.user_id} value={u.user_id}>
                  {u.nom ?? u.user_id.slice(0, 8)}
                </option>
              ))}
          </select>
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Titre affiché
          <input name="titre" className={champ} />
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Fichier&nbsp;*
          <input name="fichier" type="file" required className={champ} />
        </label>
        <button className="mt-4 w-full rounded-full bg-emerald-brand px-4 py-2 text-sm font-semibold text-white">
          Déposer
        </button>
      </form>
    </div>
  );
}
