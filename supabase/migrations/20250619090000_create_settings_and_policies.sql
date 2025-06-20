-- =============================================
--  Migration: إنشاء جدول settings وسياسات RLS
--  تاريخ الإنشاء: 2025-06-19
-- =============================================

-- 1) تأكد من وجود امتداد uuid_generate_v4
create extension if not exists "uuid-ossp";

-- 2) إنشاء الجدول
create table if not exists public.settings (
    id          uuid primary key default uuid_generate_v4(),
    key         text unique not null,
    value       jsonb not null,
    created_at  timestamptz default now(),
    updated_at  timestamptz default now()
);

-- 3) Trigger لتحديث updated_at تلقائياً
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on public.settings;
create trigger trg_set_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

-- 4) تفعيل RLS وسياسات القراءة/الكتابة
alter table public.settings enable row level security;

-- سياسة قراءة عامة (أي مستخدم يمكنه select)
create policy "settings_public_read"
  on public.settings
  for select
  using (true);

-- سياسة إدخال/تحديث مقيّدة (للمستخدمين المصرّح لهم)
-- إذا كنت تريد السماح لكل المستخدمين Authenticated:
create policy "settings_authenticated_write"
  on public.settings
  for all
  to authenticated
  using (true)
  with check (true);

-- إذا كنت لا تريد سوى عمليات من الخدمة الخلفية، علّق السياسة أعلاه واحصرها على role service_role.
-- تعليق:
-- alter policy "settings_authenticated_write" on public.settings rename to settings_authenticated_write_disabled;

-- 5) فهرس على col key لتسريع البحث
create unique index if not exists settings_key_idx on public.settings (key);

-- =============================================
--  نهاية السكربت
-- ============================================= 