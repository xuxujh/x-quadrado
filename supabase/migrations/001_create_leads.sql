create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 120),
  email text not null check (char_length(email) between 5 and 254),
  telefone text check (telefone is null or char_length(telefone) <= 40),
  empresa text check (empresa is null or char_length(empresa) <= 120),
  area text not null check (
    area in ('dados', 'tecnologia', 'design', 'automacao', 'fotografia', 'outro')
  ),
  mensagem text not null check (char_length(mensagem) between 10 and 3000),
  privacy_acknowledged boolean not null check (privacy_acknowledged),
  privacy_acknowledged_at timestamptz not null,
  privacy_policy_version date not null,
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  source text not null default 'website_contact_form',
  status text not null default 'novo' check (
    status in ('novo', 'em_contato', 'qualificado', 'convertido', 'arquivado')
  ),
  retention_until timestamptz not null default (now() + interval '24 months'),
  check (
    (marketing_consent and marketing_consent_at is not null)
    or (not marketing_consent and marketing_consent_at is null)
  )
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_email_idx
  on public.leads (lower(email));

alter table public.leads enable row level security;

revoke all on table public.leads from public, anon, authenticated;
grant select, insert, update, delete on table public.leads to service_role;
grant usage, select on sequence public.leads_id_seq to service_role;

comment on table public.leads is
  'Leads enviados pelo formulário de contato do site X-Quadrado.';

comment on column public.leads.privacy_policy_version is
  'Versão da Política de Privacidade reconhecida no envio.';

comment on column public.leads.retention_until is
  'Data prevista para revisão ou eliminação do lead não convertido.';
