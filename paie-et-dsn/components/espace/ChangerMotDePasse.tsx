"use client";

import { useState } from "react";
import { clientNavigateur } from "@/lib/supabase/client";

export default function ChangerMotDePasse() {
  const [ouvert, setOuvert] = useState(false);
  const [statut, setStatut] = useState("");

  async function changer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const nouveau = String(donnees.get("nouveau"));
    const confirmation = String(donnees.get("confirmation"));
    if (nouveau.length < 8) {
      setStatut("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (nouveau !== confirmation) {
      setStatut("Les deux saisies ne correspondent pas.");
      return;
    }
    setStatut("Modification en cours...");
    const { error } = await clientNavigateur().auth.updateUser({
      password: nouveau,
    });
    if (error) {
      setStatut("La modification a échoué : " + error.message);
      return;
    }
    setStatut("Mot de passe modifié. Utilisez-le dès votre prochaine connexion.");
    e.currentTarget?.reset?.();
  }

  return (
    <div className="mt-10 rounded-2xl border border-line bg-white p-5">
      <button
        type="button"
        onClick={() => setOuvert(!ouvert)}
        className="text-sm font-semibold text-navy underline"
      >
        {ouvert ? "Fermer" : "Changer mon mot de passe"}
      </button>
      {ouvert && (
        <form onSubmit={changer} className="mt-4 max-w-sm space-y-3">
          <label className="block text-sm font-semibold text-navy">
            Nouveau mot de passe (8 caractères minimum)
            <input
              name="nouveau"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2 text-sm"
            />
          </label>
          <label className="block text-sm font-semibold text-navy">
            Confirmez le nouveau mot de passe
            <input
              name="confirmation"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2 text-sm"
            />
          </label>
          {statut && (
            <p className="rounded-xl bg-emerald-tint p-2 text-sm font-semibold text-emerald-deep">
              {statut}
            </p>
          )}
          <button className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">
            Enregistrer
          </button>
        </form>
      )}
    </div>
  );
}
