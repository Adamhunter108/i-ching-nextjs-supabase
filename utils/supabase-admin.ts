import { createClient } from '@supabase/supabase-js';
// import Stripe from 'stripe';

// import { stripe } from './stripe';
import { toDateTime } from './helpers';

import { Customer, UserDetails, Price, Product } from 'types';
import type { Database } from 'types_db';

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin priviliges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

