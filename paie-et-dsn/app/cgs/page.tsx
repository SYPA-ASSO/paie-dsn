import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions générales de service (espace client)",
  alternates: { canonical: "https://paie-et-dsn.fr/cgs" },
  robots: { index: false, follow: true },
};

const articles = [
  {
    titre: "Article 1 · Objet et entrée en vigueur",
    contenu: [
      "Les présentes conditions générales de service (CGS) régissent l'utilisation de l'espace client de paie-et-dsn.fr par les employeurs clients du cabinet et par leurs salariés. Elles complètent les conditions générales de vente (CGV) et entrent en vigueur, pour chaque utilisateur, à l'ouverture de son accès à l'espace client.",
    ],
  },
  {
    titre: "Article 2 · Comptes et sécurité des accès",
    contenu: [
      "Chaque utilisateur dispose d'un compte personnel, avec des droits distincts selon son profil : le compte employeur accède à l'ensemble du dossier de son organisation ; le compte salarié accède exclusivement à ses propres bulletins et documents. Les identifiants sont strictement personnels ; l'utilisateur est responsable de leur garde et informe sans délai le cabinet de toute utilisation non autorisée. Une authentification à deux facteurs est proposée et peut être rendue obligatoire pour les comptes employeurs.",
      "Les accès aux documents sont journalisés (utilisateur, action, date) à des fins de sécurité et de preuve de la mise à disposition des documents.",
    ],
  },
  {
    titre: "Article 3 · Espace employeur",
    contenu: [
      "L'espace employeur permet notamment : la saisie ou l'import (Excel ou CSV) des fiches de variables mensuelles pour un nombre illimité de salariés, le dépôt de justificatifs, le suivi du statut de chaque fiche et de chaque DSN, le téléchargement des bulletins et de l'archive mensuelle du dossier (bulletins, journal de paie, état des charges, comptes rendus DSN), la consultation et le téléchargement des factures du cabinet dans un emplacement dédié, la consultation permanente du mandat de tiers déclarant, et la déclaration des entrées, sorties et arrêts de travail.",
      "L'employeur garantit l'exactitude des informations saisies et le respect du calendrier de transmission prévu aux CGV.",
    ],
  },
  {
    titre: "Article 4 · Espace salarié et portée de la mise à disposition",
    contenu: [
      "L'espace salarié constitue un canal de mise à disposition des bulletins de paie. Il ne constitue pas un service d'archivage légal au sens des articles D. 3243-7 et suivants du Code du travail : la conservation des bulletins pendant les durées légales incombe à l'employeur, et chaque salarié est invité à télécharger et conserver ses documents. Le salarié conserve la faculté de s'opposer à la remise électronique de son bulletin auprès de son employeur, qui organise alors une remise sous une autre forme.",
      "En cas de départ du salarié, son accès est maintenu pendant une durée de 12 mois pour lui permettre de récupérer ses documents, puis clôturé.",
    ],
  },
  {
    titre: "Article 5 · Disponibilité du service et des documents",
    contenu: [
      "Le cabinet s'efforce d'assurer une disponibilité continue de l'espace client, sans garantie de disponibilité ininterrompue ; des interruptions pour maintenance peuvent survenir. Les documents demeurent accessibles en ligne pendant une durée de 24 mois glissants ; au-delà, ils sont restituables sur demande pendant la durée du contrat. La fin du contrat entraîne la restitution du dossier dans les conditions de réversibilité prévues aux CGV.",
    ],
  },
  {
    titre: "Article 6 · Usage loyal",
    contenu: [
      "L'utilisateur s'interdit tout usage de l'espace client de nature à porter atteinte à sa sécurité ou à son intégrité, toute tentative d'accès à des données qui ne le concernent pas et tout dépôt de contenu illicite. Le cabinet peut suspendre un accès en cas de manquement grave, après information de l'utilisateur.",
    ],
  },
  {
    titre: "Article 7 · Données personnelles et sous-traitance (RGPD)",
    contenu: [
      "Pour les données des salariés traitées dans l'espace client, l'employeur est responsable de traitement et le cabinet sous-traitant au sens de l'article 28 du RGPD. Le cabinet traite ces données sur instruction documentée de l'employeur, aux seules fins d'exécution des prestations de paie et de déclarations sociales, met en œuvre des mesures de sécurité appropriées (chiffrement des flux, contrôle des accès par rôle, journalisation, authentification renforcée), assiste l'employeur dans le respect des droits des personnes et lui notifie sans délai indu toute violation de données.",
      "Sous-traitants ultérieurs autorisés : hébergement et diffusion (Vercel Inc.), base de données et authentification (Supabase), envoi d'e-mails transactionnels (Brevo). Le cabinet informe l'employeur de tout changement de sous-traitant ultérieur. Les données sont hébergées dans l'Union européenne ; en fin de contrat, elles sont restituées à l'employeur puis supprimées, sous réserve des obligations légales de conservation.",
      "Le détail des engagements figure dans l'accord de sous-traitance annexé au contrat, remis avec le devis.",
    ],
  },
  {
    titre: "Article 8 · Évolution des CGS",
    contenu: [
      "Le cabinet peut faire évoluer les présentes CGS, notamment pour accompagner les évolutions fonctionnelles de l'espace client. Les utilisateurs sont informés de toute modification substantielle au moins un mois avant son entrée en vigueur ; l'employeur peut alors résilier le contrat dans les conditions prévues aux CGV.",
    ],
  },
];

export default function Cgs() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold">
          Conditions générales de service de l&apos;espace client
        </h1>
        <p className="mt-4 text-sm text-ink/70">
          Version du 2 juillet 2026. Applicables à compter de l&apos;ouverture
          de l&apos;espace client.
        </p>
        <div className="mt-8 space-y-8">
          {articles.map((article) => (
            <section key={article.titre}>
              <h2 className="text-xl font-bold">{article.titre}</h2>
              {article.contenu.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)} className="mt-2 leading-relaxed">
                  {paragraphe}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
