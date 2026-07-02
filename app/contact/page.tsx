import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormulaireContact from "@/components/FormulaireContact";

export const metadata: Metadata = {
  title: "Contact : demandez votre devis de paie externalisée",
  description:
    "Contactez le cabinet via le formulaire : devis de paie externalisée, particulier employeur, abonnements veille sociale, assurances de l'employeur, partenariats. Réponse sous 48 heures.",
  alternates: { canonical: "https://paie-et-dsn.fr/contact" },
};

export default function Contact() {
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
          Parlons de votre paie
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Sélectionnez votre demande et décrivez votre situation : nous vous
          répondons sous 48&nbsp;heures ouvrées avec, selon le cas, un devis
          détaillé ou la bonne orientation. Aucune demande ne reste sans
          réponse.
        </p>

        <div className="mt-10 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <FormulaireContact />
        </div>

        <div className="mt-8 rounded-2xl bg-navy p-6 text-white sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-brand">
            Le cabinet
          </p>
          <p className="mt-2 font-semibold">
            Cabinet Cholez-Pagotto · 12 rue d&apos;Olima, 88000 Épinal
          </p>
          <p className="mt-1 text-sm text-white/80">
            Les échanges s&apos;effectuent via le formulaire ci-dessus, qui
            nous parvient immédiatement et nous permet de vous répondre avec
            votre dossier déjà qualifié.
          </p>
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
