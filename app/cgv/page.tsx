import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  alternates: { canonical: "https://paie-et-dsn.fr/cgv" },
  robots: { index: false, follow: true },
};

const articles = [
  {
    titre: "Article 1 · Prestataire et champ d'application",
    contenu: [
      "Les présentes conditions générales de vente (CGV) régissent les prestations de gestion externalisée de la paie et des déclarations sociales proposées par le Cabinet Cholez-Pagotto, entreprise individuelle de François Cholez, juriste formaliste, SIREN 490 889 516, Épinal (ci-après « le cabinet »), au bénéfice de tout client professionnel ou particulier employeur (ci-après « le client »).",
      "Toute commande implique l'acceptation sans réserve des présentes CGV et, pour l'utilisation de l'espace client, des conditions générales de service (CGS).",
    ],
  },
  {
    titre: "Article 2 · Objet et périmètre des prestations",
    contenu: [
      "Le cabinet réalise, sur la base des éléments transmis par le client : l'établissement des bulletins de paie conformément à la convention collective applicable, la production et la transmission des déclarations sociales nominatives (DSN) mensuelles et événementielles en qualité de tiers déclarant mandaté, les formalités d'entrée des salariés (DPAE, déclaration préalable à l'embauche, et affiliations), les documents de sortie (reçu pour solde de tout compte, certificat de travail, attestation France Travail, DSN de fin de contrat), le journal de paie, l'état des charges et les éléments de données destinés à l'expert-comptable du client.",
      "Sont expressément exclus du périmètre : tous travaux comptables au sens des articles 2 et 20 de l'ordonnance n° 45-2138 du 19 septembre 1945 (le cabinet remet les données de paie au client ou à son expert-comptable mais ne passe aucune écriture dans la comptabilité du client et n'établit aucune déclaration fiscale) ; toute consultation juridique détachée de la production de la paie au sens de la loi n° 71-1130 du 31 décembre 1971. Le cabinet répond aux questions relevant directement de l'exécution de la prestation de paie et oriente le client vers un avocat pour toute autre question juridique.",
    ],
  },
  {
    titre: "Article 3 · Devis, conclusion et durée du contrat",
    contenu: [
      "Toute prestation fait l'objet d'un devis écrit, gratuit et sans engagement, valable 30 jours. La commande s'effectue par la validation écrite du devis par le client, qui emporte conclusion du contrat et acceptation des présentes CGV. Le contrat est conclu pour une durée indéterminée et peut être résilié par chacune des parties par écrit, moyennant un préavis d'un mois expirant à la fin d'un mois civil, sans frais de sortie.",
      "Le simulateur disponible sur le site fournit des estimations indicatives qui n'engagent pas le cabinet ; seul le devis fait foi.",
    ],
  },
  {
    titre: "Article 4 · Prix",
    contenu: [
      "Les prestations récurrentes sont facturées sous forme d'un forfait mensuel fixé au devis en fonction du nombre de bulletins, de la convention collective applicable et des particularités du dossier. Les actes ponctuels (entrée de salarié, sortie et solde de tout compte, régularisations) sont facturés aux tarifs figurant au devis.",
      "Une ouverture de dossier, couvrant la création du compte, le paramétrage de la convention collective et, s'il y a lieu, la reprise de l'historique de bulletins et de DSN, est facturée une seule fois à la conclusion du contrat, au montant fixé au devis.",
      "TVA non applicable, article 293 B du Code général des impôts. Les prix peuvent être révisés annuellement moyennant une information écrite du client au moins deux mois avant leur entrée en vigueur ; le client peut alors résilier sans préavis jusqu'à cette date.",
      "Les abonnements de veille sociale et RH peuvent être souscrits en ligne avec paiement mensuel par carte bancaire (encaissement sécurisé Stripe, résiliable chaque mois depuis le lien figurant dans les reçus) ou par virement à réception de facture mensuelle. Les prestations sont facturées mensuellement. Chaque facture est adressée au client et mise à sa disposition dans un emplacement dédié de son espace client ; elle est payable par virement bancaire à réception. Tout retard de paiement entraîne, pour les clients professionnels, l'application de pénalités de retard au taux d'intérêt légal majoré de 10 points et de l'indemnité forfaitaire de recouvrement de 40 € (articles L. 441-10 et D. 441-5 du Code de commerce). En cas de défaut de paiement persistant après mise en demeure, le cabinet peut suspendre les prestations, la responsabilité des déclarations non transmises pendant la suspension incombant au client.",
    ],
  },
  {
    titre: "Article 5 · Obligations du client et calendrier",
    contenu: [
      "Le client garantit l'exactitude, l'exhaustivité et la transmission dans les délais des éléments nécessaires à la paie. Sauf calendrier particulier fixé au devis, les variables du mois sont transmises au plus tard le 27 du mois. Toute transmission tardive décale d'autant la mise à disposition des bulletins, sans que la responsabilité du cabinet puisse être engagée.",
      "Le client demeure seul titulaire de ses obligations légales d'employeur ; le cabinet agit en qualité de prestataire sur la base des informations fournies.",
    ],
  },
  {
    titre: "Article 6 · Mise à disposition, validation et transmission des DSN",
    contenu: [
      "Les bulletins sont mis à la disposition du client dans un délai de 3 jours ouvrés suivant la réception complète des variables. Le client dispose d'un délai de 48 heures à compter de la mise à disposition pour formuler des observations. À défaut d'observation dans ce délai, les bulletins sont réputés validés et la DSN est transmise aux organismes à l'échéance légale.",
      "Par exception, une validation expresse du client est requise dans trois cas : le premier mois d'un nouveau dossier, les soldes de tout compte et DSN de fin de contrat, et les régularisations rétroactives. L'attention du client est attirée sur le fait que le reçu pour solde de tout compte peut être dénoncé par le salarié dans les six mois suivant sa signature (article L. 1234-20 du Code du travail).",
      "Afin d'éviter au client des pénalités de retard, le cabinet est autorisé à transmettre la DSN à l'échéance légale même en l'absence de retour du client, sur la base des derniers éléments validés ou réputés validés. Les DSN événementielles sont transmises dans les délais réglementaires dès notification de l'événement par le client.",
    ],
  },
  {
    titre: "Article 7 · Mandat de tiers déclarant",
    contenu: [
      "Le client donne mandat au cabinet, par acte séparé signé à l'ouverture du dossier, de transmettre pour son compte ses déclarations sociales aux organismes via net-entreprises. Ce mandat est révocable à tout moment par écrit et demeure consultable en permanence par le client dans son espace employeur.",
    ],
  },
  {
    titre: "Article 8 · Responsabilité et assurance",
    contenu: [
      "Le cabinet est tenu d'une obligation de moyens. Sa responsabilité ne peut être engagée à raison d'erreurs résultant d'éléments inexacts, incomplets ou tardifs transmis par le client, ni des conséquences de choix de gestion du client.",
      "Pour les clients professionnels, la responsabilité du cabinet est plafonnée, tous préjudices confondus, au montant des honoraires perçus au titre des douze derniers mois du dossier concerné. Ce plafond n'est pas applicable aux clients consommateurs ni en cas de faute lourde ou dolosive.",
      "Le cabinet est assuré en responsabilité civile professionnelle pour les prestations objet des présentes ; une attestation est communiquée au client sur simple demande.",
    ],
  },
  {
    titre: "Article 9 · Conservation et archivage des documents",
    contenu: [
      "Les documents produits sont mis à la disposition du client (et, pour ses bulletins, de chaque salarié) sous forme électronique. Cette mise à disposition ne constitue pas un archivage légal : la conservation des bulletins et documents sociaux pendant les durées légales incombe au client employeur. Une option de dépôt dans un coffre-fort numérique certifié, assurant les garanties prévues par les articles D. 3243-7 et suivants du Code du travail, peut être souscrite au devis.",
    ],
  },
  {
    titre: "Article 10 · Données personnelles",
    contenu: [
      "Pour les données des salariés du client, le cabinet agit en qualité de sous-traitant au sens de l'article 28 du RGPD, dans les conditions de l'accord de sous-traitance annexé aux CGS. Le client demeure responsable de traitement. Pour le surplus, il est renvoyé à la politique de confidentialité du site.",
    ],
  },
  {
    titre: "Article 11 · Réversibilité",
    contenu: [
      "En fin de contrat, quelle qu'en soit la cause, le cabinet restitue au client l'intégralité de son dossier (bulletins, journaux de paie, paramètres, historique DSN) dans un format exploitable, sans frais. Aucune clause ne fait obstacle à la reprise de la paie en interne ou par un autre prestataire.",
    ],
  },
  {
    titre: "Article 12 · Droit de rétractation des consommateurs",
    contenu: [
      "Le client consommateur (notamment particulier employeur) qui conclut le contrat à distance dispose en principe d'un délai de rétractation de 14 jours à compter de la conclusion du contrat (article L. 221-18 du Code de la consommation). Pour les abonnements de veille sociale et RH, qui portent sur la fourniture d'un contenu numérique sans support matériel (espace documentaire, modèles, newsletters, alertes), la souscription en ligne comporte la demande expresse d'exécution immédiate et la reconnaissance de la perte corrélative du droit de rétractation (article L. 221-28, 13°) ; cet accord est confirmé sur support durable dans l'e-mail de confirmation. À défaut d'un tel accord valablement exprimé, le client conserve son droit de rétractation ; s'il a demandé l'exécution avant l'expiration du délai, il reste redevable du prix du service fourni jusqu'à sa rétractation, calculé au prorata (article L. 221-25). Toute déclaration de rétractation s'effectue en ligne via la fonctionnalité « Renoncer au contrat ici », accessible depuis le pied de page du site à l'adresse paie-et-dsn.fr/renoncer-au-contrat (déclaration, confirmation, puis accusé de réception horodaté adressé sans délai par e-mail), ou par le formulaire de contact du site ou par courrier. La résiliation d'un abonnement mensuel s'exerce quant à elle à tout moment, par les mêmes moyens, avec effet au terme de la période en cours. S'il demande l'exécution de la prestation avant l'expiration de ce délai, il reste redevable du prix correspondant au service fourni jusqu'à sa rétractation ; s'il demande l'exécution complète avant ce terme, il renonce expressément à son droit de rétractation.",
    ],
  },
  {
    titre: "Article 13 · Médiation et litiges",
    contenu: [
      "Réclamations : via le formulaire de contact du site, réponse sous 30 jours. À défaut de résolution amiable, tout client consommateur peut recourir gratuitement au médiateur de la consommation désigné par le cabinet : Centre de Médiation de la Consommation de Conciliateurs de Justice (CM2C), www.cm2c.net, ou à la plateforme européenne de règlement en ligne des litiges (https://ec.europa.eu/consumers/odr).",
      "Les présentes CGV sont soumises au droit français. Pour les clients professionnels, tout litige relève des juridictions dans le ressort desquelles est situé le siège du cabinet. Les clients consommateurs peuvent saisir la juridiction de leur choix parmi celles territorialement compétentes.",
    ],
  },
];

export default function Cgv() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold">Conditions générales de vente</h1>
        <p className="mt-4 text-sm text-ink/70">
          Version du 2 juillet 2026. Applicables à toute prestation conclue à
          compter de cette date.
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
