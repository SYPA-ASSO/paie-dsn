"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { clientNavigateur } from "@/lib/supabase/client";

export default function NouveauMotDePasse() {
  const [pret, setPret] = useState<"chargement" | "ok" | "expire">("chargement");
  const [nouveau, setNouveau] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [fait, setFait] = useState(false);

  useEffect(() => {
    // Le client Supabase echange automatiquement le code present dans l'URL
    // contre une session ; on verifie ensuite qu'une session existe.
    const verifier = async () => {
      const { data } = await clientNavigateur().auth.getSession();
      setPret(data.session ? "ok" : "expire");
    };
    const minuterie = setTimeout(verifier, 600);
    return () => clearTimeout(minuterie);
  }, []);

  async function definir(e: React.FormEvent) {
    e.preventDefault();
    if (nouveau.length < 8) {
      setMessage("8 caractères minimum.");
      return;
    }
    if (nouveau !== confirmation) {
      setMessage("Les deux saisies ne correspondent pas.");
      return;
    }
    setMessage("Enregistrement...");
    const { error } = await clientNavigateur().auth.updateUser({ password: nouveau });
    if (error) {
      setMessage(`Erreur : ${error.message}`);
      return;
    }
    setFait(true);
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Espace client
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Définissez votre mot de passe
        </h1>

        {pret === "chargement" && (
          <p className="mt-6 text-sm text-ink/70">Vérification du lien...</p>
        )}

        {pret === "expire" && (
          <div className="mt-6 rounded-2xl border border-line bg-ivory p-5 text-sm leading-relaxed">
            <p>
              Ce lien n&apos;est plus valide (il a déjà été utilisé ou a
              expiré). Demandez un nouveau lien au cabinet via le{" "}
              <Link href="/contact" className="font-semibold text-emerald-deep underline">
                formulaire de contact
              </Link>
              , ou connectez-vous avec le mot de passe provisoire qui vous a
              été communiqué.
            </p>
            <Link
              href="/espace-client"
              className="mt-4 inline-block rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white"
            >
              Aller à la connexion
            </Link>
          </div>
        )}

        {pret === "ok" && !fait && (
          <form
            onSubmit={definir}
            className="mt-6 rounded-2xl border border-line bg-white p-5"
          >
            <label className="block text-sm font-semibold text-navy">
              Nouveau mot de passe (8 caractères minimum)
              <input
                type="password"
                value={nouveau}
                onChange={(e) => setNouveau(e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2 text-sm"
              />
            </label>
            <label className="mt-3 block text-sm font-semibold text-navy">
              Confirmez le mot de passe
              <input
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-1 w-full rounded-lg border border-line bg-ivory px-3 py-2 text-sm"
              />
            </label>
            <button className="mt-4 w-full rounded-full bg-emerald-brand px-4 py-2 text-sm font-semibold text-white">
              Enregistrer mon mot de passe
            </button>
            {message && (
              <p className="mt-3 text-sm font-semibold text-navy">{message}</p>
            )}
          </form>
        )}

        {fait && (
          <div className="mt-6 rounded-2xl bg-emerald-tint p-5 text-sm leading-relaxed">
            <p className="font-semibold text-emerald-deep">
              Mot de passe enregistré. Votre espace est prêt.
            </p>
            <Link
              href="/espace-client"
              className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2 text-sm font-semibold text-white"
            >
              Accéder à mon espace client
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
