# paie-et-dsn.fr

Site vitrine du service d'externalisation de la paie et des DSN du Cabinet Cholez-Pagotto.

Projet independant du site cholez-pagotto.fr (repo SYPA-ASSO/docutheque-next), mais construit sur la meme base technique.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript strict (0 erreur tsc)
- Tailwind CSS v4
- Polices : Bricolage Grotesque (titres) + Figtree (texte) via next/font
- 100 % statique : aucune base de donnees, aucun cookie, aucun formulaire

## Charte graphique

| Role | Couleur |
|---|---|
| Fond | ivoire #FAFAF7 |
| Titres / fonds sombres | navy #0F2544 |
| Action principale | emeraude #00A878 (fonce #007A58) |
| Accent / eyebrows | ambre #E8A020 |
| Texte courant | #33415C |

## Demarrage local

```bash
npm install
npm run dev
```

## Controles avant commit

```bash
npm run typecheck
npm run build
```

## Deploiement (GitHub + Vercel)

1. Creer le repo sur GitHub (ex. SYPA-ASSO/paie-et-dsn) puis :

```bash
git init
git add .
git status
git commit -m "Initial commit: landing paie-et-dsn v1"
git branch -M main
git remote add origin https://github.com/SYPA-ASSO/paie-et-dsn.git
git push -u origin main
```

2. Sur vercel.com : Add New Project, importer le repo, framework detecte automatiquement (Next.js), deployer.

2 bis. Formulaire de contact : dans Vercel > Settings > Environment Variables, ajouter :
   - BREVO_API_KEY : cle API Brevo du cabinet (Brevo > SMTP & API > cles API)
   - CONTACT_TO_EMAIL : adresse de reception des demandes (jamais affichee sur le site)
   Puis redeployer. Sans ces variables, le formulaire repond "pas encore configure".

3. Rattacher le domaine (NDD actuellement chez Hostinger) : Project Settings > Domains > ajouter `paie-et-dsn.fr` et `www.paie-et-dsn.fr` (redirection www vers apex). Puis dans hPanel Hostinger > Domaines > paie-et-dsn.fr > DNS :
   - modifier l'enregistrement A de l'apex (@) vers `76.76.21.21` (valeur a confirmer dans l'ecran Vercel)
   - modifier le CNAME de `www` vers `cname.vercel-dns.com`
   - NE PAS toucher aux enregistrements MX ni aux TXT (SPF/DKIM) si la messagerie contact@paie-et-dsn.fr est ou sera hebergee chez Hostinger : seuls A et CNAME changent, le mail reste chez Hostinger
   - conserver les serveurs de noms Hostinger (pas de changement de nameservers necessaire)
   - propagation DNS : quelques minutes a 24 h ; Vercel emet le certificat SSL automatiquement

## Mise a jour mensuelle du referentiel des conventions collectives (5 minutes)

Le fichier officiel (Dares/DG Travail) est protege par un captcha : le telechargement
se fait a la main, le script fait tout le reste.
1. Ouvrir https://travail-emploi.gouv.fr/conventions-collectives-nomenclatures
2. Telecharger "Fichier de suivi historique des conventions collectives" (xlsx)
3. Dans PowerShell, a la racine du projet :
   npm install xlsx --no-save
   node scripts/maj-idcc.mjs "C:/Users/chole/Downloads/nom-du-fichier.xlsx"
4. Verifier le nombre de conventions annonce (attendu : entre 300 et 2000),
   puis git add data/idcc.json, git status, git commit -m "maj: referentiel IDCC", git push.
Automatisation possible plus tard via l'API Legifrance (PISTE, identifiants gratuits a creer).

## Espace client (Supabase dedie, separe de la Docutheque)

1. Creer un NOUVEAU projet sur supabase.com (region UE), distinct de celui de la Docutheque.
2. SQL Editor : executer l'integralite de supabase/schema.sql.
3. Storage : creer un bucket PRIVE nomme exactement "documents".
4. Vercel > Settings > Environment Variables (puis Redeploy) :
   - NEXT_PUBLIC_SUPABASE_URL (Project Settings > API)
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY (secret, jamais expose au navigateur)
5. Amorcage du premier admin (une seule fois) : Supabase > Authentication > Add user
   (email + mot de passe), puis SQL Editor :
   insert into profils (user_id, role, nom) values ('<uuid de l utilisateur>', 'admin', 'Francois');
6. Se connecter sur /espace-client avec ce compte : redirection vers /admin, ou creer
   organisations, comptes employeurs/salaries, et deposer les documents.
Tant que les variables ne sont pas posees, /espace-client affiche "ouvre prochainement".

## A faire avant mise en ligne (champs [a completer] dans les pages legales)

- [ ] Creer l'adresse contact@paie-et-dsn.fr chez Hostinger (utilisee partout sur le site)
- [ ] Mentions legales : adresse postale complete du cabinet
- [ ] Mentions legales + CGV art. 8 : assureur RC pro et numero de police
- [ ] Mentions legales + CGV art. 13 : designer le mediateur de la consommation (obligatoire, clientele particuliers employeurs) et souscrire aupres de lui
- [ ] CGS art. 7 : designer le prestataire de signature electronique
- [ ] Valider la grille du simulateur (30/40/50 min, degressivite) et les CGV/CGS dans leur ensemble (relecture juridique Francois)
- [ ] Verifier le slug data.gouv.fr et lancer manuellement le workflow maj-idcc apres le premier push
- [ ] Ajouter le lien retour depuis la carte "Paie et DSN" du hub professionnels de cholez-pagotto.fr
