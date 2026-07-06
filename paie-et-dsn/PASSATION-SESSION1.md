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

## 17. Validations Francois (perimetre PE, simulateur) et deploiement

- Particuliers employeurs, perimetre valide : le cabinet NE FAIT PAS la declaration CESU, le client s'en occupe (canal declaratif inclus). Offre = calcul mensuel des elements (salaire, CP, majorations, indemnites), chiffres prets a reporter dans la declaration CESU du client, contrats et avenants, documents d'embauche et de fin de contrat, suivi du minimum conventionnel. Carte d'accueil, page /particuliers-employeurs (intro, inclus, FAQ, metadata) mises a jour en ce sens.
- Simulateur valide et ajuste : temps de traitement 40/50/60 minutes (prix unitaires de base : courante 15,50 EUR, particularites 19 EUR, complexe 23 EUR le bulletin, soit 23 EUR/h x temps), degressivite inchangee (0,97/0,94/0,90/0,85), curseur plafonne a 20 bulletins, position 21 = "21 et plus" -> sur devis personnalise.
- Classement CCN 51 / CCN 66 / hospitalisation privee en "particularites" : justification donnee a Francois (conges trimestriels CCN 66, grilles a coefficients/points et reprises d'anciennete, primes specifiques dont prime decentralisee CCN 51 et revalorisations type Segur, sujetions nuit/dimanche/ferie et internat) ; pas de caisse externe type conges payes du batiment donc pas "complexe". A remonter en complexe si les temps reels de production le justifient (un deplacement d'une ligne dans Simulateur.tsx).
- Deploiement : repo confirme https://github.com/SYPA-ASSO/paie-dsn.git ; dossier local C:/Users/chole/paie-dsn (vide, a remplir avec le contenu du zip, dossier paie-et-dsn/ -> racine du repo). Vercel : rien a preparer, import du repo dans le dashboard Vercel apres le premier push (Add New Project), aucune variable d'environnement, puis chaque push redeploie automatiquement.

## 18. Lot d'ajustements post-deploiement Vercel (livre, avant/apres bascule NDD)

