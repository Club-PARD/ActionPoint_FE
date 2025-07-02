'use client';

import { useState } from 'react';
import XButton from './XButton';
import CancelButton from './CancelButton';
import ParticipantButton from './ParticipantButton';
import styles from './ParticipateProject.module.css';

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
        <XButton onClick={onClose} />

        <label className={styles.label}>프로젝트 참여하기</label>

        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="프로젝트 참여할 코드를 입력해주세요."
          className={styles.input}
        />

        <ParticipantButton projectTitle={projectTitle} onClick={handleClick} />
        <CancelButton onClose={onClose} />
      </div>
    </div>
  );
}
