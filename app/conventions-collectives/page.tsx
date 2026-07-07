import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableConventions from "@/components/TableConventions";

export const metadata: Metadata = {
  title: "Liste des conventions collectives (codes IDCC) et paie",
  description:
    "Toutes les conventions collectives et leurs codes IDCC : liste actualisée selon les publications officielles (créations, fusions). Trouvez votre convention et estimez le coût de votre paie externalisée.",
  alternates: {
    canonical: "https://paie-et-dsn.fr/conventions-collectives",
  },
};

const faq = [
  {
    question: "Comment trouver ma convention collective ?",
    reponse:
      "Trois pistes fiables : votre bulletin de paie, qui doit mentionner la convention applicable ; votre contrat de travail ; et l'activité réelle de l'entreprise, qui détermine la convention via son champ d'application. Le code APE donne une indication mais ne suffit pas juridiquement. En cas de doute, contactez-nous avec votre activité précise, nous identifierons la convention avec vous.",
  },
  {
    question: "Qu'est-ce qu'un code IDCC ?",
    reponse:
      "L'IDCC (identifiant de la convention collective) est le numéro attribué par le ministère du Travail à chaque convention. C'est lui qui figure dans la DSN et qui fait référence dans les échanges avec les organismes sociaux. Deux conventions peuvent avoir des intitulés proches : seul l'IDCC les distingue avec certitude.",
  },
  {
    question: "Ma convention a fusionné, laquelle s'applique ?",
    reponse:
      "Depuis la restructuration des branches professionnelles, de nombreuses conventions ont fusionné : les salariés du particulier employeur et les assistants maternels sont par exemple regroupés dans la convention des particuliers employeurs et de l'emploi à domicile, et les conventions territoriales de la métallurgie dans la convention nationale unique. La liste ci-dessus signale ces fusions et le numéro de la convention qui s'applique désormais à votre paie.",
  },
  {
    question: "Gérez-vous la paie de toutes les conventions collectives ?",
    reponse:
      "Notre référentiel couvre les 585 conventions de branche en vigueur, et chaque bulletin est établi selon la convention applicable à votre activité : grilles de salaires, primes, indemnités, caisses spécifiques (congés payés du bâtiment par exemple). Chaque reprise de dossier débute par un cadrage conventionnel ; les conventions à régime particulier font l'objet d'un temps de traitement adapté, reflété dans le devis. Et si aucune convention ne couvre votre activité (code 9999), nous établissons la paie sur le seul Code du travail, cas plus rare qu'on ne le croit mais parfaitement pris en charge.",
  },
];

export default function ConventionsCollectives() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://paie-et-dsn.fr",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Conventions collectives",
            item: "https://paie-et-dsn.fr/conventions-collectives",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.reponse },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main>
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Référentiel
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Liste des conventions collectives et de leurs codes IDCC
            </h1>
            <p className="mt-5 text-lg leading-relaxed">
              Votre convention collective détermine tout ce qui rend votre paie
              unique : grilles de salaires minima, primes, indemnités,
              classification des emplois, parfois des caisses spécifiques comme
              les congés payés du bâtiment. C&apos;est aussi elle qui figure,
              via son code IDCC, dans chaque déclaration sociale nominative
              (DSN). Cette liste suit les publications officielles du ministère
              du Travail : créations, réformes et fusions de branches y sont
              répercutées, et les conventions fusionnées renvoient vers celle
              qui s&apos;applique désormais.
            </p>
            <p className="mt-4 leading-relaxed">
              Recherchez votre convention par son intitulé ou son numéro IDCC,
              puis estimez le coût de votre paie externalisée en un clic : le
              simulateur tient compte de la complexité propre à chaque
              convention.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <TableConventions />
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Questions fréquentes sur les conventions collectives
            </h2>
            <div className="mt-8 space-y-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-line bg-ivory p-5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-navy">
                    {item.question}
                    <span
                      className="faq-chevron text-xl text-emerald-brand transition-transform"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed">{item.reponse}</p>
                </details>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-navy p-8 text-center">
              <p className="text-xl font-bold text-white">
                Votre convention est dans la liste ? La nôtre aussi.
              </p>
              <p className="mx-auto mt-2 max-w-md text-white/80">
                Estimez votre forfait de paie externalisée selon votre
                convention et votre effectif, puis recevez un devis précis sous
                48&nbsp;heures.
              </p>
              <a
                href="/#tarifs"
                className="mt-6 inline-block rounded-full bg-emerald-brand px-6 py-3 font-semibold text-white transition hover:bg-emerald-deep"
              >
                Accéder au simulateur
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
