'use client';

import { useState } from 'react';
import CancelButton from './CancelButton';
import ParticipantButton from './ParticipantButton';
import styles from '../../styles/ParticipateProject.module.css';
import axios from 'axios';

interface ParticipateProjectProps {
  onClose: () => void;
}

export default function ParticipateProject({ onClose }: ParticipateProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async (code: string) => {
    if (!code.trim()) {
      alert('❗ 참여 코드를 입력해주세요.');
      setIsError(true);
      return;
    }

    const userId = localStorage.getItem('USERID'); // ✅ Zustand 대신 localStorage 사용 중
    if (!userId) {
      alert('❗ 로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post(
        'https://actionpoint.store/project/join',
        { projectCode: code },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId,
          },
        }
      );

      alert('✅ 프로젝트 참여 성공!');
      onClose();
    } catch (error: any) {
      // console.error('❌ 참여 실패:', error.response?.data || error.message);
      setIsError(true);
      // setErrorMessage(error.response?.data?.error || '에러 발생');
      // alert(`❌ 참여 실패: ${errorMessage}`);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2 className={styles.label}>프로젝트 참여하기</h2>
        <h3 className={styles.inputCode}>프로젝트 코드 입력</h3>
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => {
            setProjectTitle(e.target.value);
            setIsError(false);
          }}
          placeholder="코드를 입력해주세요"
          className={`${styles.input} ${isError ? styles.inputError : ''}`}
        />

        <div className={styles.buttonRow}>
          <CancelButton onClose={onClose} />
          <ParticipantButton
            projectTitle={projectTitle}
            onClose={onClose}
            setIsError={setIsError}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </div>
    </div>
  );
}
