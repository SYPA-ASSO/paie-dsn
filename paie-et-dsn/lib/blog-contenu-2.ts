import type { ContenuArticle } from "./blog-contenu";

export const articles2025: ContenuArticle[] = [
  {
    slug: "plafond-securite-sociale-2025",
    titre: "Plafond de la sécurité sociale 2025 : 3 925 euros et ses effets concrets en paie",
    description:
      "Le plafond mensuel de la sécurité sociale passe à 3 925 euros au 1er janvier 2025. Tranches de cotisations, gratification des stagiaires, indemnités : ce qui change sur les bulletins.",
    categorie: "Paie",
    date: "2025-01-14",
    dateAffichee: "14 janvier 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 4,
    intro: [
      "L'arrêté du 19 décembre 2024 a fixé le plafond de la sécurité sociale à 3 925 euros par mois pour 2025 (47 100 euros par an), en hausse de 1,6 %. Derrière ce chiffre discret se cachent des effets sur presque toutes les lignes du bulletin.",
      "Mise à jour : au 1er janvier 2026, le plafond a été porté à 4 005 euros par mois, soit 48 060 euros par an (arrêté du 22 décembre 2025). Les mécanismes exposés ici demeurent inchangés.",
    ],
    sections: [
      {
        id: "a-quoi-sert-le-plafond",
        titre: "À quoi sert le plafond de la sécurité sociale",
        paragraphes: [
          "Le plafond découpe le salaire en tranches de cotisations. La retraite de base et la tranche 1 de la retraite complémentaire se calculent sur la part du salaire limitée au plafond ; la tranche 2 court du plafond à huit plafonds. Certaines cotisations, comme la maladie ou les allocations familiales, sont au contraire déplafonnées et suivent tout le salaire.",
          "Il borne aussi des prestations et des exonérations : indemnités journalières, indemnités de rupture exonérées dans certaines limites exprimées en plafonds annuels, assiette forfaitaire de certains régimes. Quand le plafond bouge, tout cela bouge.",
        ],
      },
      {
        id: "effets-pratiques",
        titre: "Trois effets pratiques à vérifier sur vos bulletins",
        paragraphes: [
          "Premier effet : les salariés dont la rémunération se situe autour du plafond voient la répartition de leurs cotisations retraite entre tranches se déplacer, avec un léger impact sur le net. Deuxième effet : la gratification minimale des stagiaires, fixée à 15 % du plafond horaire, est passée à 4,35 euros de l'heure en 2025 (4,50 euros en 2026).",
          "Troisième effet, le plus piégeux : les régularisations progressives. Le plafond s'apprécie sur l'année, avec une régularisation à chaque paie pour les rémunérations variables ; un paramétrage resté sur l'ancien plafond fausse toutes les paies de janvier. C'est l'un des contrôles systématiques de notre [check-list de janvier](/blog/preparer-la-paie-de-janvier-2026).",
        ],
      },
    ],
    faq: [
      {
        question: "Plafond mensuel ou plafond annuel : lequel s'applique ?",
        reponse:
          "Les deux : le calcul s'effectue mois par mois avec le plafond mensuel, puis se régularise progressivement sur l'année pour que le total corresponde au plafond annuel. C'est ce mécanisme qui gère correctement primes et variations de salaire.",
      },
      {
        question: "Le plafond est-il réduit pour un temps partiel ?",
        reponse:
          "Oui, il peut être proratisé en fonction de la durée du travail, ce qui évite au salarié à temps partiel de sur-cotiser à la retraite de base par rapport à son salaire. La proratisation s'applique aussi aux entrées et sorties en cours de mois.",
      },
      {
        question: "Qu'arrive-t-il si mes paies de janvier ont utilisé l'ancien plafond ?",
        reponse:
          "Les cotisations de retraite et les tranches sont légèrement fausses, et la DSN transmet ces erreurs aux organismes. Il faut corriger le paramétrage puis laisser la régularisation progressive rattraper l'écart, ou établir des bulletins rectificatifs selon l'ampleur.",
      },
    ],
    cta: "Chaque 1er janvier apporte son lot de paramètres. Externalisez, et ils seront toujours à jour.",
  },
  {
    slug: "fiche-de-paie-apprenti-2025",
    titre: "Fiche de paie d'un apprenti : rémunération, cotisations et nouveautés 2025",
    description:
      "Barème de rémunération des apprentis en pourcentage du SMIC, exonérations de cotisations, et durcissement pour les contrats conclus depuis le 1er mars 2025 : le point complet.",
    categorie: "Paie",
    date: "2025-02-11",
    dateAffichee: "11 février 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Le bulletin d'un apprenti ne ressemble à aucun autre : salaire en pourcentage du SMIC selon l'âge et l'année de formation, exonérations spécifiques, et depuis 2025 un régime social durci pour les nouveaux contrats. C'est aussi l'un des bulletins les plus souvent faux, car les logiciels grand public gèrent mal les changements de tranche d'âge en cours de contrat.",
      "Voici les règles applicables, en distinguant bien les contrats selon leur date de conclusion.",
    ],
    sections: [
      {
        id: "bareme-remuneration",
        titre: "Le barème de rémunération",
        paragraphes: [
          "Sauf dispositions conventionnelles plus favorables, l'apprenti perçoit un pourcentage du SMIC croissant avec l'âge et l'année d'exécution du contrat : de 27 % du SMIC pour un mineur en première année jusqu'à 100 % pour un apprenti de 26 ans et plus. Le changement de tranche s'applique le premier jour du mois qui suit l'anniversaire, un rendez-vous que la paie doit anticiper.",
          "Vérifiez toujours votre [convention collective](/conventions-collectives) : de nombreuses branches prévoient des pourcentages majorés, et le minimum conventionnel prime alors sur le barème légal.",
        ],
      },
      {
        id: "regime-social-2025",
        titre: "Cotisations : le tournant du 1er mars 2025",
        paragraphes: [
          "Pour les contrats conclus jusqu'au 28 février 2025, la rémunération de l'apprenti est exonérée de cotisations salariales dans la limite de 79 % du SMIC, et échappe à la CSG et à la CRDS en totalité : le net rejoint quasiment le brut.",
          "Pour les contrats conclus à compter du 1er mars 2025, la loi de financement de la sécurité sociale pour 2025 a resserré le dispositif : l'exonération de cotisations salariales est limitée à 50 % du SMIC, et la part de rémunération excédant ce seuil est désormais assujettie à la CSG et à la CRDS. Deux apprentis payés pareil peuvent donc avoir des nets différents selon la date de signature de leur contrat, ce que le bulletin doit refléter fidèlement.",
        ],
      },
      {
        id: "cote-employeur",
        titre: "Côté employeur : aides et exonérations",
        paragraphes: [
          "L'employeur bénéficie de la réduction générale de cotisations patronales sur la rémunération de l'apprenti, et l'aide à l'embauche versée par l'État reste soumise à des conditions et des montants régulièrement révisés : vérifiez le montant en vigueur à la date de conclusion, il a évolué plusieurs fois depuis 2023.",
          "En paie, l'apprenti compte par ailleurs pour partie dans des effectifs et pas dans d'autres : il est notamment exclu du calcul de l'effectif pour la plupart des seuils sociaux pendant la durée du contrat, un paramètre à ne pas négliger à l'approche des seuils de 11 ou 50 salariés.",
        ],
      },
    ],
    faq: [
      {
        question: "Un apprenti a-t-il droit à une mutuelle d'entreprise ?",
        reponse:
          "Oui, comme tout salarié, avec les mêmes dispenses possibles (notamment s'il est couvert par ailleurs en tant qu'ayant droit). La part salariale de la mutuelle vient en déduction de son net, ce qui surprend souvent sur les premiers bulletins.",
      },
      {
        question: "Le salaire d'un apprenti est-il imposable ?",
        reponse:
          "Il est exonéré d'impôt sur le revenu dans la limite du SMIC annuel. Le prélèvement à la source ne s'applique donc en principe qu'à la fraction excédentaire, cas rare en pratique.",
      },
      {
        question: "Que se passe-t-il à la fin de l'apprentissage si j'embauche l'apprenti ?",
        reponse:
          "Le contrat de droit commun qui suit reprend l'ancienneté acquise au titre de l'apprentissage, sans période d'essai possible si l'embauche suit immédiatement le contrat dans la même entreprise. Le bulletin bascule sur le régime normal dès le premier jour.",
      },
    ],
    cta: "Un apprenti à la rentrée ? Nous gérons barèmes, changements de tranche et exonérations sans que vous y pensiez.",
  },
  {
    slug: "dirigeant-assimile-salarie-bulletin-de-paie",
    titre: "Dirigeant assimilé salarié : qui doit avoir un bulletin de paie et comment l'établir",
    description:
      "Président de SAS ou SASU, gérant minoritaire de SARL : ces mandataires sociaux relèvent du régime général et reçoivent un bulletin de paie, sans assurance chômage. Les règles.",
    categorie: "Paie",
    date: "2025-03-11",
    dateAffichee: "11 mars 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Un dirigeant peut-il avoir une fiche de paie ? Tout dépend de son statut. Le président de SAS ou de SASU et le gérant minoritaire ou égalitaire de SARL sont des assimilés salariés : leur rémunération de mandat relève du régime général et donne lieu à un bulletin de paie. Le gérant majoritaire de SARL et l'entrepreneur individuel, eux, relèvent du régime des indépendants et n'en reçoivent jamais.",
      "Bulletin, oui ; salarié, non : cette nuance commande tout le paramétrage de la paie du dirigeant.",
    ],
    sections: [
      {
        id: "qui-est-assimile",
        titre: "Qui est assimilé salarié",
        paragraphes: [
          "Relèvent du régime général au titre de leur mandat : les présidents et directeurs généraux de SAS, SASU et SA, et les gérants de SARL ne détenant pas plus de la moitié du capital (en tenant compte des parts du conjoint et des enfants mineurs). Le critère est le mandat social rémunéré, pas l'existence d'un contrat de travail.",
          "Le cumul d'un mandat et d'un vrai contrat de travail reste possible sous conditions strictes : fonctions techniques distinctes du mandat, rémunération distincte et lien de subordination réel, ce qui est par construction impossible pour un dirigeant qui contrôle la société.",
        ],
      },
      {
        id: "particularites-du-bulletin",
        titre: "Les particularités du bulletin du dirigeant",
        paragraphes: [
          "Le bulletin d'un assimilé salarié ressemble à un bulletin de cadre, à une différence majeure : pas de cotisation d'assurance chômage, le mandataire n'étant pas couvert par France Travail en cas de perte de son mandat. Certaines conventions collectives ne lui sont par ailleurs pas applicables, le mandat n'étant pas un contrat de travail : primes et minima conventionnels ne s'imposent pas, sauf décision contraire.",
          "Ni SMIC ni durée du travail ne s'appliquent au mandat : la rémunération est librement fixée par les statuts ou l'assemblée, peut être nulle, et le bulletin n'affiche pas d'heures. Un bulletin de dirigeant paramétré comme celui d'un salarié ordinaire est faux, et l'erreur se voit en DSN.",
        ],
      },
      {
        id: "cas-du-dirigeant-employeur",
        titre: "Le dirigeant-employeur dans votre paie externalisée",
        paragraphes: [
          "Le cas le plus fréquent en TPE : un président de SASU qui s'attribue une rémunération et emploie un ou deux salariés. Notre service traite son bulletin de mandataire aux côtés de ceux de ses salariés, et son [espace client](/espace-client) lui donne accès à la fois à son dossier d'employeur et à ses propres bulletins.",
          "La question de l'arbitrage entre rémunération et dividendes, elle, relève du conseil fiscal et social d'ensemble : c'est une décision de gestion que la paie exécute, mais ne remplace pas. Nous établissons les bulletins de la rémunération décidée, votre expert-comptable ou votre conseil optimise l'enveloppe, [chacun son périmètre](/notre-perimetre).",
        ],
      },
    ],
    faq: [
      {
        question: "Un président de SASU non rémunéré doit-il avoir un bulletin ?",
        reponse:
          "Non : sans rémunération, pas de bulletin ni de cotisations, et pas de protection sociale au titre du mandat. Attention en revanche aux fonctions exercées : une activité effective durablement non rémunérée peut poser d'autres questions, notamment vis-à-vis de France Travail en cas de cumul avec le chômage.",
      },
      {
        question: "Le dirigeant assimilé salarié cotise-t-il pour la retraite ?",
        reponse:
          "Oui, exactement comme un salarié : retraite de base du régime général et retraite complémentaire Agirc-Arrco sur sa rémunération de mandat. C'est d'ailleurs l'un des intérêts d'une rémunération régulière plutôt que de dividendes seuls, qui n'ouvrent aucun droit.",
      },
      {
        question: "Faut-il une DPAE pour un mandataire social ?",
        reponse:
          "Non, la déclaration préalable à l'embauche ne concerne que les salariés titulaires d'un contrat de travail. Le mandataire est déclaré via la DSN dès sa première rémunération, avec un statut d'emploi spécifique.",
      },
    ],
    cta: "Votre propre bulletin de dirigeant est-il juste ? Faites-le vérifier avec ceux de vos salariés.",
  },
  {
    slug: "arret-maladie-ijss-subrogation-bulletin",
    titre: "Arrêt maladie d'un salarié : IJSS, subrogation et traitement en paie",
    description:
      "Signalement DSN, indemnités journalières plafonnées à 1,4 SMIC depuis avril 2025, maintien de salaire et subrogation : comment traiter un arrêt de travail sur le bulletin de paie.",
    categorie: "Paie",
    date: "2025-04-08",
    dateAffichee: "8 avril 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Un arrêt maladie déclenche une chaîne précise : signalement à l'Assurance maladie via la DSN, calcul des indemnités journalières, application du maintien de salaire légal ou conventionnel, et traduction de tout cela sur le bulletin, avec ou sans subrogation. Chaque maillon mal exécuté se voit : salarié payé en retard, IJSS perdues, ou bulletin faux.",
      "Depuis le 1er avril 2025, une donnée a changé la donne pour les salaires moyens et supérieurs : le plafond des indemnités journalières a été abaissé.",
    ],
    sections: [
      {
        id: "ijss-et-plafond",
        titre: "Les IJSS et le nouveau plafond de 1,4 SMIC",
        paragraphes: [
          "L'indemnité journalière maladie représente 50 % du salaire journalier de base, calculé sur les trois derniers mois de salaire brut, ce salaire de référence étant plafonné. Pour les arrêts débutant à compter du 1er avril 2025, ce plafond a été abaissé de 1,8 à 1,4 SMIC : les salariés gagnant plus voient leurs IJSS diminuer, et c'est l'employeur pratiquant un maintien de salaire qui absorbe la différence.",
          "Un délai de carence de trois jours s'applique en maladie non professionnelle : les IJSS ne courent qu'à partir du quatrième jour, sauf dispositions plus favorables de certains régimes.",
        ],
      },
      {
        id: "maintien-de-salaire",
        titre: "Le maintien de salaire : légal, conventionnel, et son calcul",
        paragraphes: [
          "La loi impose, après un an d'ancienneté, un maintien partiel : 90 % du brut pendant une première période puis deux tiers, pour des durées croissant avec l'ancienneté, après un délai de carence de sept jours. Les [conventions collectives](/conventions-collectives) améliorent très souvent ce socle : maintien à 100 %, carence supprimée, durées allongées, chaque branche a son régime.",
          "Le maintien s'entend déduction faite des IJSS : c'est là que naissent la plupart des erreurs, entre maintien du net et maintien du brut, IJSS estimées puis régularisées, et arrêts à cheval sur deux mois. Un dossier maladie propre exige une méthode constante et documentée.",
        ],
      },
      {
        id: "subrogation",
        titre: "La subrogation : confort pour le salarié, rigueur pour l'employeur",
        paragraphes: [
          "Avec la subrogation, l'employeur maintient le salaire et perçoit les IJSS directement à la place du salarié : ce dernier ne subit aucune rupture de revenu, et l'entreprise se rembourse. C'est l'option la plus protectrice, à condition d'en suivre les flux : IJSS attendues, reçues, écarts à régulariser.",
          "Sur le bulletin, l'arrêt se traduit par une absence valorisée, le maintien, et les IJSS subrogées en pied de bulletin ; le montant net social et le net imposable suivent des règles distinctes sur ces sommes. C'est typiquement le mois où [externaliser sa paie](/blog/combien-coute-externalisation-paie) démontre sa valeur.",
        ],
      },
    ],
    faq: [
      {
        question: "Quel est le délai pour signaler un arrêt en DSN ?",
        reponse:
          "Le signalement d'arrêt de travail doit partir dans les cinq jours. Il déclenche le calcul des IJSS ; tout retard décale l'indemnisation du salarié, et en subrogation, le remboursement de l'employeur.",
      },
      {
        question: "L'employeur peut-il refuser la subrogation ?",
        reponse:
          "La subrogation est de droit lorsque le salaire est maintenu en totalité ; elle est une faculté dans les autres cas. Beaucoup de conventions collectives la rendent en pratique incontournable en imposant un maintien à 100 %.",
      },
      {
        question: "Les IJSS sont-elles imposables et soumises à cotisations ?",
        reponse:
          "Les IJSS maladie sont soumises à CSG-CRDS à taux réduit et à l'impôt sur le revenu, mais pas aux cotisations de sécurité sociale. Leur traitement en paie diffère donc de celui du salaire, notamment pour le montant net social.",
      },
    ],
    cta: "Un arrêt en cours et un doute sur le bulletin du mois ? Posez la question avant de payer, pas après.",
  },
  {
    slug: "embaucher-son-premier-salarie-formalites",
    titre: "Embaucher son premier salarié : toutes les formalités, dans l'ordre",
    description:
      "DPAE, contrat, convention collective, mutuelle, prévoyance, registre du personnel, affichages, DSN : la check-list complète de la première embauche pour une TPE ou une association.",
    categorie: "RH",
    date: "2025-05-13",
    dateAffichee: "13 mai 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 6,
    intro: [
      "La première embauche transforme une entreprise ou une association en employeur, avec tout ce que le Code du travail attache à ce mot. La bonne nouvelle : les formalités sont parfaitement balisées. La mauvaise : plusieurs d'entre elles sont à faire avant le premier jour de travail, et leur oubli coûte cher.",
      "Voici la séquence complète, dans l'ordre chronologique.",
    ],
    sections: [
      {
        id: "avant-le-premier-jour",
        titre: "Avant le premier jour : DPAE, contrat, convention",
        paragraphes: [
          "La déclaration préalable à l'embauche (DPAE) se fait auprès de l'Urssaf dans les huit jours précédant l'embauche, et au plus tard avant la prise de poste : elle déclenche l'immatriculation de l'employeur, l'affiliation du salarié et la visite d'information et de prévention. Travailler sans DPAE, c'est du travail dissimulé, avec des sanctions lourdes.",
          "Identifiez votre [convention collective](/conventions-collectives) dès ce stade : elle détermine le salaire minimum, la période d'essai, les primes et la prévoyance obligatoire. Rédigez ensuite le contrat : écrit obligatoire pour un CDD ou un temps partiel, et vivement recommandé pour un CDI, la convention l'imposant d'ailleurs souvent.",
        ],
      },
      {
        id: "protections-obligatoires",
        titre: "Mutuelle, prévoyance, médecine du travail",
        paragraphes: [
          "Tout employeur du privé doit proposer une complémentaire santé collective financée au moins à moitié, dès le premier salarié ; certaines branches imposent en plus un régime de prévoyance, notamment pour les cadres, dont le défaut de souscription engage lourdement l'employeur en cas de décès ou d'invalidité.",
          "L'adhésion à un service de prévention et de santé au travail est obligatoire, avec une visite d'information et de prévention dans les trois mois de la prise de poste. Complétez avec le registre unique du personnel, tenu dès la première embauche, et les affichages ou informations obligatoires.",
        ],
      },
      {
        id: "la-paie-commence",
        titre: "Et la paie commence : bulletin et DSN dès le premier mois",
        paragraphes: [
          "Dès le premier mois, l'employeur doit un bulletin conforme au modèle clarifié et une DSN mensuelle, transmise le 5 ou le 15 du mois suivant selon l'effectif. La DSN alimente l'Urssaf, la retraite, la prévoyance et le prélèvement à la source : elle est le vrai examen mensuel de l'employeur.",
          "C'est le moment où la question de l'outillage se pose : apprendre la paie pour un seul salarié est rarement rationnel. Notre article [combien coûte l'externalisation](/blog/combien-coute-externalisation-paie) pose les chiffres du choix ; et pour comprendre ce que vous signerez chaque mois, notre guide [du bulletin de paie](/comprendre-bulletin-de-paie) reste ouvert à tous.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien coûte un salarié au-delà de son salaire ?",
        reponse:
          "Comptez le brut, plus les cotisations patronales (fortement allégées au niveau du SMIC par la réduction générale, croissantes ensuite), plus mutuelle, médecine du travail et éventuelle prévoyance. Selon le niveau de salaire, le coût total va d'environ 1,1 à 1,45 fois le brut.",
      },
      {
        question: "Puis-je embaucher en CDD pour tester avant un CDI ?",
        reponse:
          "Non : le CDD n'est licite que pour des cas de recours limités (remplacement, accroissement temporaire d'activité, saisonnier...). Pour tester, la période d'essai du CDI est faite pour cela, avec des durées encadrées par la loi et la convention.",
      },
      {
        question: "Une association a-t-elle des obligations différentes ?",
        reponse:
          "Non sur le fond : DPAE, contrat, convention (souvent ÉCLAT, sport ou animation selon l'activité), mutuelle et DSN s'appliquent à l'identique. S'y ajoutent des dispositifs propres comme le chèque emploi associatif pour simplifier certaines démarches.",
      },
    ],
    cta: "Première embauche en vue ? Nous prenons la paie et la DSN dès le premier bulletin, et vous gardez l'esprit au recrutement.",
  },
  {
    slug: "conges-payes-et-arret-maladie-regles",
    titre: "Congés payés et arrêt maladie : les règles issues de la loi du 22 avril 2024",
    description:
      "Acquisition de congés pendant la maladie, report de 15 mois, information du salarié au retour : ce que la loi du 22 avril 2024 a changé et comment l'appliquer en paie.",
    categorie: "RH",
    date: "2025-06-10",
    dateAffichee: "10 juin 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Longtemps, le droit français a refusé au salarié malade d'acquérir des congés payés pendant son arrêt d'origine non professionnelle, en contradiction avec le droit européen. La loi du 22 avril 2024 a mis le Code du travail en conformité, avec effet rétroactif encadré, et transformé la gestion des compteurs de congés.",
      "Deux ans après, ces règles sont entrées dans la routine des paies, mais restent une source d'erreurs dans les compteurs et les soldes de tout compte.",
    ],
    sections: [
      {
        id: "acquisition-pendant-maladie",
        titre: "Ce que le salarié acquiert désormais pendant un arrêt",
        paragraphes: [
          "Pendant un arrêt de travail d'origine non professionnelle, le salarié acquiert des congés au rythme de deux jours ouvrables par mois, dans la limite de 24 jours ouvrables par période de référence, soit quatre semaines par an. Pendant un arrêt d'origine professionnelle (accident du travail, maladie professionnelle), l'acquisition reste de 2,5 jours par mois, désormais sans limite de durée d'arrêt.",
          "Concrètement, les compteurs de congés doivent distinguer l'origine de l'absence, ce que tous les paramétrages de paie ne faisaient pas : c'est le premier point à auditer.",
        ],
      },
      {
        id: "report-et-information",
        titre: "Report de 15 mois et obligation d'information",
        paragraphes: [
          "Le salarié qui n'a pas pu prendre ses congés du fait de la maladie bénéficie d'un report de 15 mois. Ce délai court en principe à compter de l'information donnée par l'employeur au retour du salarié : dans le mois qui suit la reprise, l'employeur doit l'informer du nombre de jours dont il dispose et de la date limite de prise, l'usage étant de le faire par un document traçable, souvent via le bulletin de paie.",
          "Pour les arrêts de longue durée couvrant toute la période de prise, la loi fait courir le report sans attendre la reprise, évitant l'accumulation sans fin. Ces règles s'appliquent aussi aux situations antérieures, dans les limites et délais de réclamation fixés par la loi.",
        ],
      },
      {
        id: "consequences-en-paie",
        titre: "Les conséquences très concrètes en paie",
        paragraphes: [
          "Trois chantiers pour l'employeur : fiabiliser les compteurs (acquisition différenciée selon l'origine de l'absence, plafond de 24 jours), tracer l'information de reprise qui déclenche le report, et corriger les indemnités de congés payés, y compris dans les [soldes de tout compte](/blog/solde-de-tout-compte-contenu-delais) où des jours acquis pendant la maladie doivent désormais être indemnisés.",
          "Le contentieux type de la période : un salarié parti après une longue maladie réclame l'indemnité des congés acquis pendant son arrêt. Provisionner juste et payer juste au départ coûte toujours moins cher que le rappel prud'homal trois ans plus tard.",
        ],
      },
    ],
    faq: [
      {
        question: "Le salarié malade pendant ses congés récupère-t-il ses jours ?",
        reponse:
          "La jurisprudence européenne pousse à la récupération des jours de congés percutés par une maladie survenue pendant les vacances ; le droit français s'aligne progressivement. Le réflexe sûr : exiger l'arrêt de travail et traiter la question par écrit plutôt que par pratique tacite.",
      },
      {
        question: "Les 15 mois de report peuvent-ils être aménagés ?",
        reponse:
          "Un accord d'entreprise ou de branche peut prévoir une durée de report supérieure à 15 mois, jamais inférieure. Vérifiez votre convention avant de clôturer des compteurs.",
      },
      {
        question: "Faut-il régulariser les périodes antérieures à la loi ?",
        reponse:
          "La loi a organisé une rétroactivité encadrée, avec un délai de forclusion de deux ans à compter de son entrée en vigueur pour les salariés en poste. La fenêtre principale de réclamation est aujourd'hui passée, mais des situations particulières (salariés partis, contentieux en cours) peuvent subsister : traitez-les au cas par cas.",
      },
    ],
    cta: "Vos compteurs de congés sont-ils conformes ? Nous les tenons à jour, arrêt par arrêt, dans votre paie externalisée.",
  },
  {
    slug: "erreur-sur-un-bulletin-de-paie-corriger",
    titre: "Erreur sur un bulletin de paie : comment corriger, régulariser et dans quels délais",
    description:
      "Trop-versé, salaire manquant, cotisations erronées : la méthode pour corriger un bulletin de paie, régulariser la DSN, et les délais de prescription applicables (3 ans, 6 mois).",
    categorie: "Paie",
    date: "2025-07-08",
    dateAffichee: "8 juillet 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Aucune paie n'est infaillible : une prime oubliée, un taux erroné, une absence mal décomptée. Ce qui distingue un employeur sérieux n'est pas l'absence d'erreur, c'est la qualité de la correction : rapide, transparente, et propagée jusqu'à la DSN.",
      "Voici la méthode, selon que l'erreur joue en faveur du salarié ou de l'employeur.",
    ],
    sections: [
      {
        id: "salaire-manquant",
        titre: "Le salarié a reçu trop peu : régulariser sans attendre",
        paragraphes: [
          "Un élément de salaire manquant se régularise sur la paie suivante, par une ligne de rappel clairement libellée avec sa période d'origine, ou par un bulletin complémentaire si l'attente est trop longue. Le salarié dispose de trois ans pour réclamer un salaire impayé, et la demande peut remonter aux trois années précédant la rupture du contrat : une petite erreur récurrente devient vite un gros rappel.",
          "La correction doit suivre en DSN : selon le cas, la régularisation s'intègre à la DSN du mois suivant ou nécessite une DSN annule et remplace si l'échéance n'est pas passée. Les organismes recalculent alors cotisations et droits sur des bases justes.",
        ],
      },
      {
        id: "trop-verse",
        titre: "Le salarié a reçu trop : la retenue encadrée",
        paragraphes: [
          "L'employeur peut récupérer un trop-versé, mais pas n'importe comment : la compensation sur les salaires suivants est plafonnée à la fraction saisissable du salaire, le salarié devant conserver au minimum une somme équivalente au RSA. La retenue s'étale donc, et un échéancier écrit accepté par le salarié sécurise l'opération.",
          "Le délai pour agir est de trois ans. Et si le salarié a quitté l'entreprise, la récupération passe par une demande amiable puis, à défaut, par le juge : d'où l'intérêt de contrôles avant paiement plutôt qu'après.",
        ],
      },
      {
        id: "prevention",
        titre: "Prévenir : les contrôles qui évitent 90 % des erreurs",
        paragraphes: [
          "Les erreurs de paie ont des causes récurrentes : variables transmises tard ou oralement, paramétrages non mis à jour après une évolution légale ou conventionnelle, cas particuliers traités de mémoire. Trois contrôles les neutralisent : une collecte écrite des variables à date fixe, une veille appliquée systématiquement, et une relecture des bulletins atypiques du mois (entrée, sortie, arrêt, changement de taux).",
          "C'est précisément le protocole de notre service : [la veille est incluse](/notre-perimetre), les variables sont tracées, et chaque bulletin sensible est relu. Le guide [comprendre votre bulletin](/comprendre-bulletin-de-paie) permet en outre à vos salariés de détecter l'anomalie avant qu'elle ne s'installe.",
        ],
      },
    ],
    faq: [
      {
        question: "Un bulletin de paie peut-il être refait après remise au salarié ?",
        reponse:
          "Oui : un bulletin rectificatif annule et remplace le précédent, en le mentionnant explicitement. L'essentiel est la cohérence de bout en bout : bulletin, paiement, DSN et documents annuels doivent raconter la même histoire.",
      },
      {
        question: "Le salarié qui signe son solde de tout compte peut-il encore réclamer une erreur ?",
        reponse:
          "Pour les sommes expressément mentionnées au reçu, il a six mois ; pour celles qui n'y figurent pas, trois ans. Le détail est dans notre article sur le solde de tout compte.",
      },
      {
        question: "Une erreur de cotisations se corrige-t-elle auprès de l'Urssaf ?",
        reponse:
          "Oui, par la DSN rectificative ou les régularisations du mois suivant. En cas de doute de bonne foi, le droit à l'erreur permet de régulariser sans pénalité, tant que l'Urssaf n'a pas engagé de contrôle.",
      },
    ],
    cta: "Une erreur découverte sur vos paies ? Faites-la corriger proprement, DSN comprise, avant qu'elle ne prospère.",
  },
  {
    slug: "particulier-employeur-cesu-ou-paie-classique",
    titre: "Particulier employeur : CESU, Pajemploi ou paie classique, que choisir ?",
    description:
      "Employé à domicile, garde d'enfants, assistant maternel : les dispositifs déclaratifs du particulier employeur, leurs limites, et les cas où une paie accompagnée s'impose.",
    categorie: "Externalisation",
    date: "2025-08-12",
    dateAffichee: "12 août 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Employer quelqu'un chez soi fait de vous un employeur de plein droit : convention collective, salaire minimum, congés payés, tout s'applique. L'État a créé des guichets simplifiés, CESU et Pajemploi, qui allègent la mécanique déclarative ; ils ne dispensent en revanche d'aucune règle de fond.",
      "Voici comment choisir votre circuit, et où se cachent les pièges.",
    ],
    sections: [
      {
        id: "cesu-et-pajemploi",
        titre: "CESU et Pajemploi : ce qu'ils font, ce qu'ils ne font pas",
        paragraphes: [
          "Le CESU déclaratif couvre les emplois à domicile hors garde d'enfants : vous déclarez les heures et le salaire net, l'Urssaf calcule les cotisations, produit le bulletin et gère le prélèvement à la source ; l'option CESU+ va jusqu'à verser le salaire. Pajemploi joue le même rôle pour la garde d'enfants (assistant maternel, garde à domicile), avec le complément de libre choix du mode de garde.",
          "Ce que ces guichets ne font pas : appliquer la [convention collective des particuliers employeurs et de l'emploi à domicile](/conventions-collectives) (IDCC 3239). Minimum conventionnel par niveau, majoration des heures, indemnités de rupture, calcul des congés : ces règles restent à votre charge, et le bulletin CESU sera juste uniquement si votre déclaration l'était.",
        ],
      },
      {
        id: "les-pieges",
        titre: "Les pièges classiques du particulier employeur",
        paragraphes: [
          "Premier piège : les congés payés. Dans le CESU, le salaire déclaré est réputé inclure les 10 % de congés pour les emplois très occasionnels, mais pour un emploi régulier, les congés se gèrent réellement, avec des règles propres à la convention. Deuxième piège : la rupture, qui obéit à une procédure spécifique (retrait d'emploi, indemnités, documents de fin de contrat) que le guichet ne fait pas à votre place.",
          "Troisième piège : les arrêts maladie et la prévoyance conventionnelle, qui suivent des circuits particuliers. Sur tous ces points, notre page dédiée aux [particuliers employeurs](/particuliers-employeurs) détaille ce que nous prenons en charge : vous restez déclarant au CESU, nous sécurisons tout ce que le CESU ne fait pas.",
        ],
      },
    ],
    faq: [
      {
        question: "Le crédit d'impôt de 50 % s'applique-t-il dans tous les cas ?",
        reponse:
          "Les services à la personne rendus à domicile ouvrent droit au crédit d'impôt de 50 % des dépenses dans des plafonds annuels, avec le service d'avance immédiate pour en bénéficier en temps réel dans le CESU+. Les activités éligibles et plafonds spécifiques méritent une vérification selon votre situation.",
      },
      {
        question: "Dois-je faire un contrat de travail écrit ?",
        reponse:
          "Dès que l'emploi est régulier, oui : la convention collective l'impose au-delà de seuils très bas, et l'écrit protège les deux parties sur les horaires, le lieu et la rémunération. Des modèles conformes existent, encore faut-il les compléter juste.",
      },
      {
        question: "Que se passe-t-il si je déclare mal au CESU ?",
        reponse:
          "Le bulletin produit est faux, les droits du salarié (retraite, chômage, maladie) sont mal alimentés, et une régularisation avec rappels reste possible pendant trois ans. Le guichet simplifie la déclaration, il ne valide pas votre droit du travail.",
      },
    ],
    cta: "Employeur à domicile ? Gardez le CESU, et confiez-nous ce qu'il ne fait pas à votre place.",
  },
  {
    slug: "rupture-conventionnelle-procedure-indemnite-paie",
    titre: "Rupture conventionnelle : procédure, indemnité et traitement en paie",
    description:
      "Entretiens, délais de rétractation et d'homologation, calcul de l'indemnité spécifique, régime social avec la contribution patronale de 30 % : la rupture conventionnelle pas à pas.",
    categorie: "RH",
    date: "2025-09-09",
    dateAffichee: "9 septembre 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "La rupture conventionnelle est devenue le mode de séparation amiable de référence : elle sécurise le départ, ouvre les droits au chômage et évite le contentieux du licenciement. À condition de respecter scrupuleusement sa procédure et de payer juste, car l'indemnité obéit à un régime social précis, alourdi côté employeur depuis 2023.",
      "Le parcours complet, du premier entretien au dernier bulletin.",
    ],
    sections: [
      {
        id: "procedure",
        titre: "La procédure : entretiens, rétractation, homologation",
        paragraphes: [
          "La rupture se négocie au cours d'un ou plusieurs entretiens, où le salarié peut se faire assister. La convention signée (via le téléservice TéléRC pour les salariés non protégés) ouvre un délai de rétractation de 15 jours calendaires pour chaque partie, puis un délai d'homologation de 15 jours ouvrables pendant lequel l'administration contrôle la liberté du consentement et le montant de l'indemnité.",
          "Le contrat ne peut prendre fin qu'au plus tôt le lendemain de l'homologation. Toute la chronologie doit être traçée : une date mal calculée invalide la rupture et la requalifie en licenciement sans cause.",
        ],
      },
      {
        id: "indemnite",
        titre: "L'indemnité : plancher légal, conventionnel, et calcul",
        paragraphes: [
          "L'indemnité spécifique ne peut être inférieure à l'indemnité légale de licenciement : un quart de mois de salaire par année d'ancienneté jusqu'à dix ans, un tiers au-delà, sur la base du salaire de référence le plus favorable (moyenne des douze ou des trois derniers mois). De nombreuses branches imposent leur indemnité conventionnelle de licenciement lorsqu'elle est supérieure : vérifiez votre [convention collective](/conventions-collectives) avant de signer un montant.",
          "L'ancienneté s'apprécie à la date de rupture, préavis théorique inclus, et les années incomplètes se proratisent. Un montant sous le plancher entraîne le refus d'homologation, ou un rappel ultérieur.",
        ],
      },
      {
        id: "regime-social",
        titre: "Le régime social et le bulletin de départ",
        paragraphes: [
          "Pour le salarié, l'indemnité est exonérée d'impôt et de cotisations dans les limites applicables aux indemnités de rupture, la CSG-CRDS s'appliquant au-delà d'une franchise. Pour l'employeur, depuis le 1er septembre 2023, l'indemnité supporte une contribution patronale unique de 30 % sur sa part exonérée de cotisations, remplaçant l'ancien forfait social : un coût à intégrer dès la négociation.",
          "Le dernier bulletin cumule salaire, congés, indemnité et son régime propre, et déclenche le [solde de tout compte](/blog/solde-de-tout-compte-contenu-delais) et le signalement DSN de fin de contrat. C'est un bulletin d'orfèvre : faites-le vérifier.",
        ],
      },
    ],
    faq: [
      {
        question: "Le salarié touche-t-il le chômage après une rupture conventionnelle ?",
        reponse:
          "Oui, la rupture conventionnelle homologuée ouvre droit à l'allocation chômage dans les conditions de droit commun, avec les différés d'indemnisation liés aux indemnités supra-légales le cas échéant.",
      },
      {
        question: "Peut-on faire une rupture conventionnelle pendant un arrêt maladie ?",
        reponse:
          "La jurisprudence l'admet, y compris pendant certaines périodes protégées, à la condition stricte d'un consentement libre et éclairé. La prudence commande un formalisme renforcé dans ces situations.",
      },
      {
        question: "L'employeur peut-il refuser une rupture conventionnelle ?",
        reponse:
          "Oui, des deux côtés : c'est un accord, jamais un droit. Aucune des parties ne peut l'imposer, et aucun motif de refus n'a à être donné.",
      },
    ],
    cta: "Une séparation amiable en préparation ? Sécurisez le calendrier, l'indemnité et le bulletin de départ.",
  },
  {
    slug: "dsn-comptes-rendus-corriger-erreurs",
    titre: "DSN : comprendre les comptes rendus métier et corriger ses erreurs",
    description:
      "CRM Urssaf, retours des organismes, DSN annule et remplace, régularisations et droit à l'erreur : comment lire les retours DSN et corriger sans pénalité.",
    categorie: "Déclaratif",
    date: "2025-10-14",
    dateAffichee: "14 octobre 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 5,
    intro: [
      "Déposer sa DSN n'est pas la fin du travail déclaratif : c'est le début du dialogue avec les organismes. Urssaf, retraite complémentaire, prévoyance et administration fiscale renvoient des comptes rendus qui valident, alertent ou rejettent. Un employeur qui ne lit pas ses retours DSN découvre ses erreurs des mois plus tard, avec les régularisations qui vont avec.",
      "Voici comment lire ces retours et corriger dans les règles.",
    ],
    sections: [
      {
        id: "lire-les-retours",
        titre: "Lire les retours : bilans, CRM et alertes",
        paragraphes: [
          "Après chaque dépôt, le tableau de bord DSN restitue d'abord les contrôles de forme (bilan d'anomalies), puis les comptes rendus métier des organismes : le CRM de l'Urssaf confronte les cotisations déclarées à celles attendues, la DGFiP renvoie les comptes rendus du prélèvement à la source avec les taux actualisés des salariés, les caisses de retraite et de prévoyance signalent leurs écarts.",
          "La règle d'or : chaque anomalie signalée est traitée avant l'échéance suivante. Les écarts non traités s'empilent, et un petit décalage de taux devient en quelques mois une régularisation douloureuse.",
        ],
      },
      {
        id: "corriger",
        titre: "Corriger : annule et remplace, ou régularisation au fil de l'eau",
        paragraphes: [
          "Tant que l'échéance de dépôt n'est pas passée, une DSN annule et remplace corrige tout : c'est la voie propre pour une erreur détectée à temps. Après l'échéance, la correction passe par des blocs de régularisation dans la DSN du mois suivant, qui recalculent les cotisations des périodes antérieures.",
          "Certains événements ont leur propre circuit : les signalements d'arrêt de travail et de fin de contrat se corrigent par de nouveaux signalements, pas par la DSN mensuelle. Et le taux de prélèvement à la source ne se corrige jamais à la main : on applique celui que la DGFiP renvoie.",
        ],
      },
      {
        id: "droit-a-l-erreur",
        titre: "Le droit à l'erreur : régulariser sans pénalité",
        paragraphes: [
          "L'employeur de bonne foi qui corrige spontanément une erreur déclarative bénéficie du droit à l'erreur : la régularisation opérée dans les délais (en pratique, dès la découverte et avant tout contrôle) échappe aux majorations, les pénalités restant réservées aux retards et aux manquements répétés ou intentionnels.",
          "La condition implicite : détecter. C'est tout l'intérêt d'une paie externalisée où les retours DSN sont lus chaque mois par un professionnel, [notre périmètre](/notre-perimetre) inclut ce suivi, échéance après échéance.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelles sont les échéances de dépôt de la DSN ?",
        reponse:
          "Le 5 du mois suivant la paie pour les entreprises d'au moins 50 salariés dont la paie est versée le mois même, le 15 pour les autres, à midi. Un dépôt tardif expose à des pénalités par salarié, indépendamment de l'exactitude du contenu.",
      },
      {
        question: "Une DSN peut-elle être redéposée plusieurs fois ?",
        reponse:
          "Oui, en mode annule et remplace, jusqu'à l'échéance : seule la dernière transmise compte. Après l'échéance, on ne redépose plus, on régularise dans les DSN suivantes.",
      },
      {
        question: "Qui est responsable des erreurs si ma paie est externalisée ?",
        reponse:
          "Le déclarant reste juridiquement l'employeur, mais le prestataire engage sa responsabilité contractuelle sur la qualité de son travail. Exigez un prestataire assuré en responsabilité civile professionnelle et transparent sur ses contrôles.",
      },
    ],
    cta: "Des anomalies DSN qui s'accumulent ? Nous reprenons le dossier, corrigeons et suivons chaque retour.",
  },
  {
    slug: "prime-partage-valeur-regime",
    titre: "Prime de partage de la valeur : régime social et fiscal, versement et paie",
    description:
      "Montants, plafonds de 3 000 et 6 000 euros, exonérations selon la taille de l'entreprise et le niveau de salaire, versement en paie et DSN : le point complet sur la PPV.",
    categorie: "Paie",
    date: "2025-11-11",
    dateAffichee: "11 novembre 2025",
    dateMaj: "2026-07-05",
    dateMajAffichee: "5 juillet 2026",
    tempsLecture: 4,
    intro: [
      "Héritière de la prime Macron, la prime de partage de la valeur (PPV) est devenue un outil courant de rémunération ponctuelle : souple, plafonnée, et socialement avantageuse, surtout dans les petites entreprises. Encore faut-il respecter ses conditions de mise en place et connaître précisément ce qui est exonéré, pour qui, et jusqu'à quand.",
      "L'essentiel du régime applicable, côté employeur et côté bulletin.",
    ],
    sections: [
      {
        id: "mise-en-place",
        titre: "Mise en place et plafonds",
        paragraphes: [
          "La PPV s'institue par accord d'entreprise ou décision unilatérale de l'employeur, après consultation du CSE s'il existe. Elle peut être versée à tous les salariés ou modulée selon des critères limitativement admis (rémunération, ancienneté, durée du travail, présence effective), jamais discrétionnaires, et peut donner lieu à deux versements par an.",
          "Le plafond d'exonération est de 3 000 euros par bénéficiaire et par année civile, porté à 6 000 euros notamment en présence d'un dispositif d'intéressement ou de participation volontaire. La prime ne peut se substituer à aucun élément de salaire existant : remplacer une prime habituelle par une PPV expose au redressement.",
        ],
      },
      {
        id: "exonerations",
        titre: "Ce qui est exonéré, pour qui",
        paragraphes: [
          "Dans la limite des plafonds, la PPV est exonérée de cotisations sociales, salariales et patronales, pour tous. Le régime renforcé va plus loin : dans les entreprises de moins de 50 salariés, la prime versée aux salariés gagnant moins de trois SMIC échappe aussi à la CSG-CRDS et à l'impôt sur le revenu, avantage prolongé par la loi jusqu'à fin 2026. Ailleurs, la prime reste soumise à CSG-CRDS et imposable, et au forfait social dans les entreprises de 250 salariés et plus.",
          "Autre voie d'optimisation : la PPV peut être placée sur un plan d'épargne salariale, l'exonération fiscale suivant alors les règles de l'épargne salariale. Sur le bulletin, la prime s'affiche sur sa ligne propre, avec un traitement social distinct du salaire, et se déclare en DSN sous ses codes dédiés.",
        ],
      },
    ],
    faq: [
      {
        question: "Un dirigeant peut-il se verser une PPV ?",
        reponse:
          "La prime bénéficie aux salariés titulaires d'un contrat de travail et à certains intérimaires et agents ; le mandataire social sans contrat de travail n'y est pas éligible pour son mandat. Le dirigeant assimilé salarié cumulant un vrai contrat de travail peut en revanche en bénéficier au titre de celui-ci.",
      },
      {
        question: "La PPV compte-t-elle pour le calcul des indemnités ou du SMIC ?",
        reponse:
          "Non : exclue de l'assiette de vérification du SMIC et des salaires de référence usuels, elle ne remplace pas du salaire et ne gonfle pas les indemnités. C'est sa nature même de complément exceptionnel.",
      },
      {
        question: "Faut-il un écrit pour verser la prime ?",
        reponse:
          "Oui : accord collectif ou décision unilatérale écrite fixant montant, bénéficiaires, critères de modulation et dates. Ce document est la première pièce demandée en cas de contrôle Urssaf.",
      },
    ],
    cta: "Envie de récompenser vos équipes avant la fin de l'année ? Nous chiffrons la PPV et l'intégrons proprement à la paie.",
  },
];
