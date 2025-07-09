// components/ProjectPage/LeaveProjectModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/LeaveProjectModal.module.css';
import axios from 'axios';

interface Props {
  onCancel: () => void;
  onConfirmSuccess: () => void;
  projectId: number;
  userId: number;
}

export default function LeaveProjectModal({ onCancel, onConfirmSuccess, projectId, userId }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLeaveProject = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/leave`,
        {}, // POST body 없음
        {
          headers: {
            'X-USER-ID': userId,
          },
        }
      );
      alert('프로젝트를 성공적으로 나갔습니다.');
      onConfirmSuccess(); // 성공 콜백
    } catch (err) {
      console.error('❌ 프로젝트 나가기 실패:', err);
      alert('프로젝트 나가기 중 오류가 발생했습니다.');
    }
  };


  const modal = (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>프로젝트를 나가시겠어요?</h2>
        <p className={styles.description}>프로젝트를 나가면 리스트에서 보이지 않아요.</p>
        <div className={styles.iconWrapper}>
        </div>
        <div className={styles.buttonGroup}>
            <button className={styles.leaveButton} onClick={handleLeaveProject}>
              프로젝트 나가기
            </button>          
          <button className={styles.cancelButton} onClick={onCancel}>돌아가기</button>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
