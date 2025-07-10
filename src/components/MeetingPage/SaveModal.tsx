'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../styles/ChangeModal.module.css';

interface SaveModalProps {
    onSave: () => void;
  onCancel: () => void;
}

export default function SaveModal({ onCancel }: SaveModalProps) {
  const router = useRouter(); 

  const handleGoNext = () => {
    router.push('/NextMeetingPage'); // ✅ 다음 페이지로 이동
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <Image src="/check.svg" alt="체크 아이콘" width={48} height={48} />
        </div>
        <h2 className={styles.title}>회의록을 저장했어요!</h2>
        <p className={styles.subtitle}>액션포인트를 작성해보아요</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            취소
          </button>
          <button className={styles.save} onClick={handleGoNext}>
            작성하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}

