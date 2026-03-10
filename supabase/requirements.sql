-- Schema updates for purchases, sales, expenses, stock valuation.
-- Run these in the Supabase SQL editor.

alter table if exists movements
  add column if not exists unit_cost numeric,
  add column if not exists unit_price numeric,
  add column if not exists sale_channel text,
  add column if not exists payment_type text,
  add column if not exists notes text;

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  amount numeric not null,
  note text,
  created_at timestamp with time zone default now()
);
