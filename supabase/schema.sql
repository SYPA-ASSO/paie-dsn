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
