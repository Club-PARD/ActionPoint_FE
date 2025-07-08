// pages/api/sync-user.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST만 허용됩니다' });
  }

  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'userId가 없습니다' });
  }

  console.log('📦 받은 userId:', userId);

  return res.status(200).json({ message: `userId ${userId} 잘 받음!` });
}
