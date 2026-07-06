import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mandat de tiers déclarant : qui peut transmettre votre DSN ?",
  description:
    "Le mandat de tiers déclarant autorise un prestataire à transmettre vos DSN via net-entreprises. Fonctionnement, signature, révocation : tout comprendre avant de déléguer vos déclarations sociales.",
  alternates: { canonical: "https://paie-et-dsn.fr/mandat-tiers-declarant" },
};

const faq = [
  {
    question: "Le mandat me dessaisit-il de mes obligations d'employeur ?",
    reponse:
      "Non. Le mandat porte sur la transmission des déclarations, pas sur la qualité d'employeur : vous restez titulaire de vos obligations légales, et nous agissons pour votre compte et sous votre contrôle. C'est précisément pour cela que les bulletins vous sont soumis avant transmission de la DSN.",
  },
  {
    question: "Puis-je révoquer le mandat ?",
    reponse:
      "Oui, à tout moment, par simple écrit. La révocation prend effet pour les déclarations non encore transmises. Le mandat reste consultable en permanence dans votre espace employeur, avec sa date de signature.",
  },
  {
    question: "Faut-il un mandat par organisme ?",
    reponse:
      "Non. Le mandat couvre la transmission de vos déclarations sociales via net-entreprises, le point d'entrée unique de la DSN, qui répartit ensuite les données vers chaque organisme (Urssaf, caisses de retraite, prévoyance, France Travail).",
  },
];

export default function MandatTiersDeclarant() {
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
          Comprendre
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Le mandat de tiers déclarant, ou qui peut transmettre votre DSN
        </h1>
        <div className="mt-8 space-y-6 leading-relaxed">
          <p>
            La déclaration sociale nominative (DSN) est transmise chaque mois
            aux organismes sociaux via net-entreprises. L&apos;employeur peut
            la transmettre lui-même, ou confier cette transmission à un tiers :
            son expert-comptable, ou un prestataire de paie comme notre
            cabinet. Ce tiers agit alors en qualité de{" "}
            <strong>tiers déclarant</strong>, un statut expressément prévu par
            le dispositif déclaratif, qui n&apos;est pas réservé aux
            experts-comptables.
          </p>
          <p>
            Une seule condition de forme : un <strong>mandat écrit</strong>,
            par lequel vous nous autorisez à transmettre vos déclarations pour
            votre compte. Chez nous, il se signe électroniquement à
            l&apos;ouverture de votre dossier, en même temps que le devis, et
            reste ensuite consultable en permanence dans votre espace
            employeur. Il est révocable à tout moment.
          </p>

          <h2 className="pt-2 text-2xl font-bold">
            Concrètement, chaque mois
          </h2>
          <p>
            Vous transmettez vos variables, nous établissons les bulletins et
            les mettons à votre disposition. Vous disposez de 48&nbsp;heures
            pour formuler une observation ; sans retour de votre part, les
            bulletins sont réputés validés et la DSN part aux organismes à
            l&apos;échéance légale (le 5 ou le 15 du mois suivant selon votre
            effectif). Vous recevez les comptes rendus de transmission : vous
            savez, preuve à l&apos;appui, que vos déclarations sont parties et
            ont été acceptées. Les événements (arrêt de travail, fin de
            contrat) font l&apos;objet de DSN événementielles transmises dans
            les délais réglementaires dès que vous nous les signalez.
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

          <div className="mt-8 rounded-2xl bg-navy p-6 text-center">
            <p className="font-semibold text-white">
              Prêt à déléguer vos déclarations en toute sécurité ?
            </p>
            <a
              href="/#contact"
              className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-deep"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
