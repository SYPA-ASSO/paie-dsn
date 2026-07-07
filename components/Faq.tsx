export const faqItems = [
  {
    question: "Que dois-je fournir chaque mois ?",
    reponse:
      "Uniquement les variables du mois : heures travaillées ou supplémentaires, absences, congés, primes, tickets restaurant. Au démarrage du dossier, nous collectons une seule fois les éléments permanents : contrats, convention collective, taux accident du travail, caisses de retraite et de prévoyance.",
  },
  {
    question: "Comment mes bulletins sont-ils validés chaque mois ?",
    reponse:
      "Dès réception complète de vos variables, vos bulletins sont mis à disposition sous trois jours ouvrés dans votre espace client. Vous les relisez : sans observation de votre part sous 48 heures, ils sont réputés validés et la DSN part à l'échéance légale. Ce circuit garantit des déclarations toujours à l'heure ; il suppose une relecture rapide de votre côté, et nous restons joignables pour toute observation.",
  },
  {
    question: "Comment se passe la reprise de mon dossier de paie ?",
    reponse:
      "Nous reprenons votre historique (cumuls de l'année, compteurs de congés, paramétrage conventionnel) à partir de vos derniers bulletins et journaux de paie, quel que soit votre outil ou prestataire actuel. La reprise est chiffrée dans le devis selon une grille simple : forfait d'ouverture de 120\u00a0€ (60\u00a0€ pour un particulier employeur, offert dès 5 salariés pour une bascule au 1er janvier), 12\u00a0€ par salarié repris, et, pour une bascule en cours d'année, 8\u00a0€ par bulletin reconstitué depuis le 1er janvier, la réglementation des cumuls l'imposant. Le simulateur ci-dessus l'estime pour votre situation. Votre premier bulletin chez nous est comparé ligne à ligne au dernier de votre ancien prestataire, tout écart expliqué par écrit.",
  },
  {
    question: "Entrée, sortie, arrêt de travail en cours de mois : comment ça se passe ?",
    reponse:
      "Ces événements font partie du service : DPAE et affiliation pour une embauche, signalement DSN sous 5 jours et calcul des IJSS pour un arrêt (avec subrogation si vous maintenez le salaire), solde de tout compte et documents de fin de contrat pour une sortie. Vous nous signalez l'événement avec vos variables du mois, nous produisons tout le reste.",
  },
  {
    question: "Que se passe-t-il si une DSN est rejetée ou qu'un organisme signale une anomalie ?",
    reponse:
      "Nous lisons chaque mois les retours des organismes (Urssaf, retraite, DGFiP, prévoyance) sur toutes les DSN que nous transmettons, et nous traitons les anomalies avant l'échéance suivante : correction, DSN annule et remplace ou régularisation selon le cas. C'est inclus dans la prestation, sans supplément, et vous êtes informé de toute anomalie significative concernant votre dossier.",
  },
  {
    question: "Toutes les conventions collectives sont-elles couvertes ?",
    reponse:
      "Notre référentiel couvre les 585 conventions collectives de branche en vigueur : bâtiment, hôtellerie-restauration, commerce, bureaux d'études, animation, sport, aide à domicile, particuliers employeurs et toutes les autres. Chaque bulletin est établi selon la convention applicable à votre activité (grilles, primes, prévoyance), et chaque reprise de dossier commence par un cadrage conventionnel qui identifie les particularités et les éventuels cas atypiques. Nous gérons aussi la paie des employeurs sans convention collective (code 9999) : le Code du travail s'applique alors seul.",
  },
  {
    question: "Qui transmet la DSN ?",
    reponse:
      "Nous. La DSN mensuelle est générée, contrôlée puis transmise aux organismes une fois les bulletins réputés validés : après leur mise à disposition, vous disposez de 48 heures pour formuler une observation. Trois cas requièrent votre validation expresse : le premier mois du dossier, les soldes de tout compte et DSN de fin de contrat, et les régularisations rétroactives. Les DSN événementielles (arrêt de travail, fin de contrat) sont transmises dans les délais réglementaires. Vous recevez les comptes rendus de transmission.",
  },
  {
    question: "Que se passe-t-il en cas d'arrêt de travail ou de départ ?",
    reponse:
      "Vous nous prévenez, nous faisons le reste : signalement DSN, attestation, calcul des indemnités et du solde de tout compte, certificat de travail, attestation France Travail. C'est justement dans ces situations qu'un interlocuteur humain fait la différence.",
  },
  {
    question: "Puis-je reprendre ma paie en interne plus tard ?",
    reponse:
      "Oui, à tout moment. Votre dossier vous appartient : bulletins, journaux de paie et paramètres vous sont remis dans un format exploitable. Aucune clause ne vous retient.",
  },
  {
    question: "Mes données sont-elles protégées ?",
    reponse:
      "Oui. Les données de paie sont des données personnelles sensibles : elles sont traitées conformément au RGPD, hébergées dans l'Union européenne et ne servent qu'à la production de votre paie. Le cabinet accompagne par ailleurs ses clients sur la conformité RGPD, c'est un sujet que nous prenons au sérieux pour nous-mêmes.",
  },
  {
    question: "Comment nous autorisez-vous à transmettre vos DSN ?",
    reponse:
      "Par un mandat de tiers déclarant, signé électroniquement lors de l'ouverture de votre dossier. Ce mandat nous autorise à transmettre vos déclarations sociales aux organismes via net-entreprises, pour votre compte et sous votre contrôle. Il reste consultable en permanence dans votre espace employeur et peut être révoqué à tout moment.",
  },
  {
    question: "Donnez-vous des conseils en droit du travail ?",
    reponse:
      "Nous répondons à toutes les questions directement liées à votre paie : traitement d'un arrêt, calcul d'une indemnité, application de votre convention collective. En revanche, le conseil juridique personnalisé détaché de la paie (stratégie de rupture, contentieux prud'homal) relève de la profession d'avocat : dans ces situations, nous vous orientons vers un avocat partenaire.",
  },
  {
    question: "Remplacez-vous mon expert-comptable ?",
    reponse:
      "Non, nous travaillons en complément. Votre expert-comptable conserve la comptabilité et le fiscal ; nous produisons la paie et les déclarations sociales, puis nous lui transmettons chaque mois les éléments nécessaires aux écritures de paie.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-amber-brand">
          FAQ
        </p>
        <h2 className="mt-2 text-center text-3xl font-bold sm:text-4xl">
          Les réponses à vos questions
        </h2>
        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
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
      </div>
    </section>
  );
}
