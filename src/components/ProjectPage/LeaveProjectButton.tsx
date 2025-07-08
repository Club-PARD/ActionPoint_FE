'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import LeaveProjectModal from './LeaveProjectModal';
import styles from '../../styles/LeaveProjectButton.module.css';

export default function LeaveProjectButton() {
  const [showModal, setShowModal] = useState(false);

  const handleLeave = () => {
    axios.post('/api/project/leave')
      .then((res) => {
        if (res.status === 200) {
          alert('프로젝트를 나갔습니다.');
          window.location.href = '/projects';
        }
      })
      .catch(() => {
        alert('나가기 실패');
      });
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.button}>
        <Image src="/leave.svg" alt="leave icon" width={20} height={20} />
        <span className={styles.leaveproject}>프로젝트 나가기</span>
      </button>
      {showModal && (
        <LeaveProjectModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleLeave}
        />
      )}
    </>
  );
}
