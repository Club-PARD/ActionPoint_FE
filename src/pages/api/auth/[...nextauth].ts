// /pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // 분리한 경우

export default NextAuth(authOptions);
