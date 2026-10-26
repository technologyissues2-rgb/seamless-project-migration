create type public.app_role as enum ('admin', 'moderator');

create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can view their own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

grant execute on function public.has_role(uuid, public.app_role) to authenticated, anon;

-- ============ SURVEY RESPONSES ============
create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  consent boolean not null default true,
  age_range text not null check (age_range in ('18-24','25-34','35-44','45+')),
  gender text check (gender in ('female','male','other','prefer_not_to_say') or gender is null),
  education_level text check (education_level in ('secondary','vocational','undergraduate','postgraduate','other','prefer_not_to_say') or education_level is null),
  employment_status text check (employment_status in ('student','employed','unemployed','self_employed','prefer_not_to_say') or employment_status is null),
  awareness_level text check (awareness_level in ('not_aware','slightly_aware','moderately_aware','very_aware')),
  health_impact_physical int check (health_impact_physical between 1 and 5),
  health_impact_mental int check (health_impact_mental between 1 and 5),
  socioeconomic_education int check (socioeconomic_education between 1 and 5),
  socioeconomic_employment int check (socioeconomic_employment between 1 and 5),
  socioeconomic_family int check (socioeconomic_family between 1 and 5),
  socioeconomic_finance int check (socioeconomic_finance between 1 and 5),
  observed_effects text[] default '{}',
  services_awareness text check (services_awareness in ('none','some','several','unsure')),
  barriers text[] default '{}',
  suggestions text check (char_length(suggestions) <= 2000),
  anon_token text not null unique,
  created_at_index timestamptz generated always as (created_at) stored
);

create index idx_survey_responses_created_at on public.survey_responses (created_at desc);
create index idx_survey_responses_age_range on public.survey_responses (age_range);

grant insert on public.survey_responses to anon, authenticated;
grant all on public.survey_responses to service_role;

alter table public.survey_responses enable row level security;

create policy "Anonymous visitors may submit valid responses"
  on public.survey_responses for insert
  to anon, authenticated
  with check (
    consent = true
    and age_range is not null
    and anon_token is not null
    and char_length(anon_token) between 10 and 64
    and char_length(coalesce(suggestions, '')) <= 2000
  );

create policy "Admins may view all survey responses"
  on public.survey_responses for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'moderator'));

create policy "Admins may delete survey responses"
  on public.survey_responses for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ============ RESEARCH PROJECTS ============
create table public.research_projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null check (char_length(title) between 1 and 300),
  description text not null default '' check (char_length(description) <= 5000),
  objectives text not null default '' check (char_length(objectives) <= 5000),
  publication_status text not null default 'draft' check (publication_status in ('draft','published')),
  created_by uuid references public.user_roles(id) on delete set null
);

grant select, insert, update, delete on public.research_projects to authenticated;
grant select on public.research_projects to anon;
grant all on public.research_projects to service_role;

alter table public.research_projects enable row level security;

create policy "Anyone may view published projects"
  on public.research_projects for select
  to anon, authenticated
  using (publication_status = 'published');

create policy "Admins may view all projects"
  on public.research_projects for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins may manage projects"
  on public.research_projects for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ RESEARCH RESOURCES ============
create table public.research_resources (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null check (char_length(title) between 1 and 300),
  description text not null default '' check (char_length(description) <= 2000),
  category text not null check (category in ('prevention','treatment','education','helpline','policy','other')),
  source_url text not null check (source_url ~* '^https?://'),
  publication_status text not null default 'draft' check (publication_status in ('draft','published')),
  created_by uuid references public.user_roles(id) on delete set null
);

create index idx_research_resources_category on public.research_resources (category);

grant select, insert, update, delete on public.research_resources to authenticated;
grant select on public.research_resources to anon;
grant all on public.research_resources to service_role;

alter table public.research_resources enable row level security;

create policy "Anyone may view published resources"
  on public.research_resources for select
  to anon, authenticated
  using (publication_status = 'published');

create policy "Admins may view all resources"
  on public.research_resources for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins may manage resources"
  on public.research_resources for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ PUBLIC AGGREGATE STATS ============
create or replace function public.get_survey_aggregates()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'total_responses', (select count(*) from public.survey_responses),
    'by_age_range', (
      select coalesce(json_object_agg(age_range, n), '{}'::json)
      from (select age_range, count(*) as n from public.survey_responses group by age_range) t
    ),
    'mean_scores', (
      select coalesce(json_build_object(
        'health_impact_physical', round(avg(health_impact_physical)::numeric, 2),
        'health_impact_mental', round(avg(health_impact_mental)::numeric, 2),
        'socioeconomic_education', round(avg(socioeconomic_education)::numeric, 2),
        'socioeconomic_employment', round(avg(socioeconomic_employment)::numeric, 2),
        'socioeconomic_family', round(avg(socioeconomic_family)::numeric, 2),
        'socioeconomic_finance', round(avg(socioeconomic_finance)::numeric, 2)
      ), '{}'::json)
      from public.survey_responses
    ),
    'awareness_distribution', (
      select coalesce(json_object_agg(awareness_level, n), '{}'::json)
      from (select awareness_level, count(*) as n from public.survey_responses where awareness_level is not null group by awareness_level) t
    ),
    'observed_effects', (
      select coalesce(json_object_agg(effect, n), '{}'::json)
      from (
        select effect, count(*) as n
        from public.survey_responses, unnest(observed_effects) as effect
        group by effect
      ) t
    ),
    'responses_by_month', (
      select coalesce(json_agg(m order by m.month), '[]'::json)
      from (
        select date_trunc('month', created_at)::date as month, count(*) as n
        from public.survey_responses
        group by 1
      ) m
    ),
    'generated_at', now()
  )
$$;

revoke all on function public.get_survey_aggregates() from public;
grant execute on function public.get_survey_aggregates() to anon, authenticated;
