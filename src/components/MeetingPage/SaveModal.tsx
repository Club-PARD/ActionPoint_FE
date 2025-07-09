'use client';

import React from 'react';
import styles from '../../styles/SaveChangesModal.module.css'

interface SaveChangesModalProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function SaveChangesModal({ onSave, onCancel }: SaveChangesModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>변경 사항을 저장하시겠어요?</h2>
        <p className={styles.subtitle}>저장하지 않은 내용은 삭제될 수 있어요.</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            저장하지 않음
          </button>
          <button className={styles.save} onClick={onSave}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
