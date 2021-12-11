-- Some extensions require superuser privileges, so we create them first.
create extension if not exists citext with schema public;
create extension if not exists "uuid-ossp" with schema public;
commit;

/*
 * Since this is our first migration it's defining the entire database,
 * so we first drop anything that may have previously been created
 * (app_public/app_private) so that we can start from scratch.
 */
drop schema if exists app_public cascade;
drop schema if exists app_private cascade;
