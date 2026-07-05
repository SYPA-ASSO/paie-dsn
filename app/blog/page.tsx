import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Qui peut établir vos bulletins de paie ? Ce que dit vraiment le droit",
  description:
    "Expert-comptable, gestionnaire de paie indépendant, logiciel : qui a le droit d'établir vos bulletins et de transmettre vos DSN ? Le point juridique complet, sources à l'appui.",
  alternates: {
    canonical:
      "https://paie-et-dsn.fr/blog/qui-peut-etablir-vos-bulletins-de-paie",
  },
};

export default function ArticleQuiPeutEtablir() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Qui peut établir vos bulletins de paie ? Expert-comptable, gestionnaire indépendant, logiciel : ce que dit le droit",
    datePublished: "2026-07-02",
    dateModified: "2026-07-02",
    author: {
      "@type": "Person",
      name: "François Cholez",
      jobTitle: "Juriste formaliste",
    },
    publisher: {
      "@type": "Organization",
      name: "paie-et-dsn.fr · Cabinet Cholez-Pagotto",
      url: "https://paie-et-dsn.fr",
    },
    mainEntityOfPage:
      "https://paie-et-dsn.fr/blog/qui-peut-etablir-vos-bulletins-de-paie",
  };

  const filAriane = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://paie-et-dsn.fr" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://paie-et-dsn.fr/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Qui peut établir vos bulletins de paie ?",
        item: "https://paie-et-dsn.fr/blog/qui-peut-etablir-vos-bulletins-de-paie",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filAriane) }}
      />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-brand">
          Blog · 2 juillet 2026
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
          Qui peut établir vos bulletins de paie ? Expert-comptable,
          gestionnaire indépendant, logiciel : ce que dit le droit
        </h1>
        <div className="mt-8 space-y-6 leading-relaxed">
          <p>
            Une idée reçue tenace veut que la paie soit une chasse gardée des
            experts-comptables. Elle conduit des employeurs à payer plus cher
            que nécessaire, ou à l&apos;inverse à se méfier de prestataires
            parfaitement légitimes. La réalité juridique mérite d&apos;être
            posée calmement, textes à l&apos;appui.
          </p>

          <h2 className="pt-2 text-2xl font-bold">
            Ce que la loi réserve vraiment aux experts-comptables
          </h2>
          <p>
            L&apos;ordonnance n°&nbsp;45-2138 du 19 septembre 1945 réserve aux
            experts-comptables inscrits à l&apos;Ordre les travaux comptables :
            tenir, centraliser, ouvrir, arrêter, surveiller, redresser et
            consolider les comptabilités des entreprises. Exercer habituellement
            ces travaux sans être inscrit constitue le délit d&apos;exercice
            illégal, que la Cour de cassation sanctionne avec constance, y
            compris face aux montages contournants.
          </p>
          <p>
            Mais le bulletin de paie n&apos;est pas un document comptable :
            c&apos;est un document social, régi par le Code du travail. La
            production de la paie ne figure pas dans la liste des travaux
            réservés. La Cour de cassation a d&apos;ailleurs précisé, dans un
            arrêt de sa chambre commerciale du 17 septembre 2025, que la saisie
            informatique de données dans un logiciel dédié ne relève pas, à
            elle seule, du champ réservé aux experts-comptables. C&apos;est ce
            qui fonde l&apos;existence, parfaitement légale, des gestionnaires
            de paie indépendants et des prestataires spécialisés.
          </p>
          <p>
            La frontière à ne pas franchir est ailleurs : un prestataire de
            paie non inscrit à l&apos;Ordre ne peut ni passer les écritures de
            paie dans la comptabilité de son client, ni établir ses
            déclarations fiscales, ni tenir quoi que ce soit de sa
            comptabilité. Il produit la paie et remet les données ; c&apos;est
            l&apos;expert-comptable du client qui impute. Les deux professions
            sont complémentaires.
          </p>

          <h2 className="pt-2 text-2xl font-bold">
            Et la DSN, qui peut la transmettre ?
          </h2>
          <p>
            La transmission de la déclaration sociale nominative pour le compte
            d&apos;un employeur repose sur le statut de tiers déclarant, prévu
            par le dispositif net-entreprises et ouvert aux prestataires de
            paie comme aux experts-comptables. Une condition de forme
            s&apos;applique : un mandat écrit de l&apos;employeur, le mandat
            implicite étant réservé aux experts-comptables inscrits au tableau.
            Nous avons consacré une page complète au{" "}
            <a
              href="/mandat-tiers-declarant"
              className="font-semibold text-emerald-deep underline"
            >
              mandat de tiers déclarant
            </a>
            .
          </p>

          <h2 className="pt-2 text-2xl font-bold">
            Alors, comment choisir ?
          </h2>
          <p>
            Trois voies s&apos;offrent à l&apos;employeur. Le logiciel de paie
            en self-service est le moins cher à condition d&apos;avoir le temps
            et la compétence : c&apos;est vous qui paramétrez la convention
            collective, suivez les évolutions et corrigez les anomalies.
            L&apos;expert-comptable offre le confort du guichet unique
            comptabilité-paie, à un tarif généralement compris entre 20 et
            35&nbsp;€ par bulletin. Le prestataire de paie spécialisé, enfin,
            combine la production complète, la veille conventionnelle incluse
            et un interlocuteur dédié, souvent à un coût inférieur, la paie
            étant son seul métier.
          </p>
          <p>
            Le bon réflexe, quel que soit le choix : vérifier que le
            prestataire annonce clairement son périmètre (le nôtre est{" "}
            <a
              href="/notre-perimetre"
              className="font-semibold text-emerald-deep underline"
            >
              public
            </a>
            ), qu&apos;il travaille sur mandat écrit pour vos DSN, et
            qu&apos;il garantit la réversibilité de votre dossier. Un
            prestataire sérieux n&apos;a rien à cacher sur ces trois points.
          </p>

          <div className="mt-8 rounded-2xl bg-emerald-tint p-6 text-center">
            <p className="font-semibold text-navy">
              Envie de savoir ce que coûterait votre paie externalisée ?
            </p>
            <a
              href="/#tarifs"
              className="mt-4 inline-block rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-deep"
            >
              Estimer avec le simulateur
            </a>
          </div>

          <p className="text-sm text-ink/70">
            Article d&apos;information générale, rédigé et vérifié par notre
            juriste. Il ne constitue pas une consultation juridique. Sources :
            ordonnance n°&nbsp;45-2138 du 19 septembre 1945 ; loi
            n°&nbsp;71-1130 du 31 décembre 1971 ; Cass. com., 17 septembre
            2025.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
