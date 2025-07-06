'use client';

import axios from 'axios';
import Image from 'next/image';
import styles from '../../styles/LeaveProjectButton.module.css';

export default function LeaveProjectButton() {
  const handleLeave = async () => {
    if (!confirm('정말 프로젝트를 나가시겠습니까?')) return;

    try {
      const res = await axios.post('/api/project/leave');
      if (res.status === 200) {
        alert('프로젝트를 나갔습니다.');
        // window.location.href = '/projects';
      }
    } catch (err) {
      alert('나가기 실패');
    }
  };

  return (
    <button onClick={handleLeave} className={styles.button}>
      <Image src="/leave.svg" alt="leave icon" width={20} height={20} />
      <span className={styles.leaveproject}>프로젝트 나가기</span>
    </button>
  );
}
