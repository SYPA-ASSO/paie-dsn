import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BoutonsSouscription from "@/components/BoutonsSouscription";

export const metadata: Metadata = {
  title: "Veille sociale et RH : deux formules d'abonnement pour employeurs",
  description:
    "L'Essentiel Social (109,90 € par mois) et Le Copilote Social (229,90 € par mois) : newsletters hebdomadaires, jurisprudences commentées, webinaires, plus de 350 modèles de documents social et RH, alertes et assistance prioritaire.",
  alternates: { canonical: "https://paie-et-dsn.fr/veille-sociale-rh" },
};

const socleCommun = [
  "Newsletters hebdomadaires sur l'actualité sociale, RH et paie",
  "Jurisprudences commentées, expliquées côté employeur",
  "Webinaires gratuits tout au long de l'année",
  "Plus de 350 modèles de documents social et RH",
  "Alertes et informations sur les actualités qui vous concernent",
];

const exclusifsCopilote = [
  "Dossiers de synthèse et procédures RH prêtes à dérouler",
  "Outils de gestion de l'entreprise",
  "Priorité en information juridique employeur",
  "Priorité en assistance administrative dans la gestion et le suivi paie et RH d'un salarié",
  "Frais de dossier offerts pour toutes études assurantielles",
];

export default function VeilleSocialeRh() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Veille sociale et RH",
    provider: {
      "@type": "Organization",
      name: "paie-et-dsn.fr · Cabinet Cholez-Pagotto",
      url: "https://paie-et-dsn.fr",
    },
    offers: [
      {
        "@type": "Offer",
        name: "L'Essentiel Social",
        price: "109.90",
        priceCurrency: "EUR",
        description:
          "Newsletters hebdomadaires, jurisprudences commentées, webinaires gratuits, plus de 350 modèles de documents social et RH, alertes sur les actualités sociales, RH et paie. Abonnement mensuel.",
      },
      {
        "@type": "Offer",
        name: "Le Copilote Social",
        price: "229.90",
        priceCurrency: "EUR",
        description:
          "Tout L'Essentiel Social, plus dossiers de synthèse et procédures RH, outils de gestion, priorité en information juridique employeur et en assistance administrative paie et RH, frais de dossier offerts pour toutes études assurantielles. Abonnement mensuel.",
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
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Options d&apos;abonnement
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl">
          Veille sociale et RH : soyez informé avant d&apos;être concerné
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed">
          Le droit social bouge en permanence : minima conventionnels, taux de
          cotisations, réformes, jurisprudences qui changent la donne. Nos
          clients en paie bénéficient déjà de l&apos;essentiel, la veille est
          appliquée automatiquement à leurs bulletins. Les abonnements vont
          plus loin : ils vous expliquent ce qui change, pourquoi, et ce que
          cela implique pour vos décisions d&apos;employeur, avec les modèles
          et les outils pour agir.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-line bg-white p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-ink/60">
              Formule 1
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
              L&apos;Essentiel Social
            </h2>
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-emerald-deep">
              109,90&nbsp;€{" "}
              <span className="text-base font-semibold text-ink/70">
                par mois
              </span>
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Sans engagement, résiliable chaque mois.
             Prix toutes taxes : TVA non applicable, article 293 B du CGI.</p>
            <ul className="mt-6 flex-1 space-y-3">
              {socleCommun.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-brand"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <BoutonsSouscription
              formule="essentiel"
              libelle="Souscrire L'Essentiel Social"
            />
          </article>

          <article className="relative flex flex-col rounded-3xl border-2 border-emerald-brand bg-white p-8 shadow-lg">
            <span className="absolute -top-3 left-8 rounded-full bg-emerald-brand px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Le plus complet
            </span>
            <p className="text-sm font-bold uppercase tracking-wide text-ink/60">
              Formule 2
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-navy">
              Le Copilote Social
            </h2>
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-emerald-deep">
              229,90&nbsp;€{" "}
              <span className="text-base font-semibold text-ink/70">
                par mois
              </span>
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Sans engagement, résiliable chaque mois.
            </p>
            <p className="mt-6 text-sm font-semibold text-navy">
              Tout L&apos;Essentiel Social, et en plus :
            </p>
            <ul className="mt-3 flex-1 space-y-3">
              {exclusifsCopilote.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-brand"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <BoutonsSouscription
              formule="copilote"
              libelle="Souscrire Le Copilote Social"
              principal
            />
          </article>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/80">
          Les contenus et l&apos;assistance de ces abonnements relèvent de
          l&apos;information générale et de l&apos;assistance administrative :
          ils ne constituent pas un conseil juridique. Lorsqu&apos;une
          situation appelle une consultation juridique personnalisée, nous vous
          orientons vers un avocat partenaire, conformément à{" "}
          <a
            href="/notre-perimetre"
            className="font-semibold text-emerald-deep underline"
          >
            notre périmètre d&apos;intervention
          </a>
          . Les abonnements peuvent être souscrits avec ou sans forfait de
          paie.
        </p>
      </main>
      <Footer />
    </>
  );
}
