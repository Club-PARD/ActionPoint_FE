'use client';

import { useState } from 'react';
import XButton from './XButton';
import CancelButton from './CancelButton';
import ParticipantButton from './ParticipantButton';
import styles from '../../styles/ParticipateProject.module.css';

interface ParticipateProjectProps {
  onClose: () => void;
}

export default function ParticipateProject({ onClose }: ParticipateProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');

  const handleClick = (code: string) => {
    if (!code.trim()) {
      alert('참여 코드를 입력해주세요.');
    } else {
      alert(`참여 요청한 코드: ${code}`);
      onClose(); // 참여 후 모달 닫기
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.label}>프로젝트 참여하기</h2>
          <h3 className={styles.inputCode}> 프로젝트 코드 입력 </h3>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="코드를 입력해주세요"
              className={styles.input}
            />

          <div className={styles.buttonRow}>
            <CancelButton onClose={onClose} />
            <ParticipantButton projectTitle={projectTitle} onClick={handleClick} />
          </div>
      </div>
    </div>
  );
}
