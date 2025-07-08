// pages/api/me.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.status(200).json({ userId: session.user.id });
}
