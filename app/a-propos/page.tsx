import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Le cabinet et ses autres solutions pour employeurs",
  description:
    "paie-et-dsn.fr est un service du Cabinet Cholez-Pagotto, juriste formaliste membre du CRFF à Épinal. Découvrez le cabinet et ses autres solutions pour employeurs : veille sociale, assurances collectives et professionnelles.",
  alternates: { canonical: "https://paie-et-dsn.fr/a-propos" },
};

const assurances = [
  {
    titre: "Santé et prévoyance collectives",
    texte:
      "La complémentaire santé de vos salariés est une obligation, la prévoyance l'est souvent aussi selon votre convention collective. Nous comparons les contrats et vérifions leur conformité à vos obligations conventionnelles.",
  },
  {
    titre: "Responsabilité civile professionnelle et exploitation",
    texte:
      "La RC pro couvre les dommages causés dans l'exercice de votre activité, la RC exploitation ceux de la vie courante de l'entreprise. Deux protections distinctes, souvent confondues, toutes deux essentielles.",
  },
  {
    titre: "Flotte automobile",
    texte:
      "Dès plusieurs véhicules, le contrat flotte simplifie la gestion et optimise les cotisations : un seul contrat, une seule échéance, des garanties homogènes pour vos véhicules d'entreprise.",
  },
  {
    titre: "Multirisque professionnelle et locaux",
    texte:
      "Locaux, matériel, marchandises, pertes d'exploitation : la multirisque protège l'outil de travail. Indispensable dès que vous avez des locaux ou du matériel dont dépend votre activité.",
  },
  {
    titre: "Protection juridique",
    texte:
      "Litige avec un client, un fournisseur, un salarié : la protection juridique prend en charge l'information juridique, la défense amiable et les frais de procédure. Un complément naturel de la gestion sociale.",
  },
  {
    titre: "Garanties du dirigeant",
    texte:
      "Prévoyance du dirigeant, assurance homme-clé, responsabilité des mandataires sociaux, garantie perte d'emploi du dirigeant : parce que la protection de l'entreprise commence par celle de celui qui la dirige.",
  },
  {
    titre: "Retraite supplémentaire (PER entreprise)",
    texte:
      "Le plan d'épargne retraite d'entreprise fidélise vos salariés et optimise la rémunération globale, avec un cadre social et fiscal avantageux pour l'employeur comme pour les bénéficiaires.",
  },
  {
    titre: "Cyber-assurance",
    texte:
      "Vos données de paie et de gestion sont une cible. La cyber-assurance couvre les conséquences d'une attaque : gestion de crise, restauration des données, pertes d'exploitation et responsabilité.",
  },
];

export default function APropos() {
  return (
    <>
      <Header />
      <main>
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
              Le cabinet
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Derrière paie-et-dsn.fr, un cabinet juridique de terrain
            </h1>
            <div className="mt-8 space-y-6 leading-relaxed">
              <p>
                paie-et-dsn.fr est le service de paie externalisée du{" "}
                <a
                  href="https://cholez-pagotto.fr"
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-emerald-deep underline"
                >
                  Cabinet Cholez-Pagotto
                </a>
                , fondé et animé par François Cholez, juriste et formaliste,
                membre du Conseil Représentatif des Formalistes de France
                (CRFF), installé à Épinal et travaillant avec des employeurs de
                toute la France.
              </p>
              <p>
                Le cabinet accompagne au quotidien des créateurs
                d&apos;entreprise, des TPE, des associations et des
                particuliers dans leurs formalités juridiques, leur conformité
                RGPD et leur information juridique. La paie s&apos;inscrit dans
                cette même conviction : les obligations administratives ne
                devraient jamais empêcher quelqu&apos;un de faire son métier.
                Nous les prenons en charge avec la rigueur du juriste et la
                réactivité d&apos;un interlocuteur unique qui connaît votre
                dossier.
              </p>
              <p>
                Notre façon de travailler tient en trois principes : la
                transparence (notre{" "}
                <a
                  href="/notre-perimetre"
                  className="font-semibold text-emerald-deep underline"
                >
                  périmètre d&apos;intervention
                </a>{" "}
                est public, nos tarifs s&apos;estiment en ligne), la conformité
                (chaque bulletin suit votre convention collective, chaque DSN
                est contrôlée avant transmission), et la réversibilité (votre
                dossier vous appartient, vous repartez quand vous voulez, avec
                tout).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Nos autres solutions pour les employeurs
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed">
              La paie révèle souvent d&apos;autres besoins. Le cabinet y répond
              par deux voies : une option d&apos;abonnement à la{" "}
              <a
                href="/veille-sociale-rh"
                className="font-semibold text-emerald-deep underline"
              >
                veille sociale et RH
              </a>
              , pour comprendre ce qui change et décider en connaissance de
              cause ; et le conseil en assurances de l&apos;employeur, exercé
              en qualité de courtier immatriculé à l&apos;ORIAS
              (n°&nbsp;26003943), sous le contrôle de l&apos;ACPR.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {assurances.map((a) => (
                <article
                  key={a.titre}
                  className="rounded-2xl border border-line bg-ivory p-6"
                >
                  <h3 className="text-lg font-bold">{a.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{a.texte}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm leading-relaxed text-ink/80">
              Ces solutions sont proposées en option de votre forfait de paie
              ou indépendamment, toujours sur devis. Pour le bâtiment, nous
              accompagnons également la souscription de la garantie décennale.
              Les formalités juridiques, la conformité RGPD, le DPO externalisé
              et les formations du cabinet restent accessibles sur{" "}
              <a
                href="https://cholez-pagotto.fr"
                target="_blank"
                rel="noopener"
                className="font-semibold text-emerald-deep underline"
              >
                cholez-pagotto.fr
              </a>
              .
            </p>
            <div className="mt-10 rounded-2xl bg-navy p-8 text-center">
              <p className="text-xl font-bold text-white">
                Un seul interlocuteur pour votre paie et vos protections
              </p>
              <a
                href="/#contact"
                className="mt-5 inline-block rounded-full bg-emerald-brand px-6 py-3 font-semibold text-white transition hover:bg-emerald-deep"
              >
                Demander un devis global
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
