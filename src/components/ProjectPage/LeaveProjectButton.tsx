'use client';

import { useState } from 'react';
import Image from 'next/image';
import LeaveProjectModal from './LeaveProjectModal';
import styles from '../../styles/LeaveProjectButton.module.css';

interface Props {
  projectId: number;
  userId: number;
}

export default function LeaveProjectButton({ projectId, userId }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleLeaveSuccess = () => {
    window.location.href = '/ProjectListPage';
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.button}>
        <Image src="/leave.svg" alt="leave icon" width={20} height={20} />
        <span className={styles.text}>프로젝트 그룹 나가기</span>
      </button>
      {showModal && (
        <LeaveProjectModal
          onCancel={() => setShowModal(false)}
          onConfirmSuccess={handleLeaveSuccess} // ✅ 변경됨
          projectId={projectId}
          userId={userId}
        />
      )}
    </>
  );
}
