'use client';

import { useState } from 'react';
import XButton from './XButton';
import CancelButton from './CancelButton';
import GenerateCodeButton from './GenerateCodeButton';
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
        <div className={styles.contentArea}>
          <h2 className={styles.heading}>프로젝트 생성하기</h2>

          <label className={styles.label}>프로젝트명</label>

          {/* 프로젝트 제목 */}
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="프로젝트 제목을 입력해주세요."
            maxLength={10} 
            className={styles.input}
          />

          {/* 프로젝트 코드 서버한테서 받아오기, 지금 더미 랜덤 값 */}
          {isCodeGenerated && (
            <div className={styles.generatedSection}>
              <label className={styles.label2}>
                프로젝트 참여 코드
                <span className={styles.helperText}> * 복사를 통해 프로젝트를 공유해봐요.</span>
              </label>

              <div className={styles.codeWrapper}>
              <input
                type="text"
                readOnly
                value={generatedCode ?? ''}
                className={styles.inputCode}
                onClick={() => {
                  if (generatedCode) navigator.clipboard.writeText(generatedCode);
                }}
              />
              </div>
            </div>
          )}
        </div>

        <div className={styles.buttonRow}>
          <CancelButton onClose={onClose} />
          <GenerateCodeButton
            isCodeGenerated={isCodeGenerated}
            onClick={handleButtonClick}
          />          
        </div>
        
      </div>
    </div>
  );
}
