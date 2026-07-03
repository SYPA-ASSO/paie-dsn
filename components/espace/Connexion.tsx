"use client";

import { useState } from "react";
import { clientNavigateur } from "@/lib/supabase/client";

export default function Connexion() {
  const [erreur, setErreur] = useState("");
  const [enCours, setEnCours] = useState(false);

  async function seConnecter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur("");
    setEnCours(true);
    const donnees = new FormData(e.currentTarget);
    const supabase = clientNavigateur();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(donnees.get("email")),
      password: String(donnees.get("motdepasse")),
    });
    if (error) {
      setErreur("Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe.");
      setEnCours(false);
      return;
    }
    window.location.assign("/espace-client");
  }

  return (
    <form
      onSubmit={seConnecter}
      className="mx-auto max-w-md rounded-2xl border border-line bg-white p-8 shadow-md"
    >
      <label className="block text-sm font-semibold text-navy">
        E-mail
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2.5 text-sm"
        />
      </label>
      <label className="mt-4 block text-sm font-semibold text-navy">
        Mot de passe
        <input
          name="motdepasse"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2.5 text-sm"
        />
      </label>
      {erreur && (
        <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
          {erreur}
        </p>
      )}
      <button
        type="submit"
        disabled={enCours}
        className="mt-6 w-full rounded-full bg-emerald-brand px-6 py-3 font-semibold text-white transition hover:bg-emerald-deep disabled:opacity-60"
      >
        {enCours ? "Connexion..." : "Se connecter"}
      </button>
      <p className="mt-4 text-center text-xs text-ink/70">
        Vos identifiants vous sont remis par le cabinet à l&apos;ouverture de
        votre dossier. Identifiants perdus : utilisez le formulaire de contact.
      </p>
    </form>
  );
}
