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
  title: "Espace salarié",
  robots: { index: false, follow: false },
};

export default async function EspaceSalarie() {
  if (!configurationPresente()) redirect("/espace-client");
  const { user, profil } = await profilCourant();
  if (!user || !profil) redirect("/espace-client");
  if (profil.role !== "salarie") redirect("/espace-client");

  const supabase = await clientServeur();
  const { data } = await supabase
    .from("documents")
    .select("id, periode, titre")
    .eq("type", "bulletin")
    .order("periode", { ascending: false });
  const bulletins = data ?? [];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Espace salarié
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Vos bulletins de paie
            </h1>
          </div>
          <Deconnexion />
        </div>
        <p className="mt-4 rounded-xl border border-amber-brand/40 bg-amber-tint p-4 text-sm leading-relaxed">
          Cet espace met vos bulletins à disposition ; il ne constitue pas un
          archivage de longue durée. Téléchargez et conservez chaque bulletin
          sans limitation de durée : il sert notamment à faire valoir vos
          droits à la retraite.
        </p>
        {bulletins.length === 0 ? (
          <p className="mt-8 text-ink/70">
            Aucun bulletin disponible pour le moment.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
            {bulletins.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-sm font-medium text-navy">
                  {b.titre} {b.periode ? `· ${b.periode}` : ""}
                </span>
                <a
                  href={`/api/documents/${b.id}`}
                  className="text-sm font-semibold text-emerald-deep underline"
                >
                  Télécharger
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
