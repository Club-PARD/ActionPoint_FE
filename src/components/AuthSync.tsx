'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/stores/UserStore';
import axios from 'axios';

export default function AuthSync() {
  const { data: session } = useSession();
  const setUserId = useUserStore((state) => state.setUserId);
  const userId = useUserStore((state) => state.userId);

  useEffect(() => {
    if (!session) return;

    const fetchUserId = async () => {
      try {
        const res = await axios.get('/api/me');
        console.log('📦 받은 userId:', res.data.userId);
        setUserId(res.data.userId);
      } catch (err) {
        console.error('❌ userId 가져오기 실패:', err);
      }
    };

    fetchUserId();
  }, [session]);

  useEffect(() => {
    if (userId === null) return;

    const syncUserId = async () => {
      try {
        await axios.post('/api/sync-user', {}, {
          headers: { 'X-USER-ID': Number(userId) },
        });
        console.log('✅ userId 헤더 전송 성공');
      } catch (error) {
        console.error('❌ userId 헤더 전송 실패:', error);
      }
    };

    syncUserId();
  }, [userId]);

  return null;
}
