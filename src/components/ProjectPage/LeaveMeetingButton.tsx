'use client';

import { useState } from 'react';
import Image from 'next/image'; 
import LeaveMeetingModal from './LeaveMeetingModal';
import styles from '../../styles/LeaveProjectButton.module.css';

interface Props {
  meetingId: number;  // ✅ 이거 필요함 (지금 없어요!)
  userId: number;     // ✅ 이것도 필요!
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
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
        <span className={styles.text}>삭제하기</span>
      </button>
        {showModal && (
        <LeaveMeetingModal  // ✅ 오타 수정
            onCancel={() => setShowModal(false)}
            onConfirmSuccess={handleLeaveSuccess}
            meetingId={meetingId}
            userId={userId}
        />
        )}
    </>
  );
}
