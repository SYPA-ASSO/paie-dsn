import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Comprendre votre bulletin de paie ligne par ligne",
  description:
    "Salaire brut, cotisations, montant net social, net à payer, prélèvement à la source : à quoi correspond chaque ligne de votre bulletin de paie, et combien de temps le conserver. Guide clair pour employeurs et salariés.",
  alternates: {
    canonical: "https://paie-et-dsn.fr/comprendre-bulletin-de-paie",
  },
};

const faq = [
  {
    question: "Qu'est-ce que le montant net social ?",
    reponse:
      "C'est une mention obligatoire du bulletin depuis juillet 2023 : le revenu de référence que le salarié déclare aux organismes sociaux pour ses droits, notamment la prime d'activité et le RSA. Il se distingue du net à payer (ce qui arrive sur le compte) et du net imposable (la base de l'impôt sur le revenu). Trois montants différents, trois usages différents.",
  },
  {
    question: "Combien de temps conserver un bulletin de paie ?",
    reponse:
      "Le salarié a intérêt à conserver ses bulletins sans limitation de durée : ils servent à faire valoir les droits à la retraite, parfois des décennies plus tard. L'employeur doit conserver un exemplaire des bulletins pendant au moins 5 ans. En cas de bulletin électronique, sa disponibilité doit être garantie sur une très longue durée par un dispositif adapté.",
  },
  {
    question: "Pourquoi le brut et le net sont-ils si différents ?",
    reponse:
      "Entre le salaire brut et le net à payer s'intercalent les cotisations salariales (retraite, maladie via la CSG-CRDS, chômage pour partie, prévoyance et mutuelle selon les cas), puis le prélèvement à la source de l'impôt sur le revenu. Côté employeur s'ajoutent les cotisations patronales, qui n'apparaissent au salarié que dans la rubrique du coût global.",
  },
  {
    question: "Que faire si une ligne du bulletin semble fausse ?",
    reponse:
      "Commencez par vérifier la convention collective applicable (elle doit être mentionnée sur le bulletin) et le taux horaire au regard du minimum conventionnel. Le salarié peut demander une rectification sans délai préfix strict, mais les rappels de salaire se prescrivent par 3 ans : mieux vaut signaler tôt. Pour l'employeur, une erreur corrigée rapidement se régularise simplement sur la paie suivante et dans la DSN.",
  },
];

const lignes = [
  {
    titre: "L'en-tête : qui, quoi, sous quelle convention",
    texte:
      "Identité de l'employeur et du salarié, emploi occupé, classification, et surtout la convention collective applicable, mention obligatoire qui détermine les minima et les primes. C'est la première chose à vérifier : une convention erronée fausse tout le reste.",
  },
  {
    titre: "Le salaire brut",
    texte:
      "Salaire de base, heures supplémentaires ou complémentaires avec leurs majorations, primes et avantages en nature. C'est l'assiette sur laquelle se calculent les cotisations.",
  },
  {
    titre: "Les cotisations, regroupées par risque",
    texte:
      "Depuis le bulletin clarifié, les lignes sont regroupées par risque couvert : santé, accidents du travail, retraite, famille, assurance chômage, plus la CSG et la CRDS. Chaque ligne distingue la part salariale, déduite du brut, et la part patronale, payée en plus par l'employeur.",
  },
  {
    titre: "Le montant net social",
    texte:
      "Revenu de référence pour les prestations sociales, affiché sur une ligne dédiée. C'est ce montant, et non le net à payer, que le salarié reporte dans ses déclarations à la CAF.",
  },
  {
    titre: "Le prélèvement à la source",
    texte:
      "L'impôt sur le revenu est retenu directement, au taux transmis par l'administration fiscale (ou au taux neutre si le salarié l'a choisi). Le bulletin affiche le net imposable, le taux appliqué et le montant prélevé.",
  },
  {
    titre: "Le net à payer et le coût global",
    texte:
      "Le net à payer avant impôt, puis le net effectivement versé après prélèvement à la source, mis en évidence. Figure aussi le total versé par l'employeur : la somme du brut et des cotisations patronales, le vrai coût du travail.",
  },
  {
    titre: "Les compteurs et mentions finales",
    texte:
      "Congés payés acquis et pris, éventuel compteur de RTT, cumuls annuels, et les mentions obligatoires de fin de bulletin, dont l'invitation à conserver le bulletin sans limitation de durée.",
  },
];

export default function ComprendreBulletin() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.reponse },
        })),
      },
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
            name: "Comprendre votre bulletin de paie",
            item: "https://paie-et-dsn.fr/comprendre-bulletin-de-paie",
          },
        ],
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
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Pédagogie
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Comprendre votre bulletin de paie, ligne par ligne
        </h1>
        <div className="mt-8 space-y-6 leading-relaxed">
          <p>
            Le bulletin de paie est le document le plus distribué de France et
            l&apos;un des moins lus, faute d&apos;être compris. Employeur, il
            engage pourtant votre responsabilité ; salarié, il conditionne vos
            droits, jusqu&apos;à votre retraite. Voici à quoi correspond chaque
            bloc du bulletin clarifié, dans l&apos;ordre où vous le lisez.
          </p>

          {lignes.map((l) => (
            <section key={l.titre}>
              <h2 className="pt-2 text-xl font-bold">{l.titre}</h2>
              <p className="mt-2">{l.texte}</p>
            </section>
          ))}

          <h2 className="pt-4 text-2xl font-bold">Questions fréquentes</h2>
          <div className="space-y-4">
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

          <div className="mt-8 rounded-2xl bg-emerald-tint p-6 text-center">
            <p className="font-semibold text-navy">
              Vous préférez que vos bulletins soient justes sans avoir à les
              décortiquer ?
            </p>
            <a
              href="/contact"
              className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-deep"
            >
              Confier ma paie au cabinet
            </a>
          </div>

          <p className="text-sm text-ink/70">
            Contenu d&apos;information générale, rédigé et vérifié par notre
            juriste ; il ne constitue pas une consultation juridique.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
