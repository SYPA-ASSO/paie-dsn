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
  autre: "Autre",
};

export default async function Admin() {
  if (!configurationPresente()) redirect("/espace-client");
  const { user, profil } = await profilCourant();
  if (!user || profil?.role !== "admin") redirect("/espace-client");

  const supabase = await clientServeur();
  const [{ data: organisations }, { data: profils }, { data: documents }] =
    await Promise.all([
      supabase.from("organisations").select("id, nom, siret").order("nom"),
      supabase
        .from("profils")
        .select("user_id, nom, role, organisation_id")
        .order("role"),
      supabase
        .from("documents")
        .select("id, titre, type, periode, organisation_id, salarie_user_id, cree_le")
        .order("periode", { ascending: false })
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

  const listeOrganisations = organisations ?? [];
  const listeProfils = (profils ?? []).map((p) => ({
    ...p,
    email: emails.get(p.user_id) ?? null,
  }));
  const listeDocuments = documents ?? [];
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
                <h3 className="font-bold text-navy">
                  {org.nom}{" "}
                  {org.siret && (
                    <span className="text-sm font-normal text-ink/60">
                      · SIRET {org.siret}
                    </span>
                  )}
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
