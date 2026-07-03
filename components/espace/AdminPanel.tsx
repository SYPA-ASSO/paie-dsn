"use client";

import { useState } from "react";

type Organisation = { id: string; nom: string; offre_paie?: boolean; offre_essentiel?: boolean; offre_copilote?: boolean };
type Utilisateur = { user_id: string; nom: string | null; role: string; organisation_id: string | null; email?: string | null };

const champ = "mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2 text-sm";
const etiquette = "block text-sm font-semibold text-navy";

const actions = [
  { cle: "organisation", libelle: "+ Organisation" },
  { cle: "utilisateur", libelle: "+ Utilisateur" },
  { cle: "document", libelle: "+ Document" },
  { cle: "ressource", libelle: "+ Ressource documentaire" },
] as const;

type CleAction = (typeof actions)[number]["cle"];

export default function AdminPanel({
  organisations,
  utilisateurs,
}: {
  organisations: Organisation[];
  utilisateurs: Utilisateur[];
}) {
  const [message, setMessage] = useState("");
  const [ouvert, setOuvert] = useState<CleAction | null>(null);

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
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        {actions.map((action) => (
          <button
            key={action.cle}
            type="button"
            onClick={() => setOuvert(ouvert === action.cle ? null : action.cle)}
            className={
              ouvert === action.cle
                ? "rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white"
                : "rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-emerald-brand/50"
            }
          >
            {action.libelle}
          </button>
        ))}
        {ouvert && (
          <button
            type="button"
            onClick={() => setOuvert(null)}
            className="text-sm font-semibold text-ink/60 underline"
          >
            Fermer
          </button>
        )}
      </div>

      {message && (
        <p className="mt-4 rounded-xl bg-emerald-tint p-3 text-sm font-semibold text-emerald-deep">
          {message}
        </p>
      )}

      <div className={ouvert === "organisation" ? "mt-6 max-w-md" : "hidden"}>
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
        <p className={`mt-3 ${etiquette}`}>Offres souscrites</p>
        <label className="mt-1 flex items-center gap-2 text-sm">
          <input type="checkbox" name="offre_paie" className="h-4 w-4 accent-[#00a878]" />
          Gestion de paie
        </label>
        <label className="mt-1 flex items-center gap-2 text-sm">
          <input type="checkbox" name="offre_essentiel" className="h-4 w-4 accent-[#00a878]" />
          L&apos;Essentiel Social
        </label>
        <label className="mt-1 flex items-center gap-2 text-sm">
          <input type="checkbox" name="offre_copilote" className="h-4 w-4 accent-[#00a878]" />
          Le Copilote Social
        </label>
        <button className="mt-4 w-full rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
          Créer
        </button>
      </form>
      </div>

      <div className={ouvert === "utilisateur" ? "mt-6 max-w-md" : "hidden"}>
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
      </div>

      <div className={ouvert === "document" ? "mt-6 max-w-md" : "hidden"}>
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
            <option value="archive">Archive mensuelle (zip)</option>
            <option value="autre">Autre</option>
          </select>
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Période (AAAA-MM)
          <input name="periode" placeholder="2026-07" className={champ} />
        </label>
        <label className={`mt-3 ${etiquette}`}>
          Destinataire du bulletin (salarié ou dirigeant)
          <select name="salarie_user_id" className={champ}>
            <option value="">Aucun</option>
            {utilisateurs
              .filter((u) => u.role !== "admin")
              .map((u) => (
                <option key={u.user_id} value={u.user_id}>
                  {u.nom ?? u.email ?? u.user_id.slice(0, 8)} ({u.role})
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

      <div className={ouvert === "ressource" ? "mt-6" : "hidden"}>
      <form
        onSubmit={(e) => envoyer(e, "Ressource déposée")}
        className="rounded-2xl border border-line bg-white p-5"
      >
        <h2 className="font-bold text-navy">
          Déposer une ressource documentaire (abonnements)
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <input type="hidden" name="action" value="ressource" />
          <label className={etiquette}>
            Titre&nbsp;*
            <input name="titre" required className={champ} />
          </label>
          <label className={etiquette}>
            Catégorie
            <input
              name="categorie"
              placeholder="Ex. Contrats, Discipline, Congés..."
              className={champ}
            />
          </label>
          <label className={etiquette}>
            Type&nbsp;*
            <select name="type_ressource" required className={champ}>
              <option value="modele">Modèle de document</option>
              <option value="jurisprudence">Jurisprudence commentée</option>
              <option value="dossier">Dossier de synthèse</option>
              <option value="procedure">Procédure RH</option>
              <option value="outil">Outil de gestion</option>
              <option value="newsletter">Newsletter</option>
              <option value="autre">Autre</option>
            </select>
          </label>
          <label className={etiquette}>
            Accès&nbsp;*
            <select name="acces" required className={champ}>
              <option value="essentiel">Essentiel + Copilote</option>
              <option value="copilote">Copilote uniquement</option>
            </select>
          </label>
          <label className={etiquette}>
            Fichier&nbsp;*
            <input name="fichier" type="file" required className={champ} />
          </label>
        </div>
        <button className="mt-4 rounded-full bg-emerald-brand px-6 py-2 text-sm font-semibold text-white">
          Déposer la ressource
        </button>
      </form>
      </div>
    </div>
  );
}
