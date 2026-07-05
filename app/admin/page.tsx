import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Deconnexion from "@/components/espace/Deconnexion";
import AdminPanel from "@/components/espace/AdminPanel";
import {
  clientServeur,
  clientService,
  configurationPresente,
  profilCourant,
} from "@/lib/supabase/server";
import { clientStripe, configurationStripePresente } from "@/lib/stripe";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

const libellesTypes: Record<string, string> = {
  bulletin: "Bulletin",
  journal_paie: "Journal de paie",
  etat_charges: "État des charges",
  cr_dsn: "CR DSN",
  facture: "Facture",
  mandat: "Mandat",
  justificatif: "Justificatif",
  archive: "Archive (zip)",
  autre: "Autre",
};

export default async function Admin() {
  if (!configurationPresente()) redirect("/espace-client");
  const { user, profil } = await profilCourant();
  if (!user || profil?.role !== "admin") redirect("/espace-client");

  const supabase = await clientServeur();
  const [{ data: organisations }, { data: profils }, { data: documents }, { data: ressources }] =
    await Promise.all([
      supabase.from("organisations").select("id, nom, siret, offre_paie, offre_essentiel, offre_copilote").order("nom"),
      supabase
        .from("profils")
        .select("user_id, nom, role, organisation_id")
        .order("role"),
      supabase
        .from("documents")
        .select("id, titre, type, periode, organisation_id, salarie_user_id, cree_le")
        .order("periode", { ascending: false })
        .order("cree_le", { ascending: false }),
      supabase
        .from("ressources")
        .select("id, titre, categorie, type_ressource, acces")
        .order("cree_le", { ascending: false }),
    ]);

  // E-mails : stockes dans auth.users, recuperes via l'API admin (cote serveur uniquement)
  const emails = new Map<string, string>();
  try {
    const service = clientService();
    const { data } = await service.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    for (const u of data?.users ?? []) {
      if (u.email) emails.set(u.id, u.email);
    }
  } catch {
    // Sans cle service valide, l'annuaire s'affiche sans e-mails
  }

  // Souscriptions en ligne (Stripe, lecture seule via la cle restreinte)
  type Souscription = {
    id: string;
    nom: string;
    email: string;
    formule: string;
    statut: string;
    resilieEnFin: boolean;
    depuis: string;
  };
  const nomsFormulesStripe: Record<string, string> = {
    essentiel: "L'Essentiel Social",
    copilote: "Le Copilote Social",
  };
  const statutsStripe: Record<string, string> = {
    active: "Actif",
    trialing: "Essai",
    past_due: "Impayé",
    unpaid: "Impayé",
    canceled: "Résilié",
    incomplete: "Incomplet",
    incomplete_expired: "Expiré",
    paused: "En pause",
  };
  let souscriptions: Souscription[] = [];
  let stripeIndisponible = false;
  if (configurationStripePresente()) {
    try {
      const stripe = clientStripe();
      const liste = await stripe.subscriptions.list({
        status: "all",
        limit: 100,
        expand: ["data.customer"],
      });
      souscriptions = liste.data
        .filter((s) => s.metadata?.source === "paie-et-dsn.fr")
        .map((s) => {
          const brut = s.customer;
          const client =
            typeof brut === "object" && !("deleted" in brut && brut.deleted)
              ? (brut as Stripe.Customer)
              : null;
          return {
            id: s.id,
            nom: client?.name ?? "",
            email: client?.email ?? "",
            formule:
              nomsFormulesStripe[s.metadata?.formule ?? ""] ??
              s.metadata?.formule ??
              "",
            statut: statutsStripe[s.status] ?? s.status,
            resilieEnFin: s.cancel_at_period_end,
            depuis: new Date(s.created * 1000).toLocaleDateString("fr-FR"),
          };
        });
    } catch {
      stripeIndisponible = true;
    }
  }
  const emailsComptes = new Set(
    [...emails.values()].map((e) => e.toLowerCase())
  );

  const listeOrganisations = organisations ?? [];
  const listeProfils = (profils ?? []).map((p) => ({
    ...p,
    email: emails.get(p.user_id) ?? null,
  }));
  const listeDocuments = documents ?? [];
  const listeRessources = ressources ?? [];
  const offres = [
    { cle: "offre_paie" as const, libelle: "Gestion de paie" },
    { cle: "offre_essentiel" as const, libelle: "L'Essentiel Social" },
    { cle: "offre_copilote" as const, libelle: "Le Copilote Social" },
  ];
  const nomUtilisateur = (id: string | null) => {
    if (!id) return "";
    const p = listeProfils.find((x) => x.user_id === id);
    return p?.nom ?? emails.get(id) ?? id.slice(0, 8);
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Back-office cabinet
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Administration
            </h1>
          </div>
          <Deconnexion />
        </div>

        <AdminPanel
          organisations={listeOrganisations}
          utilisateurs={listeProfils}
        />

        <section className="mt-12">
          <h2 className="text-xl font-bold text-navy">
            Souscriptions en ligne (Stripe)
          </h2>
          {stripeIndisponible ? (
            <p className="mt-2 text-sm text-ink/70">
              Lecture Stripe momentanément indisponible : consultez le
              dashboard Stripe.
            </p>
          ) : souscriptions.length === 0 ? (
            <p className="mt-2 text-sm text-ink/70">
              Aucune souscription en ligne pour le moment (les abonnements
              souscrits par virement n&apos;apparaissent pas ici).
            </p>
          ) : (
            <div className="mt-2 overflow-x-auto rounded-2xl border border-line bg-white p-4">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/60">
                    <th className="py-2 pr-3">Client</th>
                    <th className="py-2 pr-3">E-mail</th>
                    <th className="py-2 pr-3">Formule</th>
                    <th className="py-2 pr-3">Depuis</th>
                    <th className="py-2 pr-3">Statut</th>
                    <th className="py-2">Dossier</th>
                  </tr>
                </thead>
                <tbody>
                  {souscriptions.map((s) => (
                    <tr key={s.id} className="border-b border-line/60">
                      <td className="py-2 pr-3 font-medium text-navy">
                        {s.nom || "Sans nom"}
                      </td>
                      <td className="py-2 pr-3">{s.email}</td>
                      <td className="py-2 pr-3">{s.formule}</td>
                      <td className="py-2 pr-3">{s.depuis}</td>
                      <td className="py-2 pr-3">
                        <span
                          className={
                            s.statut === "Actif" || s.statut === "Essai"
                              ? "rounded-full bg-emerald-tint px-2 py-0.5 text-xs font-semibold text-emerald-deep"
                              : s.statut === "Résilié" || s.statut === "Expiré"
                                ? "rounded-full bg-ivory px-2 py-0.5 text-xs font-semibold text-ink/60"
                                : "rounded-full bg-amber-tint px-2 py-0.5 text-xs font-semibold text-amber-brand"
                          }
                        >
                          {s.statut}
                          {s.resilieEnFin && s.statut === "Actif"
                            ? " · fin de période"
                            : ""}
                        </span>
                      </td>
                      <td className="py-2">
                        {s.email && emailsComptes.has(s.email.toLowerCase()) ? (
                          <span className="text-xs font-semibold text-emerald-deep">
                            Rattaché
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-tint px-2 py-0.5 text-xs font-semibold text-amber-brand">
                            Dossier à créer
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-navy">
            Répartition des dossiers clients par offre
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {offres.map((offre) => {
              const dossiers = listeOrganisations.filter(
                (o) => (o as Record<string, unknown>)[offre.cle]
              );
              return (
                <div
                  key={offre.cle}
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  <h3 className="font-bold text-navy">
                    {offre.libelle}{" "}
                    <span className="text-sm font-normal text-ink/60">
                      ({dossiers.length})
                    </span>
                  </h3>
                  {dossiers.length === 0 ? (
                    <p className="mt-2 text-sm text-ink/70">Aucun dossier.</p>
                  ) : (
                    <ul className="mt-2 space-y-1 text-sm">
                      {dossiers.map((o) => (
                        <li key={o.id} className="font-medium text-navy">
                          {o.nom}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-navy">
            Espace documentaire ({listeRessources.length} ressource
            {listeRessources.length > 1 ? "s" : ""})
          </h2>
          {listeRessources.length === 0 ? (
            <p className="mt-2 text-sm text-ink/70">
              Aucune ressource déposée pour le moment.
            </p>
          ) : (
            <div className="mt-2 overflow-x-auto rounded-2xl border border-line bg-white p-4">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/60">
                    <th className="py-2 pr-3">Titre</th>
                    <th className="py-2 pr-3">Type</th>
                    <th className="py-2 pr-3">Catégorie</th>
                    <th className="py-2 pr-3">Accès</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {listeRessources.map((r) => (
                    <tr key={r.id} className="border-b border-line/60">
                      <td className="py-2 pr-3 font-medium text-navy">{r.titre}</td>
                      <td className="py-2 pr-3">{r.type_ressource}</td>
                      <td className="py-2 pr-3">{r.categorie ?? ""}</td>
                      <td className="py-2 pr-3">{r.acces}</td>
                      <td className="py-2 text-right">
                        <a
                          href={`/api/ressources/${r.id}`}
                          className="font-semibold text-emerald-deep underline"
                        >
                          Télécharger
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-navy">
            Vue d&apos;ensemble : comptes et documents
          </h2>

          {listeProfils.some((p) => p.role === "admin") && (
            <div className="mt-4 rounded-2xl border border-line bg-white p-5">
              <h3 className="font-bold text-navy">Comptes cabinet (admin)</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {listeProfils
                  .filter((p) => p.role === "admin")
                  .map((p) => (
                    <li key={p.user_id}>
                      <span className="font-medium text-navy">
                        {p.nom ?? "Sans nom"}
                      </span>{" "}
                      <span className="text-ink/60">{p.email ?? ""}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {listeOrganisations.map((org) => {
            const membres = listeProfils.filter(
              (p) => p.organisation_id === org.id
            );
            const docs = listeDocuments.filter(
              (d) => d.organisation_id === org.id
            );
            return (
              <div
                key={org.id}
                className="mt-4 rounded-2xl border border-line bg-white p-5"
              >
                <h3 className="flex flex-wrap items-center gap-2 font-bold text-navy">
                  {org.nom}
                  {org.siret && (
                    <span className="text-sm font-normal text-ink/60">
                      · SIRET {org.siret}
                    </span>
                  )}
                  {offres
                    .filter((offre) => (org as Record<string, unknown>)[offre.cle])
                    .map((offre) => (
                      <span
                        key={offre.cle}
                        className="rounded-full bg-emerald-tint px-2 py-0.5 text-xs font-semibold text-emerald-deep"
                      >
                        {offre.libelle}
                      </span>
                    ))}
                </h3>

                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink/60">
                  Comptes ({membres.length})
                </p>
                {membres.length === 0 ? (
                  <p className="mt-1 text-sm text-ink/70">Aucun compte.</p>
                ) : (
                  <ul className="mt-1 space-y-1 text-sm">
                    {membres.map((p) => (
                      <li key={p.user_id} className="flex flex-wrap gap-2">
                        <span className="font-medium text-navy">
                          {p.nom ?? "Sans nom"}
                        </span>
                        <span className="text-ink/60">{p.email ?? ""}</span>
                        <span className="rounded-full bg-emerald-tint px-2 text-xs font-semibold leading-5 text-emerald-deep">
                          {p.role}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink/60">
                  Documents ({docs.length})
                </p>
                {docs.length === 0 ? (
                  <p className="mt-1 text-sm text-ink/70">Aucun document.</p>
                ) : (
                  <div className="mt-1 overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/60">
                          <th className="py-2 pr-3">Titre</th>
                          <th className="py-2 pr-3">Type</th>
                          <th className="py-2 pr-3">Période</th>
                          <th className="py-2 pr-3">Destinataire</th>
                          <th className="py-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {docs.map((d) => (
                          <tr key={d.id} className="border-b border-line/60">
                            <td className="py-2 pr-3 font-medium text-navy">
                              {d.titre}
                            </td>
                            <td className="py-2 pr-3">
                              {libellesTypes[d.type] ?? d.type}
                            </td>
                            <td className="py-2 pr-3">{d.periode ?? ""}</td>
                            <td className="py-2 pr-3">
                              {nomUtilisateur(d.salarie_user_id)}
                            </td>
                            <td className="py-2 text-right">
                              <a
                                href={`/api/documents/${d.id}`}
                                className="font-semibold text-emerald-deep underline"
                              >
                                Télécharger
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
