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
  title: "Espace employeur",
  robots: { index: false, follow: false },
};

type Document = {
  id: string;
  type: string;
  periode: string | null;
  titre: string;
  cree_le: string;
};

const libelles: Record<string, string> = {
  bulletin: "Bulletins de paie",
  journal_paie: "Journal de paie",
  etat_charges: "État des charges",
  cr_dsn: "Comptes rendus DSN",
  justificatif: "Justificatifs",
  archive: "Archive mensuelle (zip)",
  autre: "Autres documents",
};

export default async function EspaceEmployeur() {
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
    .from("documents")
    .select("id, type, periode, titre, cree_le")
    .order("periode", { ascending: false })
    .order("cree_le", { ascending: false });
  const documents = (data ?? []) as Document[];

  const factures = documents.filter((d) => d.type === "facture");
  const mandats = documents.filter((d) => d.type === "mandat");
  const production = documents.filter(
    (d) => !["facture", "mandat"].includes(d.type)
  );
  const periodes = [...new Set(production.map((d) => d.periode ?? "Sans période"))];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Espace employeur
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Votre dossier de paie
            </h1>
          </div>
          <Deconnexion />
        </div>

        {abonne && (
          <a
            href="/espace-client/ressources"
            className="mt-8 block rounded-2xl border-2 border-emerald-brand bg-emerald-tint p-5 transition hover:shadow-md"
          >
            <p className="font-bold text-navy">Votre espace documentaire d&apos;abonné</p>
            <p className="mt-1 text-sm">
              Modèles de documents, jurisprudences commentées, dossiers, procédures et
              outils : accédez à vos ressources.
            </p>
          </a>
        )}

        <section className="mt-8">
          <h2 className="text-lg font-bold text-navy">Votre mandat de tiers déclarant</h2>
          {mandats.length === 0 ? (
            <p className="mt-2 text-sm text-ink/70">
              Votre mandat sera disponible ici dès l&apos;ouverture complète de
              votre dossier.
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {mandats.map((d) => (
                <li key={d.id}>
                  <a
                    href={`/api/documents/${d.id}`}
                    className="font-semibold text-emerald-deep underline"
                  >
                    {d.titre}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-navy">Vos factures</h2>
          {factures.length === 0 ? (
            <p className="mt-2 text-sm text-ink/70">Aucune facture pour le moment.</p>
          ) : (
            <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-white">
              {factures.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-sm font-medium text-navy">{d.titre}</span>
                  <a
                    href={`/api/documents/${d.id}`}
                    className="text-sm font-semibold text-emerald-deep underline"
                  >
                    Télécharger
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-navy">Vos documents de paie, par période</h2>
          {periodes.length === 0 && (
            <p className="mt-2 text-sm text-ink/70">
              Vos documents apparaîtront ici après votre première paie.
            </p>
          )}
          {periodes.map((periode) => (
            <div key={periode} className="mt-4 rounded-2xl border border-line bg-white p-5">
              <h3 className="font-bold text-navy">{periode}</h3>
              <ul className="mt-2 space-y-1.5">
                {production
                  .filter((d) => (d.periode ?? "Sans période") === periode)
                  .map((d) => (
                    <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span>
                        <span className="font-medium text-navy">{d.titre}</span>{" "}
                        <span className="text-ink/60">({libelles[d.type] ?? d.type})</span>
                      </span>
                      <a
                        href={`/api/documents/${d.id}`}
                        className="font-semibold text-emerald-deep underline"
                      >
                        Télécharger
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
