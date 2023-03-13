import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, password, username } = req.body;

  if (!email || !name || !password || !username) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const hashedPassword = await hash(password, 10);

  try {
    const { data, error } = await supabase
      .from('iching.users')
      .insert([{ email, name, password: hashedPassword, username }])
      .single();

    if (error) {
      throw error;
    }

    const { id } = data;

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([{ user_id: id }])
      .single();

    if (profileError) {
      throw profileError;
    }

    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert([{ id: uuidv4(), user_id: id }])
      .single();

    if (customerError) {
      throw customerError;
    }

    return res.status(200).json({ id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user' });
  }
}
