'use client';

import React from 'react';
import styles from '../../styles/ChangeModal.module.css'
import Router from 'next/router';


interface ChangeModalProps{
  onSave: () => void;
  onCancel: () => void;
}

export default function ReturnModal({onCancel }: ChangeModalProps) {

  const handleGoNext = () => {
    Router.push('/NextMeetingPage'); // ✅ 다음 페이지로 이동
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
         <h2 className={styles.title}>변경사항을 저장하시겠어요?</h2>
        <p className={styles.subtitle}>저장되지 않는 내용은 삭제될 수 있어요.</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            저장하지 않음
          </button>
          <button className={styles.save} onClick={handleGoNext}>
            작성하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
