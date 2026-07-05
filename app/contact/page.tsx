import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormulaireContact from "@/components/FormulaireContact";

export const metadata: Metadata = {
  title: "Contactez le cabinet : devis, abonnements, assurances, partenariats",
  description:
    "Contactez le cabinet via le formulaire : devis de paie externalisée, particulier employeur, abonnements veille sociale, assurances de l'employeur, partenariats. Réponse sous 48 heures.",
  alternates: { canonical: "https://paie-et-dsn.fr/contact" },
};

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ sujet?: string; formule?: string }>;
}) {
  const parametres = await searchParams;
  const abonnement = parametres.sujet === "abonnement";
  const nomFormule =
    parametres.formule === "copilote"
      ? "Le Copilote Social"
      : parametres.formule === "essentiel"
        ? "L'Essentiel Social"
        : null;
  const typeInitial = abonnement
    ? "Abonnements veille sociale et RH"
    : undefined;
  const messageInitial =
    abonnement && nomFormule
      ? `Je souhaite souscrire la formule ${nomFormule} avec paiement par virement à réception de facture.`
      : undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "ProfessionalService",
      name: "paie-et-dsn.fr · Cabinet Cholez-Pagotto",
      url: "https://paie-et-dsn.fr/contact",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12 rue d'Olima",
        postalCode: "88000",
        addressLocality: "Épinal",
        addressCountry: "FR",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Contactez le cabinet
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Devis de paie, abonnements, assurances, partenariat ou toute autre
          demande : sélectionnez votre sujet et décrivez votre situation. Nous
          vous répondons sous 48&nbsp;heures ouvrées, avec selon le cas un
          devis détaillé ou la bonne orientation. Aucune demande ne reste sans
          réponse.
        </p>

        <div className="mt-10 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <FormulaireContact
            typeInitial={typeInitial}
            messageInitial={messageInitial}
          />
        </div>

                <p className="mt-6 text-xs leading-relaxed text-ink/70">
          Les données transmises via ce formulaire sont utilisées uniquement
          pour traiter votre demande et, le cas échéant, établir un devis,
          conformément à notre politique de confidentialité. Aucune donnée
          n&apos;est utilisée à des fins de prospection sans votre accord.
        </p>
      </main>
      <Footer />
    </>
  );
}
