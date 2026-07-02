# PAIE-ET-DSN.FR - PASSATION SESSION 1

Etat au 2 juillet 2026. Ce document consolide les decisions prises et le backlog pour les sessions suivantes.

## 1. Livre / fait cette session

- Projet Next.js 16 + TypeScript strict + Tailwind v4 complet (0 erreur tsc, build OK), landing one-page + mentions legales + politique de confidentialite + sitemap + robots + favicon SVG.
- Charte : ivoire #FAFAF7, navy #0F2544, emeraude #00A878 / #007A58, ambre #E8A020, texte #33415C. Polices Bricolage Grotesque (titres) + Figtree (texte).
- Positionnement : externalisation complete vs logiciels self-service (macompta.fr). Message : "un logiciel de paie ne repond pas au telephone".
- Carte "Documents pour votre expert-comptable" reformulee : remise mensuelle des documents + option de transmission directe au cabinet comptable (detail tarifaire renvoye au devis, pas dans la carte).
- FAQ enrichie : mandat de tiers declarant (signature electronique, consultable en permanence dans l'espace employeur, revocable) + perimetre du conseil (questions liees a la paie oui, conseil juridique detache non, orientation avocat partenaire). Ces entrees alimentent automatiquement le schema.org FAQPage.

## 2. Cadre juridique valide (a reprendre dans CGV/CGS et pages du site)

- Perimetre monopole EC : production paie / journal de paie / etat des charges / DSN = hors monopole (Cass. com. 17 sept. 2025 : la saisie informatique seule ne releve pas du champ reserve). Interdit : ecritures de paie dans la compta du client, declarations fiscales, toute tenue comptable. On fournit les donnees, l'expert-comptable impute.
- DSN : statut de tiers declarant net-entreprises, non reserve aux EC. Formalites : inscription du cabinet en tiers declarant + mandat ecrit par client (le mandat implicite est reserve aux EC inscrits au tableau).
- Conseil : art. 60 loi 71-1130 = consultations relevant directement de l'activite principale de gestion de paie autorisees. Pas de conseil social detache (rupture, contentieux) : orientation avocat partenaire.
- Validation des bulletins : aucune obligation legale. Regime retenu : validation tacite 48 h (clause CGV opposable) + validation expresse limitee a 3 cas : premier mois d'un dossier, solde de tout compte / DSN fin de contrat (attention denonciation art. L. 1234-20), regularisations retroactives.
- Bulletin electronique : espace salarie = canal de mise a disposition uniquement. L'archivage legal de longue duree (50 ans / 75 ans, D. 3243-7 s., references a verifier avant redaction) reste a la charge de l'employeur. Clause explicite CGV + CGS. Option coffre-fort certifie refacturee pour les clients qui veulent la dematerialisation complete.

## 3. Coffre-fort numerique - decision

- V1 : aucun coffre-fort achete par le cabinet (cout zero). Espace salarie = mise a disposition + telechargement PDF.
- Option client (refacturable avec marge) : depot en coffre certifie a l'acte, sans abonnement. References tarifaires relevees : Maileva vers Digiposte a partir de 0,42 EUR par bulletin (archivage 50 ans, le coffre appartient au salarie et lui reste apres son depart), Pagga Bulletin de paie 0,65 EUR par bulletin sans engagement. A re-verifier au moment du lancement de l'option.

## 4. CGV et CGS - checklist de redaction (session dediee)

CGV (vente des prestations) :
- Objet : production de bulletins, journaux, etats de charges, DSN, documents d'entree/sortie. Exclusions explicites : travaux comptables (ord. 1945), conseil juridique detache (loi 1971).
- Mandat de tiers declarant : annexe contractuelle, signature electronique via solution tierce, revocable, disponible en permanence dans l'espace employeur.
- Validation tacite 48 h + 3 cas de validation expresse (cf. point 2).
- Responsabilite : le client garantit l'exactitude et l'exhaustivite des variables transmises ; l'employeur demeure seul responsable de ses obligations legales d'employeur ; plafond de responsabilite ; RC pro du cabinet a mentionner.
- Archivage : conservation legale des bulletins a la charge de l'employeur ; option coffre-fort certifie.
- Option transmission mensuelle directe a l'expert-comptable du client (tarif selon effectif, au devis).
- Reversibilite : restitution du dossier complet en format exploitable, sans frais de sortie.
- Prix : forfait mensuel sur devis. Pas de mention HT/TTC (cabinet non assujetti TVA), NBSP avant EUR et %.

CGS (usage plateforme, deux volets) :
- Volet employeur : comptes, roles, obligations de securite (garde des identifiants), depot des variables (formats, echeance du 25), justificatifs, consultation du mandat, telechargement des zips, duree de disponibilite des documents en ligne (a definir : ex. 24 mois glissants en ligne, archivage a charge de l'employeur au-dela).
- Volet salarie : acces limite a ses propres bulletins, information sur la nature de mise a disposition (pas d'archivage legal), droit d'opposition au bulletin electronique, sort du compte au depart du salarie.
- RGPD : le client employeur est responsable de traitement, le cabinet sous-traitant ; DPA (accord de sous-traitance art. 28 RGPD) en annexe ; durees de conservation ; sous-traitants ulterieurs (Vercel, Supabase, Brevo, prestataire signature electronique) ; MFA ; journal des acces.

## 5. Espace client - specifications validees

- Fiches variables illimitees : 1 fiche / salarie / mois, duplication du mois precedent, import Excel (.xlsx) ET CSV, statut par fiche (brouillon, transmise, traitee, bulletin disponible), upload de justificatifs rattaches (arrets, plannings).
- Tableau de bord de production cote cabinet (vue par client / mois / statut).
- Zip mensuel par client : bulletins + journal de paie + etat des charges + comptes rendus DSN (accuses de depot et retours organismes). Historique par exercice. Le statut DSN visible est un argument de confiance a valoriser commercialement (peu de prestataires l'offrent).
- Espace salarie : acces restreint a ses seuls bulletins (RLS), mise a disposition sans archivage legal.
- Workflows : formulaire embauche (collecte DPAE, ouverture dossier salarie), signalement arret/sortie avec pieces jointes (alimente les DSN evenementielles), calendrier d'echeances + relances automatiques avant le 25 (Brevo).
- Mandat tiers declarant signe electroniquement (solution tierce a choisir : ex. Yousign, Docaposte) puis stocke et consultable en permanence dans l'espace employeur.
- Export donnees de paie pour l'expert-comptable du client (Excel/CSV de donnees, jamais d'ecritures).
- Facturation du forfait via Stripe.
- Securite : MFA, journal des acces, DPA. Definitions :
  - DPA (Data Processing Agreement) : contrat de sous-traitance de l'article 28 RGPD entre l'employeur (responsable de traitement) et le cabinet (sous-traitant), fixant objet, duree, nature du traitement, mesures de securite, sous-traitants ulterieurs et sort des donnees en fin de contrat.
  - MFA (Multi-Factor Authentication / double authentification) : connexion par mot de passe + second facteur (code a usage unique par application ou e-mail). Supporte nativement par Supabase Auth.
  - Journal des acces : table horodatee tracant qui a consulte ou telecharge quel document et quand (utilisateur, action, ressource, date, IP). Sert la securite, l'accountability RGPD (art. 5.2) et fait preuve de la mise a disposition effective des bulletins aux salaries.
- Phasage : V1 variables + bulletins + zip + espace salarie ; V2 workflows entree/sortie/arrets + mandat electronique ; V3 tableaux de bord avances + option coffre-fort partenaire.

## 6. Offres et maillage a construire sur le site

- Section site a creer : "Notre perimetre d'intervention" (transparence = confiance + AEO) : ce que fait le cabinet (production paie, DSN, information liee a la paie), ce qu'il ne fait pas (travaux comptables, conseil juridique detache), orientation avocat partenaire.
- Section ou page a creer sur le mandat de tiers declarant (pedagogie + SEO : "qui peut transmettre la DSN a ma place").
- Offre "information juridique et pedagogique en droit social" : socle inclus dans les espaces (fiches pratiques employeur + salarie, differenciateur et matiere AEO), avec eventuel niveau payant a arbitrer.
- Services complementaires du cabinet : bloc de renvoi vers cholez-pagotto.fr (DPO externalise, RGPD, formations, creation d'entreprise) plutot que duplication des offres, pour eviter la cannibalisation SEO ; l'argument DPO est naturel (la paie fait prendre conscience des obligations RGPD de l'employeur).

## 7. Backlog immediat

- [ ] Rediger CGV + CGS + DPA (session dediee, references D. 3243-7/D. 3243-8 a verifier).
- [ ] Page ou section "Notre perimetre d'intervention" + page mandat tiers declarant.
- [ ] Inscription du cabinet en tiers declarant sur net-entreprises.
- [ ] Choix de la solution de signature electronique tierce.
- [ ] Choix avocat partenaire (convention de partenariat a formaliser).
- [ ] Confirmer/creer contact@paie-et-dsn.fr ; image OG 1200x630 ; tarif d'appel eventuel.
- [ ] Architecture technique V1 espace client (schema Supabase, RLS, routes) a poser sur le modele Docutheque.

## 8. Mise a jour cibles et process (2e passe)

- Cible elargie : tous les employeurs. Section "Pour qui ?" passee a 4 cartes : TPE et PME, Associations et ESS (CCN generalisees, plus de mention ECLAT seule), Professions liberales (un ou plusieurs salaries, atout mis en avant : a jour de la CCN du personnel des cabinets d'avocats), Particuliers employeurs (CCN des particuliers employeurs et de l'emploi a domicile, axe SEO/AEO a developper : page dediee possible).
- Etapes reformulees : (1) e-mail ou espace client dedie, (2) mise a disposition + 48 h pour observation, (3) validation tacite puis DSN. FAQ DSN alignee.
- Metadata, footer et schema.org elargis a tous les employeurs.
- Point de vigilance particuliers employeurs (a creuser avant la page dediee) : le circuit declaratif standard passe par le CESU / Pajemploi (Urssaf service particuliers employeurs), pas par la DSN classique. Definir le perimetre exact de l'offre (etablissement des bulletins + accompagnement des declarations CESU) et le wording.

## 9. Etude tarifaire (proposition a valider avant publication)

References marche 2026 : fourchette generale 15-40 EUR/bulletin ; TPE 1-10 salaries 25-40 EUR ; cabinets EC 20-35 EUR ; plateformes type Nexco 25 EUR flat ; forfait minimum courant 150-250 EUR/mois chez les gros prestataires pour 1-5 salaries ; frais de dossier marche 250-2500 EUR ; CCN complexes (BTP, HCR, transport) jusqu'a 40 EUR ; logiciels self-service (macompta et similaires) 4-10 EUR/bulletin.

Grille proposee (forfait mensuel = nb bulletins x prix unitaire, degressif) :
- 1 bulletin : 35 EUR/mois
- 2 bulletins : 32 EUR/bulletin (64 EUR/mois)
- 3 bulletins : 30 EUR/bulletin (90 EUR/mois)
- 4 bulletins : 28 EUR/bulletin (112 EUR/mois)
- 5 bulletins : 27 EUR/bulletin (135 EUR/mois)
- 6 a 10 bulletins : 25 EUR/bulletin
- 11 a 20 bulletins : 22 EUR/bulletin
- Plus de 20 bulletins : 19 EUR/bulletin, ou sur devis au-dela de 30
- Particulier employeur : forfait 30 EUR/mois par salarie a domicile
- Majoration CCN complexe (BTP avec caisse CP, HCR) : +3 a +5 EUR/bulletin, annoncee au devis

Actes hors forfait :
- Ouverture de dossier / parametrage : 90 EUR par dossier (aligne sur le taux horaire cabinet), offert a partir de 5 salaries
- Entree de salarie (DPAE, affiliations, dossier) : 40 EUR
- Sortie / solde de tout compte (STC, certificat, attestation France Travail, DSN fin de contrat) : 60 EUR
- Transmission mensuelle directe a l'expert-comptable : 10 EUR/mois par dossier
- Depot coffre-fort certifie (option) : 1,50 EUR par bulletin depose (cout externe 0,42-0,65 EUR, marge incluse)

Positionnement : sous les cabinets EC a effectif egal, au niveau ou legerement au-dessus des plateformes, tres au-dessus du self-service assume (l'argument n'est pas le prix mais le service humain). A valider par Francois avant toute publication sur le site (section Tarifs actuellement en "sur devis").

## 10. Simulateur de tarif (livre, parametres a valider)

Composant components/Simulateur.tsx ("use client") integre a la section Tarifs, replique en JS vanilla dans l'apercu HTML. Formule : prix bulletin = 23 EUR (base temps complet saisie + DSN, decision Francois) x coefficient CCN x coefficient volume, arrondi a 0,50 EUR. Forfait mensuel = prix bulletin x nombre de bulletins. 50 bulletins et plus : sur devis.

Coefficients CCN (constantes en tete de Simulateur.tsx, faciles a ajuster) :
- x1,00 conventions courantes : commerce, SYNTEC, immobilier, pharmacie d'officine, personnel des cabinets d'avocats, cabinets medicaux et dentaires, particuliers employeurs, autre convention courante
- x1,15 conventions a particularites : HCR, animation ECLAT, sport, aide a domicile, proprete, transports routiers, gardiens et employes d'immeubles
- x1,30 conventions complexes : batiment (caisse CP), travaux publics, autre convention a caisse ou regime specifique

Coefficients volume : 1 bulletin x1,00 ; 2-4 x0,95 ; 5-9 x0,90 ; 10-19 x0,85 ; 20-49 x0,78.

Exemples resultants : 1 bulletin commerce 23 EUR ; 1 bulletin HCR 26,50 EUR ; 1 bulletin batiment 30 EUR ; 5 bulletins SYNTEC 103,50 EUR (20,50/bulletin) ; 10 bulletins ECLAT 225 EUR (22,50/bulletin) ; 20 bulletins commerce 360 EUR (18/bulletin).

Disclaimers affiches : estimation indicative non contractuelle, contrats temps complet, hors ouverture de dossier et hors reprise d'historique (bulletins et DSN anterieurs) dont le cout depend du nombre de salaries, de l'historique et de la CCN, montants au devis. Mention frais d'ouverture deplacee et enrichie dans la colonne gauche de la section Tarifs (inclut la reprise d'historique).

La grille indicative de la section 9 est remplacee par ce modele base 23 EUR. Point logiciel : outil de production = module paie macompta.fr (verifier licence multi-dossiers pour prestation a des tiers ; ne jamais importer soi-meme les ecritures dans la comptabilite du client, remise du fichier uniquement).

## 11. Page unique /conventions-collectives (livree)

- Une seule page referencant toutes les CCN : recherche instantanee par intitule ou numero IDCC (avec et sans zeros initiaux, insensible aux accents), filtres Toutes / En vigueur / Fusionnees, badge "Fusionnee dans l'IDCC X" pour les conventions absorbees, CTA "Estimer ma paie" par ligne vers le simulateur.
- Contenu editorial SEO/AEO : role de la CCN dans la paie, definition IDCC, fusions de branches ; FAQ 4 entrees avec schema.org FAQPage + BreadcrumbList ; bloc CTA final. Liens ajoutes : nav header ("Conventions"), footer, sitemap.
- Donnees : data/idcc.json (54 conventions de demarrage, dont 4 fusionnees signalees : 2111 et 2395 vers 3239, 0054 et 0650 vers 3248). Le composant lit ce fichier, la page affiche la date de derniere mise a jour.
- Actualisation automatique et gratuite : scripts/maj-idcc.mjs (telecharge la liste officielle via l'API data.gouv.fr, parse xlsx/csv avec le package xlsx, garde-fou : refuse d'ecraser si moins de 300 conventions extraites) + .github/workflows/maj-idcc.yml (cron mensuel le 1er a 6h UTC + declenchement manuel, commit uniquement si changement, Vercel redeploye automatiquement).
- AVANT LA PREMIERE EXECUTION : verifier sur data.gouv.fr le slug exact du jeu de donnees (constante DATASET_SLUG) et les entetes de colonnes du fichier officiel (fonction normaliserLigne). Deux TODO marques dans le script.
- Evolution possible ulterieure : classification de complexite par IDCC (fichier de surcharge) pour pre-remplir le simulateur depuis la liste, et enrichissement editorial par convention (le modele une-page-par-CCN reste documente en discussion si besoin plus tard).

## 12. Contenus pre-deploiement (livres, relecture Francois requise)

- Mentions legales completees : mediation de la consommation (L. 612-1 C. conso, obligatoire vu la clientele particuliers employeurs), assurance RC pro, clause "nature des informations" (simulateur et liste CCN = information generale, seul le devis engage), renvoi politique de confidentialite. Champs [a completer] : adresse postale, assureur + police, mediateur.
- Politique de confidentialite renforcee : responsable de traitement, section "ce site ne vous piste pas" (zero cookie, polices auto-hebergees par next/font donc aucun appel Google en production, simulateur 100 % navigateur), qualite de sous-traitant art. 28 pour les donnees salaries, durees, droits, CNIL.
- CGV /cgv (13 articles) : perimetre et exclusions ord. 1945 / loi 1971, devis et duree indeterminee avec preavis 1 mois sans frais, prix avec TVA non applicable art. 293 B CGI + penalites L. 441-10 pour les pros, calendrier variables au 27, mise a disposition 3 jours ouvres, validation tacite 48 h + 3 validations expresses + rappel L. 1234-20, transmission d'office a l'echeance pour eviter les penalites, mandat tiers declarant par acte separe, obligation de moyens + plafond 12 mois d'honoraires (pros uniquement), archivage a charge de l'employeur + option coffre-fort D. 3243-7 s., retractation 14 jours L. 221-18 pour les consommateurs, mediation conso, competence.
- CGS /cgs (8 articles) : comptes et roles, MFA, journalisation des acces (securite + preuve de mise a disposition), espace employeur (import Excel/CSV illimite, statuts, mandat consultable), espace salarie = mise a disposition et non archivage legal + droit d'opposition + acces maintenu 12 mois apres depart, disponibilite et 24 mois glissants en ligne, usage loyal, clause de sous-traitance art. 28 avec sous-traitants ulterieurs nommes (Vercel, Supabase, Brevo, signature [a designer]), evolution des CGS.
- Image OpenGraph 1200x630 generee (app/opengraph-image.png) : wordmark tricolore, tagline, signature cabinet, bande doree.
- README : procedure DNS Hostinger detaillee (A @ -> 76.76.21.21, CNAME www -> cname.vercel-dns.com, NE PAS toucher MX/TXT pour conserver la messagerie Hostinger, nameservers inchanges), checklist finale des champs [a completer].
- Ces textes sont des projets rediges par IA : relecture et validation juridique par Francois avant publication, conformement au positionnement du cabinet.

## 13. Alignement cabinet et process de commande (2 juillet, 2e passe)

- E-mail de contact unique : contact@cholez-pagotto.fr partout (Contact, mentions, confidentialite, CGV, SchemaOrg). Pas de creation de boite paie-et-dsn ; les MX Hostinger de cholez-pagotto.fr ne sont pas concernes par la bascule DNS de paie-et-dsn.fr.
- Mentions legales alignees sur cholez-pagotto.fr (source verifiee en ligne) : Francois CHOLEZ EI, nom commercial CBT CHOLEZ-PAGOTTO, SIRET 490 889 516 00053, 12 rue d'Olima 88000 Epinal, tel 03 74 47 40 55 ; activites reglementees (ACPR, ORIAS 26003943, ENDYA) ; clause non-avocat ; section "autres activites" adaptee a la paie (perimetre ord. 1945) ; hebergeur Vercel + registrar Hostinger ; mediateur CM2C (www.cm2c.net) comme sur les CGU du cabinet. Plus aucun champ [a completer] dans les mentions.
- CGV ajustees : commande = validation ecrite du devis ; facturation mensuelle editee de maniere tierce, facture envoyee au client ET mise a disposition dans un emplacement dedie de l'espace client (fonctionnalite a prevoir en V1 espace client : onglet Factures, upload PDF par l'admin, RLS par organisation) ; paiement par virement a reception ; suspension possible apres mise en demeure en cas d'impayes ; RC pro mentionnee avec attestation sur demande (pas de nom d'assureur, comme sur le site cabinet) ; mediateur CM2C nomme a l'art. 13.
- CGS : le prestataire de signature electronique est RETIRE de la liste des sous-traitants ulterieurs art. 28. Motif : la signature du mandat se fait hors plateforme et hors chaine de traitement des donnees des salaries ; pour cette operation le cabinet est responsable de traitement de ses propres donnees clients et le prestataire de signature figure a son registre des traitements, pas dans la clause de sous-traitance des CGS. Ajout dans l'espace employeur : consultation et telechargement des factures.
- Correction UX : ancres du header et du footer passees en /#section pour fonctionner depuis toutes les pages internes (CGV, conventions, etc.).
- Menu confirme : Le service, Comment ca marche, Tarifs, Conventions, FAQ + CTA Demander un devis. Footer identique sur toutes les pages (composants partages).
- Pages candidates proposees (a arbitrer, non bloquantes pour le lancement) : /notre-perimetre, /mandat-tiers-declarant, /particuliers-employeurs, /a-propos.

## 14. Extension du site : 6 pages, navigation refondue, responsive (livre)

Nouvelles pages (17 routes au total, toutes statiques, build OK) :
- /notre-perimetre : ce que fait / ne fait pas le cabinet (ord. 1945, art. 60 loi 1971, orientation avocat), lien vers la page mandat.
- /mandat-tiers-declarant : pedagogie du mandat, process mensuel (48 h, echeances 5/15), FAQ 3 entrees + FAQPage schema.
- /particuliers-employeurs : page niche SEO (CCN 3239, CESU vs circuit classique, fin de contrat), FAQ 3 entrees + FAQPage schema. Positionnement CESU retenu : "le CESU simplifie la declaration, pas le droit du travail" ; nous preparons calculs, contrats et documents que le client declare via CESU ou circuit classique. A valider par Francois (perimetre exact de l'offre particulier employeur).
- /a-propos : presentation cabinet (CRFF, Epinal, 3 principes : transparence, conformite, reversibilite) + section "autres solutions employeurs" : option veille sociale et RH + courtage (ORIAS 26003943, ACPR) en 6 cartes : sante et prevoyance collectives, RC pro / RC exploitation, flotte automobile, multirisque pro et locaux, protection juridique, garanties du dirigeant (prevoyance dirigeant, homme-cle, RC mandataires sociaux, perte d'emploi du dirigeant) + mention decennale batiment. Renvoi vers cholez-pagotto.fr pour formalites/RGPD/DPO/formations.
- /veille-sociale-rh : page de l'abonnement optionnel (synthese reguliere ciblee par CCN, alertes avant echeance, fiches RH), tarif au devis, sans engagement, cadre art. 60 rappele. Coherent avec la newsletter payante existante du cabinet.
- /blog : index alimente par lib/articles.ts + premier article "Qui peut etablir vos bulletins de paie ?" (schema.org Article, sources ord. 1945 / loi 1971 / Cass. com. 17 sept. 2025, maillage vers mandat, perimetre, simulateur). Standard editorial complet Docutheque (sommaire, sidebar, image Blob) a appliquer aux prochains articles si souhaite.

Navigation :
- Header refondu en composant client : desktop = Le service, Tarifs, Conventions, Ressources (menu deroulant : particuliers employeurs, mandat, perimetre, veille, blog), Le cabinet, CTA ; mobile = menu burger complet (il n'y avait aucun menu mobile auparavant), fermeture au clic, aria-expanded.
- Footer 4 colonnes : marque, Le service (ancres), Ressources, Le cabinet + legal. Identique sur toutes les pages (composant partage).
- scroll-mt-20 ajoute sur toutes les sections ancrees (service, etapes, tarifs, faq, contact) pour compenser le header sticky.
- Responsive verifie : grilles en 1 colonne mobile / 2 tablette / 3-4 desktop, wordmark tronque proprement (truncate), simulateur et table conventions en flex-wrap, aucune position absolue debordante (hero payslip dans section overflow-hidden).

Sitemap : 17 URLs dont les articles de blog generes depuis lib/articles.ts.

## 15. Logo, contact, abonnements nommes, separation des projets (livre)

- Logo : wordmark agrandi dans header et footer (paie et dsn en text-2xl extrabold, -et- reduit emeraude, .fr incline -6 deg en ambre) ; fichier public/logo-paie-et-dsn.svg (pictogramme bulletin + coche + wordmark, .fr incline -8 deg) ; apercu PNG genere. Version vectorisee avec la typo Bricolage en trace (outline) a produire plus tard pour print si besoin.
- Page /contact creee (equivalent de la page contact cholez-pagotto.fr, adaptee au site statique) : 4 motifs pre-structures avec mailto a sujet pre-rempli (devis paie, particulier employeur, veille, assurances), coordonnees completes (contact@cholez-pagotto.fr, 03 74 47 40 55, 12 rue d'Olima 88000 Epinal), schema.org ContactPage, note RGPD. CTA header/mobile/footer bascules vers /contact. Un vrai formulaire (API route + Brevo) viendra avec l'espace client V1. Schema.org global enrichi (telephone + adresse complete).
- Abonnements veille nommes et tarifes (page /veille-sociale-rh refondue, schema.org Service + 2 Offers) :
  - Formule 1 "L'Essentiel Social" : 109,90 EUR/mois. Newsletters hebdomadaires, jurisprudences commentees, webinaires gratuits, 350+ modeles social/RH, alertes actualites sociales, RH et paie.
  - Formule 2 "Le Copilote Social" : 229,90 EUR/mois. Tout l'Essentiel + dossiers de synthese et procedures RH, outils de gestion de l'entreprise, priorite en information juridique employeur, priorite en assistance administrative gestion/suivi paie-RH d'un salarie (pas de conseil juridique), frais de dossier offerts pour toutes etudes assurantielles.
  - Mention "sans engagement, resiliable chaque mois" a confirmer par Francois. Noms alternatifs si souhaite : "Veille Employeur" / "Priorite Employeur".
- a-propos : ajout retraite supplementaire (PER entreprise) et cyber-assurance ; grille passee en 4 colonnes (8 cartes, 2 lignes egales).
- SEPARATION DES PROJETS (decision Francois) : repo GitHub distinct (ex. SYPA-ASSO/paie-et-dsn, ne pas toucher docutheque-next), projet Vercel distinct, et base de donnees distincte : le site v1 n'a aucune base ; l'espace client V1 utilisera un PROJET SUPABASE DEDIE, separe de celui de la Docutheque (organisations, cles et RLS independantes).
- 18 routes statiques au total.

## 16. Logo definitif V-E (valide par Francois)

- Direction retenue apres iterations (patates rejetees, formes geometriques proposees) : V-E, la plus sobre, "paie et dsn" en Poppins Bold navy, "et" en gras emeraude plus petit, centre entre les deux mots sur la meme ligne de base, ".fr" en pastille ambre arrondie inclinee (esprit sticker de la reference consult-ess, seul element ludique conserve), signature "Un service de CBT CHOLEZ-PAGOTTO" centree entre la queue du p et le n final de dsn.
- Fichiers livres : logo-paie-et-dsn-final.png (fond clair), logo-paie-et-dsn-fond-sombre.png, logo-paie-et-dsn-carre.png (avatar reseaux), public/logo-paie-et-dsn.svg + variante fond sombre (texte SVG en Poppins avec repli Arial ; version vectorisee en traces a produire pour le print).
- Integration site : Poppins 500/700 chargee via next/font (variable --font-poppins), wordmark HTML du header et du footer refait a l'identique du logo (pastille .fr en badge tourne -6 deg), baseline mise a jour en "Un service de CBT CHOLEZ-PAGOTTO". Image OpenGraph regeneree dans le nouveau style (fond ivoire, logo, tagline, bande ambre, point emeraude). Favicon payslip conserve pour l'instant (lisible a 16 px) ; a remplacer si Francois prefere une declinaison du nouveau logo.
