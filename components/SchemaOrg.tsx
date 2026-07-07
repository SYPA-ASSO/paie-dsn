import { faqItems } from "./Faq";

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://paie-et-dsn.fr/#website",
        url: "https://paie-et-dsn.fr",
        name: "paie-et-dsn.fr",
        inLanguage: "fr-FR",
        publisher: { "@id": "https://paie-et-dsn.fr/#organization" },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://paie-et-dsn.fr/#organization",
        name: "paie-et-dsn.fr — Cabinet Cholez-Pagotto",
        url: "https://paie-et-dsn.fr",
        description:
          "Externalisation de la paie et des déclarations sociales (DSN) pour les TPE, PME, associations, professions libérales et particuliers employeurs. Référentiel des 585 conventions collectives de branche en vigueur.",
        telephone: "+33374474055",
        address: {
          "@type": "PostalAddress",
          streetAddress: "12 rue d'Olima",
          postalCode: "88000",
          addressLocality: "Épinal",
          addressCountry: "FR",
        },
        areaServed: "FR",
        parentOrganization: {
          "@type": "Organization",
          name: "Cabinet Cholez-Pagotto",
          url: "https://cholez-pagotto.fr",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Prestations de paie externalisée",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Établissement des bulletins de paie",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Transmission des DSN mensuelles et événementielles",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Gestion des entrées et sorties de salariés",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://paie-et-dsn.fr/#faq",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.reponse,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
