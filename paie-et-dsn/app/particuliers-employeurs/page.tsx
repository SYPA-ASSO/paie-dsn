import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Paie du particulier employeur : bulletins, CESU, déclarations",
  description:
    "Vous employez un salarié à domicile (assistant de vie, garde d'enfants, employé de maison) ? Nous préparons calculs, contrats et documents selon la convention collective des particuliers employeurs ; vous déclarez sereinement au CESU. Du contrat au départ, vous êtes accompagné.",
  alternates: { canonical: "https://paie-et-dsn.fr/particuliers-employeurs" },
};

const faq = [
  {
    question: "J'utilise le CESU, ai-je besoin de vous ?",
    reponse:
      "Le CESU simplifie la déclaration, pas le droit du travail. Congés payés, majorations, jours fériés, absences, prime conventionnelle : le calcul des éléments à déclarer reste à votre charge, tout comme le contrat de travail et les documents de fin de contrat. Nous préparons ces calculs et documents pour vous ; la déclaration au CESU reste effectuée par vos soins, en quelques minutes, avec des chiffres justes.",
  },
  {
    question: "Quelle convention collective s'applique à mon salarié ?",
    reponse:
      "La convention collective nationale des particuliers employeurs et de l'emploi à domicile (IDCC 3239), qui regroupe depuis 2022 les anciennes conventions des salariés du particulier employeur et des assistants maternels. Elle fixe les salaires minima, les majorations, les congés et les règles de rupture propres à l'emploi à domicile.",
  },
  {
    question: "Que se passe-t-il si je dois me séparer de mon salarié ?",
    reponse:
      "Le licenciement d'un salarié à domicile obéit à une procédure spécifique, distincte du droit commun, avec des indemnités et des documents de fin de contrat obligatoires. C'est la situation où l'accompagnement compte le plus : nous calculons les sommes dues et préparons l'ensemble des documents. Pour la stratégie ou un litige, nous vous orientons vers un avocat.",
  },
];

export default function ParticuliersEmployeurs() {
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
          Emploi à domicile
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Particulier employeur : votre paie gérée, votre tranquillité aussi
        </h1>
        <div className="mt-8 space-y-6 leading-relaxed">
          <p>
            Employer un assistant de vie, une garde d&apos;enfants ou un
            employé de maison fait de vous un employeur à part entière, avec
            les obligations qui vont avec : un contrat de travail écrit, une
            rémunération conforme à la convention collective des particuliers
            employeurs et de l&apos;emploi à domicile, des congés payés à
            calculer, des déclarations à effectuer, et une procédure précise le
            jour où le contrat prend fin. La plupart des particuliers
            employeurs découvrent ces règles au pire moment : quand un problème
            survient.
          </p>
          <p>
            Notre cabinet vous fait passer devant le problème. Nous calculons
            chaque mois les éléments de votre salarié (salaire, congés payés,
            majorations et indemnités conformes à la convention), préparons le
            contrat de travail, ses avenants et tous les documents
            obligatoires, et vous remettons les chiffres exacts à reporter
            dans votre déclaration CESU, que vous effectuez vous-même en
            quelques minutes. Vous restez l&apos;employeur et le déclarant ;
            nous sommes votre appui.
          </p>

          <h2 className="pt-2 text-2xl font-bold">
            Ce qui est inclus pour un particulier employeur
          </h2>
          <p>
            Le calcul mensuel des éléments de paie de votre salarié (salaire,
            congés payés, majorations conventionnelles), les chiffres prêts à
            reporter dans votre déclaration CESU, le contrat de travail et ses
            avenants, le suivi des évolutions du salaire minimum
            conventionnel, et l&apos;accompagnement des moments sensibles :
            embauche, arrêt de travail, fin de contrat avec le calcul des
            indemnités et les documents obligatoires. Le tout pour un forfait mensuel simple,
            estimable en quelques secondes avec notre{" "}
            <a
              href="/#tarifs"
              className="font-semibold text-emerald-deep underline"
            >
              simulateur
            </a>
            .
          </p>

          <h2 className="pt-2 text-2xl font-bold">Questions fréquentes</h2>
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
              Décrivez-nous votre situation d&apos;emploi à domicile
            </p>
            <p className="mt-1 text-sm">
              Devis gratuit sous 48&nbsp;heures, sans engagement.
            </p>
            <a
              href="/#contact"
              className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-deep"
            >
              Demander mon devis
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
