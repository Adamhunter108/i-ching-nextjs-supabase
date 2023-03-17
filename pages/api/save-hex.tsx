// ended up not having to do this.... whomp whomp...

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default async function saveHexHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { hexValue } = req.body;
  const { user } = req.cookies;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', user)
      .single();

    if (userError) {
      return res.status(500).json({ message: 'Error fetching user data' });
    }

    const { data: hexData, error: hexError } = await supabase.from('hex_values').insert({
      user_id: userData.id,
      hex_value: hexValue,
    });

    if (hexError) {
      return res.status(500).json({ message: 'Error saving hex value' });
    }

    return res.status(200).json({ message: 'Hex value saved successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error saving hex value' });
  }
}
