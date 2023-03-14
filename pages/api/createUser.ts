import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    return res.status(200).json({ id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating user' });
  }
}
