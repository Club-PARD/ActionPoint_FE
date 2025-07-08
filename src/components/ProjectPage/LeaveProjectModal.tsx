// components/ProjectPage/LeaveProjectModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/LeaveProjectModal.module.css';

interface Props {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LeaveProjectModal({ onCancel, onConfirm }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modal = (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>프로젝트를 나가시겠어요?</h2>
        <p className={styles.description}>프로젝트를 나가면 리스트에서 보이지 않아요.</p>
        <div className={styles.iconWrapper}>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.leaveButton} onClick={onConfirm}>프로젝트 나가기</button>
          <button className={styles.cancelButton} onClick={onCancel}>돌아가기</button>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
