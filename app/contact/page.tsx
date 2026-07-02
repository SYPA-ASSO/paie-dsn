import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact : demandez votre devis de paie externalisée",
  description:
    "Contactez le cabinet pour un devis de paie externalisée, une question sur votre convention collective ou les options veille sociale et assurances. Réponse sous 48 heures.",
  alternates: { canonical: "https://paie-et-dsn.fr/contact" },
};

const motifs = [
  {
    titre: "Devis de paie externalisée",
    texte:
      "Indiquez votre effectif, votre convention collective et votre situation (première embauche, changement de prestataire, reprise d'un dossier).",
    sujet: "Demande de devis paie et DSN",
  },
  {
    titre: "Particulier employeur",
    texte:
      "Décrivez l'emploi à domicile concerné : assistant de vie, garde d'enfants, employé de maison, et votre mode de déclaration actuel.",
    sujet: "Particulier employeur : demande d'accompagnement",
  },
  {
    titre: "Veille sociale et RH",
    texte:
      "Précisez la formule qui vous intéresse, L'Essentiel Social ou Le Copilote Social, et votre convention collective.",
    sujet: "Abonnement veille sociale et RH",
  },
  {
    titre: "Assurances de l'employeur",
    texte:
      "Santé et prévoyance collectives, flotte, RC pro, cyber : dites-nous ce que vous souhaitez couvrir ou comparer.",
    sujet: "Étude assurantielle employeur",
  },
];

export default function Contact() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "ProfessionalService",
      name: "paie-et-dsn.fr · Cabinet Cholez-Pagotto",
      telephone: "+33374474055",
      email: "contact@cholez-pagotto.fr",
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
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Parlons de votre paie
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed">
          Décrivez votre situation en quelques lignes : nous vous répondons
          sous 48&nbsp;heures avec, selon le cas, un devis détaillé ou la bonne
          orientation. Aucune demande ne reste sans réponse.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {motifs.map((motif) => (
            <article
              key={motif.titre}
              className="flex flex-col rounded-2xl border border-line bg-white p-6"
            >
              <h2 className="text-lg font-bold">{motif.titre}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed">
                {motif.texte}
              </p>
              <a
                href={`mailto:contact@cholez-pagotto.fr?subject=${encodeURIComponent(motif.sujet)}`}
                className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-deep"
              >
                Écrire au cabinet
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 rounded-2xl bg-navy p-8 text-white sm:grid-cols-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber-brand">
              E-mail
            </p>
            <a
              href="mailto:contact@cholez-pagotto.fr"
              className="mt-1 block font-semibold hover:underline"
            >
              contact@cholez-pagotto.fr
            </a>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber-brand">
              Téléphone
            </p>
            <a
              href="tel:+33374474055"
              className="mt-1 block font-semibold hover:underline"
            >
              03&nbsp;74&nbsp;47&nbsp;40&nbsp;55
            </a>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber-brand">
              Adresse
            </p>
            <p className="mt-1 font-semibold">
              Cabinet Cholez-Pagotto
              <br />
              12 rue d&apos;Olima, 88000 Épinal
            </p>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink/70">
          Les données transmises par e-mail sont utilisées uniquement pour
          répondre à votre demande et établir un devis, conformément à notre
          politique de confidentialité. Aucune donnée n&apos;est utilisée à des
          fins de prospection sans votre accord.
        </p>
      </main>
      <Footer />
    </>
  );
}
