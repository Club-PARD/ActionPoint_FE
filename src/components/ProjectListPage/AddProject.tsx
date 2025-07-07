'use client';

import { useState } from 'react';
// import XButton from './XButton';
import CancelButton from './CancelButton';
import GenerateCodeButton from './GenerateCodeButton';
import styles from '../../styles/AddProject.module.css';
import Image from 'next/image';

interface AddProjectProps {
  onClose: () => void;
}

export default function AddProject({ onClose }: AddProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [copyMessageVisible, setCopyMessageVisible] = useState(false); // ✅ 복사 메시지 상태

  const handleButtonClick = () => {
    if (!projectTitle.trim()) {
      alert('프로젝트명을 입력해주세요.');
      return;
    }

    if (!isCodeGenerated) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedCode(code);
      setIsCodeGenerated(true);
    } else {
      onClose();
    }
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopyMessageVisible(true);
      setTimeout(() => setCopyMessageVisible(false), 2000); // 2초 후 숨기기
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.contentArea}>
          <h2 className={styles.heading}>프로젝트 생성하기</h2>

          <label className={styles.label}>프로젝트명</label>

          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="프로젝트 제목을 입력해주세요."
            maxLength={10}
            className={styles.input}
            disabled={isCodeGenerated}
          />

          <div className={styles.generatedSection}>
            <label className={styles.label2}>
              프로젝트 참여 코드
              <span className={styles.helperText}> * 복사를 통해 프로젝트를 공유해봐요.</span>
            </label>

            <div className={styles.codeWrapper}>
              <div className={styles.inputCodeContainer}>
                <input
                  type="text"
                  readOnly
                  value={generatedCode ?? ''}
                  placeholder="코드를 생성중입니다."
                  className={styles.inputCode}
                  onClick={handleCopyCode}
                />
                <button
                  type="button"
                  className={styles.copyIcon}
                  onClick={handleCopyCode}
                >
                  <Image src="./copy.svg" alt="copy" width={18} height={18} />
                </button>
              </div>

              {/* ✅ 복사 메시지 */}
              {copyMessageVisible && (
                <div className={styles.copyMessage}>클립보드에 추가되었습니다.</div>
              )}
            </div>
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
    </div>
  );
}
