'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../../styles/ChangeModal.module.css';

interface DoneModalProps {
  onSave: () => void;
  
}

export default function SaveModal({ onSave }: DoneModalProps) {

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <Image src="/check.svg" alt="체크 아이콘" width={48} height={48} />
        </div>
        <h2 className={styles.title}>회의록 작성을 완료 했어요!</h2>
        <div className={styles.buttons}>
          <button className={styles.save} onClick={onSave}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

