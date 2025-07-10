'use client';

import { signOut } from 'next-auth/react';
import styles from '@/styles/LogoutModal.module.css';

interface Props {
  onClose: () => void;
}

export default function LogoutModal({ onClose }: Props) {
  const handleConfirmLogout = async () => {
    await signOut({ callbackUrl: '/LandingPage' }); // ✅ 구글 세션도 같이 로그아웃됨
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>로그아웃 하시겠어요?</h2>
        <p className={styles.description}>
          언제든 다시 로그인해 이어서 작업할 수 있습니다.
        </p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onClose}>취소</button>
          <button className={styles.confirm} onClick={handleConfirmLogout}>로그아웃 하기</button>
        </div>
      </div>
    </div>
  );
}
