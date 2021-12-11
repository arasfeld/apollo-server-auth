create table app_public.users (
  id uuid primary key default gen_random_uuid(),
  username citext not null unique check(length(username) >= 2 and length(username) <= 24 and username ~ '^[a-zA-Z]([_]?[a-zA-Z0-9])+$'),
  email citext not null check(email ~ '[^@]+@[^@]+\.[^@]+'),
  password_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