- CCN, traitement urgent : nouvelle version de scripts/maj-idcc.mjs qui scanne la page officielle des nomenclatures de travail-emploi.gouv.fr (le lien du xlsx Dares/DGT change chaque mois), telecharge et parse le fichier, et fusionne data/idcc-fusions.json (2111/2395 -> 3239, 0054/0650 -> 3248, conservees pour le maillage car la liste officielle ne contient que les conventions en vigueur). Garde-fou < 300 conventions inchange. Sources ecartees apres verification : kali-data SocialGouv (49 conventions seulement), addok-idcc (fige en 2019, contient encore 2111/2395 et pas 3239/3248). ACTION FRANCOIS : onglet Actions du repo -> "Mise a jour liste IDCC" -> Run workflow ; la liste complete (~650) alimente alors la page ET le simulateur.
- Simulateur v3 : recherche par intitule ou numero IDCC sur TOUTES les conventions en vigueur de data/idcc.json (suggestions, insensible aux accents), classement de complexite par IDCC dans une table CLASSEMENT extensible (50 classees), conventions non classees -> niveau "particularites" (50 min) par defaut, niveau applique affiche sous le champ. CTA vers /contact.
- Mise en page : suppression des max-w qui laissaient du vide a droite (intro Pourquoi accueil, intro solutions a-propos) ; a-propos limite a 2 blocs par ligne des sm ; grilles responsive verifiees.
- DPAE explicitee "(declaration prealable a l'embauche)" sur Prestations, notre-perimetre, CGV.
- Etapes 2 et 3 + FAQ DSN : ajout des 3 cas de validation expresse (premier mois, soldes de tout compte, regularisations) et "dans ce delai (hors cas a validation expresse)".
- Cartes TPE-PME et Professions liberales : listes terminees par "...".
- Hero : mois du bulletin dynamique = mois N-1 (composant client MoisPaie, calcule navigateur, aucun redeploiement requis).
- E-mail supprime de TOUT le site (verification grep : zero adresse) : CTA accueil -> /contact, schema.org sans email, mentions/politique/CGV renvoient au formulaire.
- Formulaire de contact livre : 6 types de demande ; champs devis (SIRET, nom, prenom, tel, adresse siege, effectif, CCN, message) ; case consentement obligatoire avec asterisque et lien politique de confidentialite ; honeypot anti-spam ; API route /api/contact via Brevo. VARIABLES VERCEL A CREER : BREVO_API_KEY et CONTACT_TO_EMAIL (jamais affichee), puis redeployer. Le site n'est plus 100 % statique (1 route dynamique).
- Mentions legales : textes exacts de Francois appliques (editeur CBT CHOLEZ-PAGOTTO CHOLEZ Francois E.I., contact via formulaire, directeur de publication, "perimetre enonce par l'ordonnance", "Par ailleurs, Francois CHOLEZ intervient...", hebergement Vercel seul). POINT JURIDIQUE : le telephone est MAINTENU car obligatoire (LCEN art. 6-III : l'editeur professionnel doit indiquer un numero de telephone), mention justificative ajoutee ; a retirer uniquement si Francois assume le risque.
- Politique de confidentialite : donnees du formulaire detaillees (dont SIRET/adresse/effectif/CCN), cookies d'authentification de l'espace client annonces, droits exercables via le formulaire.
- Section Tarifs accueil : bloc "En option, avec ou sans forfait de paie" avec les 2 formules (109,90 / 229,90 EUR par mois) et renvoi vers /veille-sociale-rh.
- Blog : schema.org Blog + BlogPosting sur l'index, BreadcrumbList index et article. Pret a recevoir les contenus de Francois (chaque article : page + entree lib/articles.ts).
- Backlog confirme : espaces clients + back-office admin avec uploads (factures, bulletins, justificatifs) = prochain gros chantier ; menu a revoir apres reactualisation ; apercus HTML locaux non maintenus desormais (verification directe sur Vercel).

## 19. Espace client V1, page pedagogique, correctifs contact/perimetre (livre)

- Contact : h1 "Contactez le cabinet" + intro universelle, bloc "Le cabinet" supprime, metadata elargie. Motif "Particulier employeur" du formulaire CONSERVE volontairement : c'est un public cible du site avec une qualification differente (SIRET optionnel pour eux, requis pour les pros) ; a retirer sur simple demande.
- /notre-perimetre relu : ajout de la veille sociale et conventionnelle incluse dans "ce que nous faisons", bloc CTA final centre. Aucune faute relevee, references verifiees (ord. 45-2138, art. 60 loi 71-1130, jurisprudence saisie 2025).
- Analyse fiche-paie.net : leurs atouts SEO/AEO = hub de pages pedagogiques + simulateur brut/net gratuit + signal de fraicheur + avis clients. Livre en reponse : page originale /comprendre-bulletin-de-paie (structure du bulletin clarifie, net social, PAS, conservation, FAQ schema, zero reprise de leur texte). Feuille de route d'articles pour les contenus de Francois : mises a jour paie de l'annee, SMIC, plafond SS, solde de tout compte, fiche de paie apprenti, mandataire social (maillage avec l'encart dirigeants), arret de travail, droit a l'erreur Urssaf, dictionnaire de la paie. Idee V2 : simulateur brut/net gratuit (gros aimant a trafic).
- ESPACE CLIENT V1 LIVRE (Supabase dedie) :
  - supabase/schema.sql : organisations, profils (roles admin/employeur/salarie), documents (8 types dont facture et mandat), RLS lecture seule par role (employeur = son organisation ; salarie = SES bulletins uniquement ; admin = tout via fonction est_admin security definer). Toutes les ecritures passent par l'API avec la cle service.
  - /espace-client : connexion e-mail + mot de passe, redirection par role. /espace-client/employeur : mandat consultable en permanence, factures (emplacement dedie prevu aux CGV), documents de paie groupes par periode. /espace-client/salarie : ses seuls bulletins + rappel "mise a disposition, pas archivage" conforme aux CGS. /admin : creation d'organisations, creation d'utilisateurs (auth.admin), depot de documents avec affectation (organisation, type, periode, salarie destinataire pour les bulletins).
  - Telechargements via /api/documents/[id] : lecture RLS puis URL signee 60 s sur bucket prive "documents".
  - Robots : /espace-client, /admin, /api desindexes. Liens "Espace client" header (desktop + mobile) et footer.
  - MISE EN SERVICE (README section dediee) : creer le projet Supabase UE separe, executer schema.sql, creer le bucket prive "documents", poser 3 variables Vercel (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY) + redeploy, amorcer le premier admin (Add user + insert profils). Tant que non configure : message "ouvre prochainement", aucun crash.
  - V1.1 a venir : fiches de variables en ligne (saisie + import Excel/CSV + statuts + justificatifs), zip mensuel, MFA, journal des acces en table dediee, changement de mot de passe utilisateur.
- Formulaire de contact volontairement non operationnel cote Francois (variables Brevo non posees) : etat assume.

## 20. Extension espace client : offres, archives zip, espace documentaire (livre)

- MIGRATION SQL A EXECUTER par Francois : supabase/migration-2.sql dans le SQL Editor du projet paie-dsn (les installations neuves ont tout dans schema.sql). Contenu : 3 colonnes d'offres sur organisations (offre_paie, offre_essentiel, offre_copilote), type de document "archive" (zip), table ressources avec RLS par niveau d'abonnement (essentiel visible des abonnes Essentiel et Copilote ; copilote reserve au Copilote ; lecture par les comptes role employeur de dossiers abonnes).
- Zip des bulletins a un employeur : nouveau type "Archive mensuelle (zip)" dans le formulaire de depot admin, affiche dans l'espace employeur groupe par periode. L'admin fabrique le zip localement (macompta) et le depose.
- Client abonnement sans paie : meme mecanique que tout dossier, creer une organisation (= dossier client) avec la ou les offres cochees, un compte role employeur rattache, puis deposer ses factures dans son espace. Le role "employeur" vaut "titulaire du dossier client".
- Vue par thematique dans /admin : section "Repartition des dossiers clients par offre" (3 cartes Paie / Essentiel / Copilote avec la liste des dossiers), badges d'offres sur chaque carte organisation, offres cochables a la creation d'organisation. NOTE : la modification des offres d'une organisation EXISTANTE se fait pour l'instant dans Supabase (Table Editor > organisations > cocher les booleens) ; action "modifier une organisation" a ajouter en V1.1.
- Espace documentaire : depot par l'admin (titre, categorie libre, type : modele / jurisprudence / dossier de synthese / procedure RH / outil / newsletter, niveau d'acces Essentiel+Copilote ou Copilote seul), table recapitulative dans /admin ; cote client, page /espace-client/ressources groupee par type avec badges (categorie, Copilote), gardee par la RLS ; carte d'acces dans l'espace employeur des dossiers abonnes ; message d'invitation vers /veille-sociale-rh pour les non-abonnes ; telechargements via /api/ressources/[id] (RLS puis URL signee 60 s, meme bucket, prefixe ressources/).
- LIMITES V1 assumees : depot des ressources une par une (import en masse type zip a prevoir pour charger les 350 modeles), pas de recherche dans l'espace documentaire (viendra avec le volume), modification/suppression via Supabase.

## 21. Bug d'espaces au rendu (signale par Francois) : cause, correction, regle permanente

- SYMPTOME : "Aucun travail comptable.La tenue" sur /notre-perimetre, "(c) 2026Cabinet" au footer.
- CAUSE PROUVEE (inspection du HTML genere dans .next) : le build de Next.js 16 supprime l'espace en TETE d'un noeud de texte qui suit une balise en ligne ou une expression JSX. Le code source contenait bien les espaces ; c'est la compilation qui les avale.
- CORRECTION : espace explicite {" "} apres la balise ou l'expression (verifie : il survit au build). 4 jonctions reelles corrigees : les 2 <strong> de notre-perimetre, l'annee du footer, titre/periode de l'espace salarie.
- VERIFICATION EXHAUSTIVE : scan automatise du HTML genere des 15 pages statiques (texte visible, motifs de collage minuscule+Majuscule et jonctions de noeuds) : zero collage residuel ; seuls faux positifs = segments du wordmark du logo, jointifs par design.
- REGLE PERMANENTE (a appliquer a tout nouveau code du projet) : jamais d'espace implicite apres </strong>, </em>, </a>, </Link> ou une expression {'{...}'} suivie de texte sur la meme ligne : toujours {" "}. Et apres toute salve de contenu, relancer le scan du HTML genere (script conserve dans cette session).

## 22. Souscription en ligne des abonnements (Stripe) : livre, activation cote Francois

- Decision : compte Stripe UNIQUE du cabinet (meme entite juridique que cholez-pagotto.fr), les 2 produits/prix Stripe seront partages par les deux sites (source de verite tarifaire unique) ; separation assuree par cle RESTREINTE dediee paie-et-dsn.fr et webhook endpoint propre. La cle ne transite jamais par la conversation ni le repo : Francois la cree et la colle directement dans Vercel.
- Livre : /api/abonnement (session Checkout mode subscription, locale fr, codes promo actives, adresse de facturation requise, metadata source+formule), /api/stripe/webhook (verification de signature ; checkout.session.completed -> e-mail Brevo au cabinet avec les actions a faire : dossier + offre + acces + facture tierce ; customer.subscription.deleted -> e-mail de resiliation), BoutonsSouscription sur /veille-sociale-rh (carte = Stripe ; virement = lien /contact?sujet=abonnement&formule=... avec sujet et message pre-remplis, meme process que cholez-pagotto.fr : facture tierce, virement a reception), page /veille-sociale-rh/merci (noindex), CGV art. 4 complete (souscription en ligne CB resiliable chaque mois ou virement a reception), README section Stripe pas a pas (produits, cle restreinte avec permissions minimales, webhook, 4 variables Vercel, protocole de test en mode Test avec carte 4242 avant bascule LIVE).
- V1 assumee : l'activation de l'offre dans l'espace client reste manuelle (e-mail de notification puis action admin) ; automatisation possible plus tard (webhook -> Supabase) une fois le rapprochement client/dossier fiabilise. Portail client Stripe (gestion CB/resiliation en self-service) : ajout simple si souhaite, la resiliation passe pour l'instant par le lien des recus Stripe ou le formulaire.
- Variables Vercel attendues : STRIPE_SECRET_KEY (rk_live restreinte), STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ESSENTIEL, STRIPE_PRICE_COPILOTE. Sans elles : boutons carte en message d'attente, voie virement operationnelle.

## 23. Conformite retractation/resiliation en ligne (19 juin 2026), onboarding client, rappel mensuel de facturation

- FONCTION DE RETRACTATION EN LIGNE (art. L. 221-21 et D. 221-5 C. conso, suite a l'article du cabinet du 22 juin 2026) : les abonnes sont normalement des pros (hors champ) mais les particuliers employeurs sont des consommateurs et les CGV promettent la retractation -> conformite implementee. Page /renoncer-au-contrat (libelle exact du decret), accessible SANS COMPTE depuis le pied de page de tout le site, disponible en permanence : declaration en ligne (nom, e-mail, formule, date, precisions), DEUX TEMPS (choix puis bouton Confirmer la retractation / Confirmer la resiliation), ACCUSE DE RECEPTION HORODATE (heure de Paris) envoye sans delai au client par e-mail + ecran de confirmation horodate. Notification cabinet avec les actions Stripe : retractation = annulation immediate + REMBOURSEMENT sous 14 jours (L. 221-24) ; resiliation = annulation en fin de periode. CGV art. 12 mis a jour (information precontractuelle : existence + emplacement de la fonctionnalite). Lien aussi dans l'espace employeur abonne. Page hors sitemap comme les autres pages legales (visibilite assuree par le footer, exigence du decret satisfaite).
- ONBOARDING CLIENT ABONNE, procede complet verifie : souscription -> e-mails automatiques (bienvenue client + notification cabinet) -> l'admin cree l'organisation avec l'offre cochee (+ Organisation), cree le compte employeur avec MOT DE PASSE PROVISOIRE (8 car. min) communique au client par canal separe -> NOUVEAU : le client peut changer son mot de passe lui-meme (bouton "Changer mon mot de passe" dans les espaces employeur ET salarie, auth.updateUser cote client) -> l'admin depose les factures mensuelles dans le dossier (+ Document > type Facture) : verifie fonctionnel pour un abonne sans paie (organisation = dossier client).
- RAPPEL MENSUEL DE FACTURATION : le webhook traite desormais invoice.paid avec billing_reason=subscription_cycle (renouvellements uniquement, pas la 1re echeance deja couverte par la notification de souscription), filtre metadata.source=paie-et-dsn.fr (metadonnees lues sur la facture ou recuperees via l'abonnement, permission Subscriptions Lecture utilisee), e-mail admin "Echeance mensuelle encaissee : facture a emettre" avec formule, client, montant. ACTION FRANCOIS REQUISE : ajouter l'evenement invoice.paid a la destination Stripe (Developpeurs > Webhooks > paie-et-dsn.fr abonnements > modifier les evenements ecoutes).
- Rappel des limites V1 deja actees : pas de portail Stripe self-service (la resiliation en ligne passe par /renoncer-au-contrat), activation d'offre manuelle par l'admin.

## 24. Regime de retractation durci : renonciation contenu numerique (L. 221-28, 13°)

- Question de Francois : peut-on supprimer le delai de retractation (risque : le client telecharge tout puis se retracte) ? Reponse mise en oeuvre : pas de suppression contractuelle possible, mais l'offre etant essentiellement du CONTENU NUMERIQUE sans support materiel, le droit s'ETEINT des le debut d'execution si triple condition (demande expresse d'execution immediate + reconnaissance expresse de la perte du droit + confirmation sur support durable, L. 221-28 13° et L. 221-13). Sans consentement valable, repli legal : retractation possible avec prorata temporis du service fourni (L. 221-25).
- Implementation : case a cocher OBLIGATOIRE avant le bouton carte (texte legal complet, bouton grise tant que non cochee), l'API refuse sans consentement, horodatage ISO du consentement trace en metadonnees Stripe (session + abonnement : consentement_execution_immediate) = preuve, e-mail de bienvenue = CONFIRMATION SUR SUPPORT DURABLE (paragraphe dedie). Parcours virement : la demande d'execution immediate est incluse dans le message pre-rempli du formulaire de contact (le cabinet doit conserver cet ecrit).
- CGV art. 12 reecrit : principe 14 jours, renonciation contenu numerique, repli prorata, fonctionnalite en ligne, resiliation a tout moment. Page /renoncer-au-contrat et AR ajustes : plus de promesse de remboursement integral inconditionnel ; l'AR annonce l'examen d'applicabilite sous 48 h ouvrees ; la notification cabinet detaille la VERIFICATION A FAIRE (metadonnee consentement presente -> droit eteint, repondre au client, geste commercial possible ; absente -> annulation + remboursement sous 14 j avec prorata possible).
- La page /renoncer-au-contrat reste obligatoire et en ligne : elle sert la resiliation et les cas ou le droit subsiste.

## 25. Souscription manuelle + audit de conformite du 05/07/2026

- SOUSCRIPTION MANUELLE (virement, telephone, papier) : nouveau bouton "Offres d'un dossier" dans la barre d'actions /admin : selection du dossier, cases prealimentees avec les offres actuelles, enregistrement (action API organisation_offres, cle service). Procede complet : creer le dossier s'il n'existe pas (+ Organisation avec offres) OU modifier ses offres, creer le compte employeur, deposer les factures. Ces abonnes manuels apparaissent dans la Repartition par offre (pas dans la section Stripe, reservee aux souscriptions CB en ligne).
- AUDIT DE CONFORMITE (05/07/2026) : CONFORME apres corrections de session. Verifie : mentions legales LCEN completes (identite, SIREN, ORIAS, telephone maintenu, hebergeur Vercel, directeur de publication), mediation de la consommation designee (CM2C, L. 612-1) dans mentions ET CGV, RGPD (politique de confidentialite, consentement formulaire, AUCUN cookie tiers ni tracker -> pas de bandeau requis, cookies d'authentification exemptes), retractation en ligne 19/06/2026 (page Renoncer au contrat ici + AR horodate), renonciation contenu numerique L. 221-28 13° (triple consentement), resiliation en ligne L. 215-1-1 (lien footer explicite "Resilier votre abonnement" ajoute + preselection via ?type=resiliation), prix TTC (mention TVA non applicable 293 B AJOUTEE sous les prix des pages tarifs et veille), CGV/CGS accessibles, perimetre d'exercice licite (ord. 45-2138, art. 60 loi 71-1130).
- CORRECTIONS D'AUDIT APPLIQUEES : suppression des renvois a la plateforme europeenne RLL/ODR dans les mentions legales et les CGV (plateforme SUPPRIMEE le 20 juillet 2025, reglement UE 2024/3228 : reference perimee), mention TVA affichee, lien resiliation footer.
- HORS SITE, a la charge de Francois : adhesion effective au dispositif CM2C a maintenir (cotisation), obligation de reception des factures electroniques (reforme septembre 2026, cote logiciel de facturation, sans impact site), accessibilite EAA (exemption micro-entreprise de services applicable).

## 26. Corpus blog : 22 articles mensuels (octobre 2024 -> juillet 2026)

- MOTEUR : lib/blog-contenu.ts (types + fusion + tri), contenus dans lib/blog-contenu-1/2/3.ts, rendu par app/blog/[slug]/page.tsx (generateStaticParams, fil d'Ariane, sommaire ancre, H2 avec ids, FAQ depliable, CTA devis, schema Article + FAQPage + BreadcrumbList avec datePublished ET dateModified, note "references a jour au..."). Les paragraphes acceptent des liens [texte](/chemin). lib/articles.ts derive desormais la liste du contenu (l'article fondateur du 2 juillet reste une page dediee). Sitemap enrichi des 22 URL avec lastModified = date de mise a jour.
- CHIFFRES VERIFIES A LA SOURCE (recherche web du 05/07/2026) : SMIC 11,88 au 01/11/2024 (arrete 23/10/2024, pas de hausse au 01/01/2025), 12,02 au 01/01/2026 (decret 2025-1228), 12,31 au 01/06/2026 (arrete 22/05/2026, 1 867,02/mois) ; plafond SS 3 925 (2025, arrete 19/12/2024) puis 4 005 (2026, arrete 22/12/2025) ; MG 4,25 et gratification stagiaires 4,50 en 2026 ; reforme reduction generale au 01/01/2026 (LFSS 2025 + decret 04/09/2025) ; IJSS plafonnees 1,4 SMIC depuis 04/2025 ; apprentis durcis pour contrats conclus a compter du 01/03/2025.
- DATES : datePublished etalees mensuellement (choix de Francois), dateModified = 05/07/2026 partout, affichage "Publie le X, Verifie et mis a jour le Y" : contenu redige a jour du droit de juillet 2026, evenements dates traites comme sujets historiques avec encadres de mise a jour. AVERTISSEMENT DONNE : domaine mis en ligne en juillet 2026, l'antidatage est detectable (Wayback, GSC) et peut peser sur la confiance ; attenue par dateModified sincere et contenu reellement a jour.
- CONTROLES : build 50 pages OK, scan anti-collage propre (echantillon), 15 liens internes tous valides (verification automatisee).
- POST-DEPLOIEMENT (indexation) : GSC resoumettre sitemap.xml ; Bing Webmaster Tools par import GSC + IndexNow optionnel ; IA : schema FAQ/Article deja en place, HTML semantique propre, pas de blocage robots des bots IA (choix assume d'ouverture).

## 27. Refonte du back-office autour du CLIENT (demande de coherence de Francois)

- CONSTAT : le vocabulaire "employeur" ne convenait pas aux abonnes purs, et le rattachement d'une souscription Stripe exigeait deux formulaires. Le role technique 'employeur' est CONSERVE en base (les RLS s'y adossent), seule la presentation change : partout, il s'affiche "client" (badge vue d'ensemble, selecteurs).
- NOUVEAU CLIENT EN UN GESTE : bouton principal "+ Nouveau client" = dossier + offres + compte d'acces en une action (API client_complet : insert organisation, createUser, insert profil ; si le compte echoue apres le dossier, message explicite pour finir via + Compte seul). SELECT DE PRE-REMPLISSAGE depuis les souscriptions Stripe actives non rattachees (nom, e-mail, formule cochee) : rattacher un abonne CB = choisir sa ligne, saisir le mot de passe provisoire, Creer.
- Barre d'actions reordonnee : + Nouveau client / + Document (Facture en premier type) / + Ressource documentaire / Offres d'un dossier / + Compte seul (libelles clairs : Client acces a tout son dossier, Salarie ses seuls bulletins, Admin cabinet) / + Dossier seul (sans acces). Aide affichee sous la table Stripe (badge Dossier a creer -> + Nouveau client).
- ESPACE CLIENT COTE ABONNE : la page (route inchangee /espace-client/employeur) devient "Espace client / Votre dossier" et n'affiche les sections mandat et documents de paie par periode QUE si l'offre paie est cochee ; factures, espace documentaire, resiliation et mot de passe toujours visibles. Un abonne pur voit donc un espace coherent avec ce qu'il a achete.
- AdminPanel.tsx entierement reecrit (fin des patchs successifs).

## 28. V1.1 : edition, suppression, pagination, import en masse

- API /api/admin, deux nouvelles actions : "modifier" (cibles : organisation nom/siret, document titre/periode, ressource titre/categorie/acces, compte nom/dossier/role) et "supprimer" (document et ressource : fichier storage + ligne ; compte : auth.admin.deleteUser, profil en cascade ; organisation : REFUSEE s'il reste des comptes rattaches, sinon fichiers storage + ligne, documents en cascade). Le doublon de dossier de Francois peut desormais etre supprime DEPUIS le back-office (plus besoin de Supabase Table Editor).
- NOUVEAU composant client components/espace/AdminSections.tsx : toutes les sections de consultation de /admin (souscriptions Stripe, repartition par offre, espace documentaire, vue d'ensemble) avec PAGINATION (Stripe 10/page, ressources 10/page, dossiers 5/page, documents d'un dossier : 8 affiches + "Voir les N autres"), EDITION EN LIGNE (mini-formulaires Modifier sur chaque ressource, document, compte, dossier) et SUPPRESSION avec confirmation navigateur. app/admin/page.tsx ne garde que la collecte des donnees.
- IMPORT EN MASSE (zip) : 7e bouton de la barre d'actions. Le zip est decompresse COTE NAVIGATEUR (jszip, nouvelle dependance npm -> npm install requis chez Francois) puis chaque fichier est poste individuellement a l'action ressource : contourne la limite de corps de requete Vercel (~4,5 Mo), aucun plafond global. Categorie = dossier de 1er niveau du zip, titre = nom de fichier nettoye (tirets/underscores -> espaces, extension retiree), type + acces choisis pour le lot, compteur de progression, rapport d'echecs, garde-fou 500 fichiers par lot, __MACOSX ignore. Les 350 modeles peuvent partir en un zip organise en dossiers-categories.
- RESTE en V1.1+ : recherche dans l'espace documentaire, fiches de variables, zip mensuel automatique, MFA, journal des acces, page de reinitialisation de mot de passe.
