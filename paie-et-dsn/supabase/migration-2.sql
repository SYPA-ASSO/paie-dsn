-- Migration 2 : offres par organisation, type archive, espace documentaire.
-- A executer dans le SQL Editor du projet Supabase paie-dsn (apres schema.sql).

-- 1. Offres souscrites par organisation (un dossier client peut cumuler)
alter table organisations
  add column if not exists offre_paie boolean not null default false,
  add column if not exists offre_essentiel boolean not null default false,
  add column if not exists offre_copilote boolean not null default false;

-- 2. Nouveau type de document : archive mensuelle (zip des bulletins, etc.)
alter table documents drop constraint if exists documents_type_check;
alter table documents add constraint documents_type_check check (
  type in ('bulletin','journal_paie','etat_charges','cr_dsn','facture','mandat','justificatif','archive','autre')
);

-- 3. Espace documentaire des abonnements (modeles, jurisprudences, dossiers, outils)
create table if not exists ressources (
  id uuid primary key default gen_random_uuid(),
  titre text not null,
  categorie text,
  type_ressource text not null check (
    type_ressource in ('modele','jurisprudence','dossier','procedure','outil','newsletter','autre')
  ),
  acces text not null default 'essentiel' check (acces in ('essentiel','copilote')),
  chemin text not null,
  cree_le timestamptz not null default now()
);

alter table ressources enable row level security;

create policy ressources_admin on ressources for select using (public.est_admin());

-- Lecture par les comptes clients (role employeur) selon l'offre de leur dossier :
-- les ressources "essentiel" sont visibles des abonnes Essentiel ET Copilote ;
-- les ressources "copilote" sont reservees aux abonnes Copilote.
create policy ressources_abonnes on ressources for select using (
  exists (
    select 1
    from profils p
    join organisations o on o.id = p.organisation_id
    where p.user_id = auth.uid()
      and p.role = 'employeur'
      and (
        (ressources.acces = 'essentiel' and (o.offre_essentiel or o.offre_copilote))
        or (ressources.acces = 'copilote' and o.offre_copilote)
      )
  )
);
