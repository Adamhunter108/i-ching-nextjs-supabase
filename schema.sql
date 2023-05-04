/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  -- The customer's billing address, stored in JSON format.
  billing_address jsonb,
  -- Stores your customer's payment instruments.
  payment_method jsonb
);
alter table users enable row level security;
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();



/** 
* NOTE: I added this via supabase dashboard sql editor, to use this file you need the supabase cli setup
*/
CREATE SCHEMA iching;
/** 
* I Ching - users
*/
CREATE TABLE iching.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


/** 
* I Ching - daily hex
*/
-- CREATE TABLE iching.user_daily_hexagrams (
--   user_id INTEGER REFERENCES iching.users(id) NOT NULL,
--   number_date DATE NOT NULL,
--   daily_hexagram INTEGER NOT NULL,
--   PRIMARY KEY (user_id, number_date)
-- );
-- CREATE TABLE iching.user_hexagrams (
--   user_id INTEGER REFERENCES public.users(id) NOT NULL,
--   hexagram_date DATE NOT NULL,
--   hexagram INTEGER NOT NULL,
--   PRIMARY KEY (user_id)
-- );
-- CREATE TABLE hex_values (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   user_id UUID NOT NULL REFERENCES auth.users(id),
--   hex_value INTEGER NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
-- );


-- CREATE SCHEMA IF NOT EXISTS iching;

CREATE TABLE iching.iching_readings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  reading_number INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- GRANT ALL PRIVILEGES ON TABLE iching.iching_readings TO public;
