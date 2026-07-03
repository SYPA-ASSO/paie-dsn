-- Schema espace client paie-et-dsn.fr
-- A executer dans le SQL Editor du projet Supabase DEDIE (separe de la Docutheque).
-- Prerequis : creer aussi un bucket Storage PRIVE nomme "documents".

create table if not exists organisations (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  siret text,
  cree_le timestamptz not null default now()
);

create table if not exists profils (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'employeur', 'salarie')),
  organisation_id uuid references organisations(id) on delete set null,
  nom text,
  cree_le timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  salarie_user_id uuid references auth.users(id) on delete set null,
  type text not null check (type in ('bulletin', 'journal_paie', 'etat_charges', 'cr_dsn', 'facture', 'mandat', 'justificatif', 'autre')),
  periode text, -- format AAAA-MM
  titre text not null,
  chemin text not null, -- chemin dans le bucket "documents"
  cree_le timestamptz not null default now()
);

alter table organisations enable row level security;
alter table profils enable row level security;
alter table documents enable row level security;

-- Helper : l'utilisateur courant est-il admin ? (security definer pour eviter la recursion RLS)
create or replace function public.est_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profils where user_id = auth.uid() and role = 'admin'
  );
$$;

-- Lecture uniquement (toutes les ecritures passent par l'API avec la cle service)
create policy profils_soi on profils for select using (user_id = auth.uid());
create policy profils_admin on profils for select using (public.est_admin());

create policy organisations_admin on organisations for select using (public.est_admin());
create policy organisations_membre on organisations for select using (
  id in (select organisation_id from profils where user_id = auth.uid())
);

create policy documents_admin on documents for select using (public.est_admin());
create policy documents_employeur on documents for select using (
  exists (
    select 1 from profils p
    where p.user_id = auth.uid()
      and p.role = 'employeur'
      and p.organisation_id = documents.organisation_id
  )
);
create policy documents_salarie on documents for select using (
  salarie_user_id = auth.uid() and type = 'bulletin'
);
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
-- (migration-2 integree ci-dessus pour les installations neuves)
