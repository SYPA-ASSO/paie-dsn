import type { ContenuArticle } from "./blog-contenu";

export const articles2024: ContenuArticle[] = [
  {
    slug: "combien-coute-externalisation-paie",
    titre: "Combien coûte l'externalisation de la paie ? Prix réels et pièges à éviter",
    description:
      "Prix au bulletin, forfaits, frais cachés des logiciels : ce que coûte vraiment l'externalisation de la paie pour une TPE ou une association, et comment comparer les offres.",
    categorie: "Externalisation",
    date: "2024-10-15",
    dateAffichee: "15 octobre 2024",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Le prix est la première question que pose un employeur qui envisage de déléguer sa paie, et c'est aussi celle qui reçoit les réponses les plus floues. Entre le prix au bulletin, les forfaits mensuels, les frais d'entrée et les options facturées à part, comparer deux offres relève parfois du décryptage.",
      "Voici les ordres de grandeur du marché, ce qu'ils recouvrent réellement, et la méthode pour comparer ce qui est comparable.",
    ],
    sections: [
      {
        id: "prix-du-marche",
        titre: "Les prix du marché : de 15 à 40 euros par bulletin",
        paragraphes: [
          "Le marché français de la paie externalisée s'étage schématiquement ainsi : les cabinets d'expertise comptable facturent le plus souvent entre 20 et 40 euros par bulletin, la paie étant chez eux une prestation accessoire de la mission comptable. Les gestionnaires de paie indépendants et les cabinets spécialisés se situent généralement entre 15 et 30 euros. Les plateformes en ligne affichent des prix d'appel plus bas, mais l'employeur y réalise lui-même une partie du travail.",
          "Ce prix au bulletin couvre normalement le cycle complet : collecte des variables, calcul, édition, [déclaration DSN](/notre-perimetre) et documents de fin d'année. Notre grille, consultable en toute transparence, part de 15,50 euros le bulletin avec une dégressivité selon le volume : le détail est sur la [page tarifs](/#tarifs).",
        ],
      },
      {
        id: "couts-caches",
        titre: "Les coûts cachés qui faussent la comparaison",
        paragraphes: [
          "Le premier coût caché est votre propre temps. Un logiciel de paie à 10 euros par mois n'inclut ni la veille conventionnelle, ni le paramétrage des évolutions légales, ni la correction des anomalies DSN : ces heures-là sont à vous, et elles valent souvent plus que la différence de prix avec une externalisation complète.",
          "Viennent ensuite les suppléments : entrées et sorties de salariés, attestations, documents de fin de contrat, mises à jour conventionnelles, assistance téléphonique. Certaines offres les facturent à l'acte, d'autres les incluent. La bonne question à poser à tout prestataire : que se passe-t-il, et à quel prix, le mois où un salarié entre, sort, tombe malade ou prend des congés sans solde ?",
        ],
      },
      {
        id: "erreur-la-plus-chere",
        titre: "Le vrai comparatif : le prix de l'erreur",
        paragraphes: [
          "Une erreur de cotisations découverte lors d'un contrôle Urssaf se paie avec majorations de retard sur trois années. Un minimum conventionnel non appliqué se régularise sur trois ans de rappels de salaire aux prud'hommes. Une DSN erronée peut priver un salarié de ses indemnités journalières et engager votre responsabilité.",
          "Rapportée à ces risques, la différence entre une solution à 10 euros et une prestation professionnelle à 20 euros par bulletin n'est pas une économie : c'est une franchise d'assurance que vous choisissez de porter vous-même. C'est le sens de notre analyse [externaliser plutôt que s'équiper](/#service).",
        ],
      },
    ],
    faq: [
      {
        question: "Le prix au bulletin inclut-il la DSN ?",
        reponse:
          "Chez un prestataire sérieux, oui : la DSN mensuelle est indissociable de la paie, et son coût est compris dans le prix du bulletin. Méfiez-vous des offres qui la facturent séparément, le total réel devient vite supérieur aux prix affichés.",
      },
      {
        question: "Y a-t-il des frais d'entrée à l'externalisation ?",
        reponse:
          "La reprise d'un dossier existant (paramétrage, historiques, cumuls) représente un travail réel que certains prestataires facturent en frais de dossier. D'autres l'intègrent. Demandez un chiffrage écrit incluant la reprise avant de comparer.",
      },
      {
        question: "Un abonnement mensuel est-il plus intéressant qu'un prix au bulletin ?",
        reponse:
          "Tout dépend de la stabilité de votre effectif. Le prix au bulletin colle à votre activité réelle, le forfait lisse le budget. Pour un effectif variable ou saisonnier, le prix au bulletin est presque toujours plus juste.",
      },
    ],
    cta: "Vous voulez un chiffre précis plutôt qu'une fourchette ? Le devis est gratuit et détaillé ligne à ligne.",
  },
  {
    slug: "smic-1er-novembre-2024-revalorisation-anticipee",
    titre: "SMIC au 1er novembre 2024 : la revalorisation anticipée et ses effets en paie",
    description:
      "Le SMIC est passé à 11,88 euros brut de l'heure le 1er novembre 2024, par anticipation de la revalorisation de janvier. Effets sur les salaires, les exonérations et les minima conventionnels.",
    categorie: "Paie",
    date: "2024-11-05",
    dateAffichee: "5 novembre 2024",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 4,
    intro: [
      "Fait rare, le SMIC a été revalorisé un 1er novembre : l'arrêté du 23 octobre 2024 a porté le taux horaire brut de 11,65 à 11,88 euros, soit 1 801,80 euros par mois pour 35 heures, par anticipation de la revalorisation qui serait normalement intervenue au 1er janvier 2025. Conséquence directe : aucune hausse au 1er janvier 2025, le taux de 11,88 euros restant applicable toute l'année 2025.",
      "Mise à jour : depuis, le SMIC a été porté à 12,02 euros au 1er janvier 2026 puis, sous l'effet de l'inflation, à 12,31 euros au 1er juin 2026 (1 867,02 euros par mois). Les mécanismes décrits ci-dessous restent identiques à chaque revalorisation.",
    ],
    sections: [
      {
        id: "qui-est-concerne",
        titre: "Qui est concerné par une hausse du SMIC",
        paragraphes: [
          "Tous les salariés rémunérés au SMIC voient leur salaire relevé automatiquement à la date d'effet, sans avenant au contrat. Mais l'effet va bien au-delà : les salariés dont le salaire, fixé au-dessus de l'ancien SMIC, se retrouve rattrapé par le nouveau doivent également être réalignés, le contrat de travail ne pouvant jamais stipuler moins que le minimum légal.",
          "Attention au piège des minima conventionnels : quand le SMIC dépasse les premiers niveaux de la grille de votre [convention collective](/conventions-collectives), c'est le SMIC qui s'applique, dans l'attente de la renégociation de branche. Un bulletin établi sur la seule grille conventionnelle devient alors illégal.",
        ],
      },
      {
        id: "effets-en-cascade",
        titre: "Les effets en cascade sur la paie",
        paragraphes: [
          "Le SMIC sert d'assiette à de nombreux dispositifs : la réduction générale de cotisations patronales se calcule sur les salaires jusqu'à 1,6 SMIC, la rémunération des apprentis et des contrats de professionnalisation s'exprime en pourcentage du SMIC, et plusieurs seuils d'exonération y sont indexés. Chaque revalorisation modifie donc silencieusement des dizaines de paramètres de paie.",
          "C'est typiquement le mois où un logiciel mal paramétré produit des bulletins faux sans que personne ne s'en aperçoive. Notre service intègre ces revalorisations automatiquement, [la veille est incluse](/notre-perimetre) dans la prestation.",
        ],
      },
    ],
    faq: [
      {
        question: "Une hausse du SMIC oblige-t-elle à augmenter tous les salaires ?",
        reponse:
          "Non. Seuls les salaires devenus inférieurs au nouveau SMIC doivent être relevés. Les autres ne bougent que si un accord ou la grille conventionnelle le prévoit. Le tassement des bas de grille est en revanche un vrai sujet de gestion RH.",
      },
      {
        question: "Le SMIC hôtelier ou avec avantage en nature se calcule-t-il autrement ?",
        reponse:
          "Les avantages en nature (nourriture, logement) entrent dans l'assiette de vérification du SMIC pour leur valeur forfaitaire. Un salarié nourri peut donc percevoir un salaire en espèces inférieur au SMIC affiché, la somme des deux devant atteindre le minimum.",
      },
      {
        question: "Que risque un employeur qui paie sous le SMIC ?",
        reponse:
          "Un rappel de salaire sur trois ans, des dommages et intérêts, et une amende pénale prévue pour chaque salarié concerné. La bonne foi ne protège pas : un oubli de revalorisation est déjà une infraction.",
      },
    ],
    cta: "Vos bulletins suivent-ils automatiquement chaque revalorisation ? Confiez la question à un professionnel.",
  },
  {
    slug: "solde-de-tout-compte-contenu-delais",
    titre: "Solde de tout compte : contenu, délais, signature et contestation",
    description:
      "Documents de fin de contrat, sommes à verser, effet libératoire de la signature, délais de contestation de 6 mois et 3 ans : le solde de tout compte expliqué aux employeurs.",
    categorie: "RH",
    date: "2024-12-10",
    dateAffichee: "10 décembre 2024",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Chaque départ de salarié, quelle qu'en soit la cause, déclenche la même mécanique : calculer les sommes dues, établir le reçu pour solde de tout compte et remettre les documents obligatoires. C'est l'un des moments les plus contentieux de la vie du contrat, et l'un de ceux où une erreur de paie se paie le plus cher.",
      "Voici ce que doit contenir un solde de tout compte irréprochable, et ce que la signature du salarié change réellement.",
    ],
    sections: [
      {
        id: "sommes-a-verser",
        titre: "Les sommes à verser au départ",
        paragraphes: [
          "Le dernier bulletin regroupe le salaire du mois en cours jusqu'au dernier jour travaillé, l'indemnité compensatrice de congés payés pour les congés acquis non pris, l'éventuelle indemnité compensatrice de préavis, et les indemnités de rupture propres au mode de départ : indemnité de licenciement, indemnité de rupture conventionnelle, ou indemnité de fin de contrat de 10 % pour un CDD.",
          "S'y ajoutent les éléments variables souvent oubliés : prorata de treizième mois si la convention le prévoit, primes acquises, contrepartie d'une clause de non-concurrence si elle n'est pas levée dans les formes. Chacune de ces sommes a son propre régime social et fiscal, ce qui fait du bulletin de départ le plus technique de tous.",
        ],
      },
      {
        id: "documents-obligatoires",
        titre: "Les quatre documents obligatoires",
        paragraphes: [
          "L'employeur doit remettre le reçu pour solde de tout compte (en double exemplaire), le certificat de travail, l'attestation destinée à France Travail, désormais transmise par la DSN de fin de contrat, et l'état récapitulatif de l'épargne salariale s'il y a lieu. Ces documents sont quérables : ils doivent être tenus à disposition, leur non-remise expose à des dommages et intérêts.",
          "L'attestation France Travail mérite une vigilance particulière : transmise par un signalement DSN dans les délais, elle conditionne l'ouverture des droits au chômage du salarié. Un signalement erroné ou tardif est une source classique de mise en cause de l'employeur.",
        ],
      },
      {
        id: "effet-de-la-signature",
        titre: "Ce que la signature change : 6 mois ou 3 ans",
        paragraphes: [
          "Le reçu signé sans réserve a un effet libératoire : le salarié dispose de 6 mois pour contester les sommes qui y sont expressément mentionnées. Passé ce délai, il ne peut plus les réclamer. Mais l'effet est strictement limité à ce qui figure sur le reçu : une prime absente du document reste réclamable pendant 3 ans, délai de droit commun des salaires.",
          "Le salarié peut refuser de signer, ou signer avec réserve : le reçu perd alors son effet libératoire, sans que cela bloque le paiement, qui reste dû. D'où l'importance d'un reçu exhaustif, détaillant chaque somme ligne à ligne plutôt qu'un montant global.",
        ],
      },
    ],
    faq: [
      {
        question: "Quand le solde de tout compte doit-il être payé ?",
        reponse:
          "Les sommes sont exigibles à la date de fin du contrat, en pratique à la remise du dernier bulletin. Un paiement différé sans accord expose à des intérêts de retard et à des dommages et intérêts en cas de préjudice.",
      },
      {
        question: "Le salarié doit-il obligatoirement signer le reçu ?",
        reponse:
          "Non, la signature n'est pas obligatoire et son refus ne prive le salarié d'aucun droit. Elle ne fait courir le délai de contestation raccourci de 6 mois que si elle est donnée sans réserve.",
      },
      {
        question: "Une erreur dans le solde de tout compte peut-elle être corrigée après ?",
        reponse:
          "Oui, dans les deux sens : l'employeur peut réclamer un trop-versé (dans la limite de la prescription) et le salarié un manque, dans les délais de 6 mois ou 3 ans selon que la somme figurait ou non sur le reçu signé.",
      },
    ],
    cta: "Un départ à gérer ? Nous établissons le dernier bulletin, le reçu et les signalements DSN dans les règles.",
  },
];
