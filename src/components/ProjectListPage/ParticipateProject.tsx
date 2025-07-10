'use client';

import { useState } from 'react';
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
