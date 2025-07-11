// components/ProjectPage/LeaveMeetingModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/LeaveMeetingModal.module.css';
import axios from 'axios';

interface Props {
  onCancel: () => void;
  onConfirmSuccess: () => void;
  meetingId: number;
}

export default function LeaveMeetingModal({ meetingId, onCancel, onConfirmSuccess }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    console.log('🧪 meetingId:', meetingId);

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/meetings/${meetingId}`,);
      alert('회의록이 삭제되었습니다.');
      onConfirmSuccess();
    } catch (err) {
      console.error('❌ 회의록 삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const modal = (
        <div
        onMouseDown={(e) => e.stopPropagation()}
        className={styles.overlay}
        >
          <div className={styles.modal}>
        <h2 className={styles.title}>회의록을 삭제하시겠어요?</h2>
        <p className={styles.description}>삭제된 회의록은 복구할 수 없습니다.</p>
        <div className={styles.buttonGroup}>
          <button className={styles.leaveButton} onClick={onCancel}>취소</button>
          <button className={styles.cancelButton} onClick={handleDelete}>삭제하기</button>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
