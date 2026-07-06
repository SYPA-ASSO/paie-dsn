import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Deconnexion from "@/components/espace/Deconnexion";
import AdminPanel, {
  type SouscriptionARattacher,
} from "@/components/espace/AdminPanel";
import AdminSections from "@/components/espace/AdminSections";
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
  // Souscriptions actives sans compte correspondant : proposees au pre-remplissage
  const clesFormules: Record<string, string> = {
    "L'Essentiel Social": "essentiel",
    "Le Copilote Social": "copilote",
  };
  const aRattacher: SouscriptionARattacher[] = souscriptions
    .filter(
      (s) =>
        (s.statut === "Actif" || s.statut === "Essai") &&
        s.email &&
        !emailsComptes.has(s.email.toLowerCase())
    )
    .map((s) => ({
      nom: s.nom,
      email: s.email,
      formule: clesFormules[s.formule] ?? "essentiel",
    }));

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
          aRattacher={aRattacher}
        />

        <AdminSections
          souscriptions={souscriptions}
          stripeIndisponible={stripeIndisponible}
          organisations={listeOrganisations}
          profils={listeProfils}
          documents={documents ?? []}
          ressources={ressources ?? []}
          emailsComptes={[...emailsComptes]}
        />

      </main>
      <Footer />
    </>
  );
}
