-- Custom types
create type public.app_permission as enum (
  'manuscript.delete',
  'channels.delete',
  'messages.delete'
);
create type public.app_role as enum ('admin', 'author', 'editor', 'referee');
create type public.user_status as enum ('ONLINE', 'OFFLINE');
-- USERS
create table public.users (
  id uuid not null primary key,
  -- UUID from auth.users
  username text,
  status user_status default 'OFFLINE'::public.user_status
);
comment on table public.users is 'Identity data for each user.';
comment on column public.users.id is 'References the internal Auth user.';
-- CHANNELS
create table public.channels (
  id bigint generated by default as identity primary key,
  inserted_at timestamp with time zone default timezone('est'::text, now()) not null,
  slug text not null unique,
  created_by uuid references public.users not null
);
comment on table public.channels is 'Message topics and groups.';
-- MESSAGES
create table public.messages (
  id bigint generated by default as identity primary key,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  message text,
  user_id uuid references public.users not null,
  channel_id bigint references public.channels on delete cascade not null
);
comment on table public.messages is 'Individual user messages sent to one or more channels.';
-- USER ROLES
create table public.user_roles (
  id bigint generated by default as identity primary key,
  user_id uuid references public.users on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
comment on table public.user_roles is 'Application roles assigned to a user, if any.';
-- ROLE PERMISSIONS
create table public.role_permissions (
  id bigint generated by default as identity primary key,
  role app_role not null,
  permission app_permission not null,
  unique (role, permission)
);
comment on table public.role_permissions is 'Application permissions for each role.';
-- authorize with role-based access control (RBAC)
create function public.authorize(
  requested_permission app_permission,
  user_id uuid
) returns boolean as $$
declare bind_permissions int;
begin
select count(*)
from public.role_permissions
  inner join public.user_roles on role_permissions.role = user_roles.role
where role_permissions.permission = authorize.requested_permission
  and user_roles.user_id = authorize.user_id into bind_permissions;
return bind_permissions > 0;
end;
$$ language plpgsql security definer;
-- Secure the tables
alter table public.users enable row level security;
alter table public.channels enable row level security;
alter table public.messages enable row level security;
alter table public.user_roles enable row level security;
alter table public.role_permissions enable row level security;
create policy "Allow logged-in read access" on public.users for
select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.users for
insert with check (auth.uid() = id);
create policy "Allow individual update access" on public.users for
update using (auth.uid() = id);
create policy "Allow logged-in read access" on public.channels for
select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.channels for
insert with check (auth.uid() = created_by);
create policy "Allow individual delete access" on public.channels for delete using (auth.uid() = created_by);
create policy "Allow authorized delete access" on public.channels for delete using (authorize('channels.delete', auth.uid()));
create policy "Allow logged-in read access" on public.messages for
select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.messages for
insert with check (auth.uid() = user_id);
create policy "Allow individual update access" on public.messages for
update using (auth.uid() = user_id);
create policy "Allow individual delete access" on public.messages for delete using (auth.uid() = user_id);
create policy "Allow authorized delete access" on public.messages for delete using (authorize('messages.delete', auth.uid()));
create policy "Allow individual read access" on public.user_roles for
select using (auth.uid() = user_id);
-- Send "previous data" on change
alter table public.users replica identity full;
alter table public.channels replica identity full;
alter table public.messages replica identity full;
-- inserts a row into public.users and assigns roles
create function public.handle_new_user() returns trigger as $$
declare is_admin boolean;
begin
insert into public.users (id, username)
values (new.id, new.email);
select count(*) = 1
from auth.users into is_admin;
-- WARNING: For demo purposes only. This code will assign arbitrary user roles
-- upon registration when adding +role to your aps.org email. (I.E.
-- registering amiller+admin@aps.org will register this user with an admin role)
if position('+admin@aps.org' in new.email) > 0 then
insert into public.user_roles (user_id, role)
values (new.id, 'admin');
elsif position('+editor@aps.org' in new.email) > 0 then
insert into public.user_roles (user_id, role)
values (new.id, 'editor');
elsif position('+referee@aps.org' in new.email) > 0 then
insert into public.user_roles (user_id, role)
values (new.id, 'referee');
end if;
return new;
end;
$$ language plpgsql security definer;
-- trigger the function every time a user is created
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.handle_new_user();
/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
begin;
-- remove the realtime publication
drop publication if exists supabase_realtime;
-- re-create the publication but don't enable it for any tables
create publication supabase_realtime;
commit;
-- add tables to the publication
alter publication supabase_realtime
add table public.channels;
alter publication supabase_realtime
add table public.messages;
alter publication supabase_realtime
add table public.users;
-- DUMMY DATA
-- insert into public.users (id, username)
-- values (
--     '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e',
--     'amiller+admin'
--   );
-- insert into public.channels (slug, created_by)
-- values ('public', '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'),
--   (
--     'announcements',
--     '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'
--   );
-- insert into public.messages (message, channel_id, user_id)
-- values (
--     'Hello World 👋',
--     1,
--     '8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e'
--   );
-- insert into public.role_permissions (role, permission)
-- values ('admin', 'channels.delete'),
--   ('admin', 'messages.delete'),
--   ('editor', 'channels.delete'),
--   ('editor', 'messages.delete'),
--   ('referee', 'messages.delete');
