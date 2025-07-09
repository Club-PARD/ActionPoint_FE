'use client';

import { useState } from 'react';
// import XButton from './XButton';
import CancelButton from './CancelButton';
import ParticipantButton from './ParticipantButton';
import styles from '../../styles/ParticipateProject.module.css';

interface ParticipateProjectProps {
  onClose: () => void;
}

export default function ParticipateProject({ onClose }: ParticipateProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = (code: string) => {
    if (!code.trim()) {
      alert('참여 코드를 입력해주세요.');

      setIsError(true); // 실패 시 에러 상태 ON
    } else {
      alert(`참여 요청한 코드: ${code}`);
      setIsError(false); // 성공 시 에러 상태 OFF
      onClose(); // 모달 닫기


    } else {
      alert(`참여 요청한 코드: ${code}`);
      onClose(); // ✅ 모달 닫기

      return;
    }

    const userId = localStorage.getItem('USERID'); // Zustand에서 관리 중이면 해당 훅 사용

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post(
        'https://actionpoint.store/project/join',
        { projectCode: code },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId, // ✅ 정확한 header 키 (대소문자, 하이픈 유의)
          },
        }
      );

      alert('✅ 프로젝트 참여 성공!');
      onClose();
    } catch (error: any) {
      console.error('❌ 참여 실패:', error.response?.data || error.message);
      alert(`❌ 참여 실패: ${error.response?.data?.error || '에러 발생'}`);


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
              onChange={(e) => {
                setProjectTitle(e.target.value);
                setIsError(false); // 입력 중 에러 제거
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
              setErrorMessage={setErrorMessage} // ✅ 추가
            />
          </div>

      </div>
    </div>
  );
}
