import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Deconnexion from "@/components/espace/Deconnexion";
import {
  clientServeur,
  configurationPresente,
  profilCourant,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Espace documentaire",
  robots: { index: false, follow: false },
};

const libelles: Record<string, string> = {
  modele: "Modèles de documents",
  jurisprudence: "Jurisprudences commentées",
  dossier: "Dossiers de synthèse",
  procedure: "Procédures RH",
  outil: "Outils de gestion",
  newsletter: "Newsletters",
  autre: "Autres ressources",
};
const ordre = ["modele", "jurisprudence", "dossier", "procedure", "outil", "newsletter", "autre"];

export default async function Ressources() {
  if (!configurationPresente()) redirect("/espace-client");
  const { user, profil } = await profilCourant();
  if (!user || !profil) redirect("/espace-client");
  if (profil.role !== "employeur") redirect("/espace-client");

  const supabase = await clientServeur();
  const { data: organisation } = profil.organisation_id
    ? await supabase
        .from("organisations")
        .select("offre_essentiel, offre_copilote")
        .eq("id", profil.organisation_id)
        .single()
    : { data: null };
  const abonne = Boolean(
    organisation?.offre_essentiel || organisation?.offre_copilote
  );

  const { data } = await supabase
    .from("ressources")
    .select("id, titre, categorie, type_ressource, acces, cree_le")
    .order("cree_le", { ascending: false });
  const ressources = data ?? [];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Espace documentaire
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Vos ressources d&apos;abonné
            </h1>
          </div>
          <Deconnexion />
        </div>

        {!abonne ? (
          <div className="mt-10 rounded-2xl bg-emerald-tint p-8 text-center">
            <p className="font-semibold text-navy">
              L&apos;espace documentaire est réservé aux abonnés L&apos;Essentiel
              Social et Le Copilote Social.
            </p>
            <p className="mt-2 text-sm">
              Plus de 350 modèles de documents social et RH, jurisprudences
              commentées, dossiers de synthèse, procédures et outils de
              gestion, mis à jour en continu.
            </p>
            <a
              href="/veille-sociale-rh"
              className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-deep"
            >
              Découvrir les formules
            </a>
          </div>
        ) : ressources.length === 0 ? (
          <p className="mt-10 text-ink/70">
            Les premières ressources arrivent : cet espace se remplit en
            continu.
          </p>
        ) : (
          ordre
            .filter((t) => ressources.some((r) => r.type_ressource === t))
            .map((t) => (
              <section key={t} className="mt-8">
                <h2 className="text-lg font-bold text-navy">{libelles[t]}</h2>
                <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-white">
                  {ressources
                    .filter((r) => r.type_ressource === t)
                    .map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                      >
                        <span className="text-sm">
                          <span className="font-medium text-navy">
                            {r.titre}
                          </span>
                          {r.categorie && (
                            <span className="ml-2 rounded-full bg-ivory px-2 py-0.5 text-xs text-ink/70">
                              {r.categorie}
                            </span>
                          )}
                          {r.acces === "copilote" && (
                            <span className="ml-2 rounded-full bg-amber-tint px-2 py-0.5 text-xs font-semibold text-amber-brand">
                              Copilote
                            </span>
                          )}
                        </span>
                        <a
                          href={`/api/ressources/${r.id}`}
                          className="text-sm font-semibold text-emerald-deep underline"
                        >
                          Télécharger
                        </a>
                      </li>
                    ))}
                </ul>
              </section>
            ))
        )}
      </main>
      <Footer />
    </>
  );
}
