'use client';

import React from 'react';
import styles from '../../styles/ChangeModal.module.css'

interface ChangeModalProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function ChangeModal({ onSave, onCancel }: ChangeModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>프로젝트로 돌아가시겠어요?</h2>
        <p className={styles.subtitle}>저장되지 않는 내용은 삭제될 수 있어요.</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            돌아가기
          </button>
          <button className={styles.save} onClick={onSave}>
            계속 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
