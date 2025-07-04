'use client';

import { useState } from 'react';
import XButton from './XButton';
import CancelButton from './CancelButton';
import styles from '../../styles/AddProject.module.css';

interface AddProjectProps {
  onClose: () => void;
}

export default function AddProject({ onClose }: AddProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false); // 버튼 상태 전환용

  const handleButtonClick = () => {
    if (!projectTitle.trim()) {
      alert('프로젝트명을 입력해주세요.');
      return;
    }

    if (!isCodeGenerated) {
      // 코드 생성 (임시 - 나중에 서버로 대체)
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedCode(code);
      setIsCodeGenerated(true); // 상태 변경
    } else {
      // 코드 생성 후 확인 누르면 모달 닫기
      onClose();
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <XButton onClick={onClose} />

        <h2 className={styles.heading}>프로젝트 추가하기</h2>

        <label className={styles.label}>프로젝트명</label>

        {/* 프로젝트 제목 */}
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="프로젝트 제목을 입력해주세요."
          className={styles.input}
        />

        {/* 프로젝트 코드 서버한테서 받아오기, 지금 더미 랜덤 값 */}
        {generatedCode && (
          <div className={styles.generatedBlock}>
            <div className={styles.codeWrapper}>
              <input
                type="text"
                readOnly
                value={generatedCode}
                className={styles.inputCode}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                }}
                className={styles.copyButton}
              >
                📋
              </button>
            </div>
          </div>
          )}

        {/* 코드 생성 버튼 컴포 필요 */}
        <div className={styles.buttonRow}>
          <button
            onClick={handleButtonClick}
            className={`${styles.actionButton} ${isCodeGenerated ? styles.confirmed : ''}`}
          >
            {/* 확인 버튼을 누르면 서버한테 다시 get을 받아서 프로젝트 갱신 */}
            {isCodeGenerated ? '확인' : '코드 생성'}
          </button>

          {/* 취소 버튼 */}
          <CancelButton onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
