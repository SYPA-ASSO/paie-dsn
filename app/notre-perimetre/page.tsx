import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Notre périmètre d'intervention : ce que nous faisons, et pas",
  description:
    "Gestionnaire de paie indépendant : ce que le cabinet réalise (bulletins, DSN, entrées et sorties) et ce qu'il ne fait pas (travaux comptables, conseil juridique détaché). Transparence totale sur le cadre légal.",
  alternates: { canonical: "https://paie-et-dsn.fr/notre-perimetre" },
};

export default function NotrePerimetre() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Transparence
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Notre périmètre d&apos;intervention
        </h1>
        <div className="mt-8 space-y-6 leading-relaxed">
          <p>
            La gestion de la paie se situe au carrefour de plusieurs
            professions réglementées. Plutôt que d&apos;entretenir le flou,
            nous préférons dire précisément ce que nous faisons, ce que nous ne
            faisons pas, et pourquoi. C&apos;est une exigence légale, mais
            c&apos;est surtout la condition d&apos;une relation de confiance.
          </p>

          <h2 className="pt-2 text-2xl font-bold">Ce que nous faisons</h2>
          <p>
            Le cabinet établit vos bulletins de paie selon votre convention
            collective, produit et transmet vos DSN mensuelles et
            événementielles en qualité de tiers déclarant mandaté, gère les
            formalités d&apos;entrée (DPAE, affiliations) et de sortie (solde
            de tout compte, certificat de travail, attestation France Travail)
            de vos salariés, et vous remet chaque mois le journal de paie,
            l&apos;état des charges et les données destinées à votre
            expert-comptable. Nous répondons également à toutes vos questions
            directement liées à l&apos;exécution de votre paie : traitement
            d&apos;un arrêt de travail, calcul d&apos;une indemnité,
            application d&apos;une prime conventionnelle.
          </p>

          <h2 className="pt-2 text-2xl font-bold">
            Ce que nous ne faisons pas, et pourquoi
          </h2>
          <p>
            <strong>Aucun travail comptable.</strong> La tenue, la
            centralisation et la révision des comptabilités sont réservées aux
            experts-comptables par l&apos;ordonnance n°&nbsp;45-2138 du 19
            septembre 1945. La production de la paie n&apos;en fait pas partie,
            et la Cour de cassation a confirmé que la saisie de données dans un
            logiciel ne relève pas, à elle seule, de ce monopole. Nous restons
            strictement de ce côté de la frontière : nous vous remettons les
            données de paie, et c&apos;est votre expert-comptable qui passe les
            écritures dans votre comptabilité. Les deux métiers sont
            complémentaires, pas concurrents.
          </p>
          <p>
            <strong>Aucun conseil juridique détaché de la paie.</strong> La
            consultation juridique personnalisée est encadrée par la loi
            n°&nbsp;71-1130 du 31 décembre 1971. Son article 60 nous autorise à
            vous conseiller sur ce qui relève directement de notre activité
            principale de gestion de paie ; au-delà (stratégie de rupture,
            contentieux prud&apos;homal, restructuration), nous vous orientons
            vers un avocat partenaire. Vous êtes ainsi toujours conseillé par
            le professionnel dont c&apos;est le métier et la responsabilité.
          </p>

          <h2 className="pt-2 text-2xl font-bold">
            Qui nous autorise à transmettre vos DSN ?
          </h2>
          <p>
            Vous. La transmission des déclarations sociales pour le compte
            d&apos;un tiers repose sur un mandat écrit, signé à
            l&apos;ouverture de votre dossier et consultable en permanence dans
            votre espace employeur. Tout est expliqué sur la page dédiée au{" "}
            <a
              href="/mandat-tiers-declarant"
              className="font-semibold text-emerald-deep underline"
            >
              mandat de tiers déclarant
            </a>
            .
          </p>

          <div className="mt-8 rounded-2xl bg-emerald-tint p-6">
            <p className="font-semibold text-navy">
              Une question sur une situation précise ?
            </p>
            <p className="mt-1 text-sm">
              Décrivez-la nous : si elle relève de notre périmètre, nous vous
              répondons ; sinon, nous vous orientons vers le bon professionnel.
            </p>
            <a
              href="/#contact"
              className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-deep"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
