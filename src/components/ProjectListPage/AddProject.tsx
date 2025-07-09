//components/AddProject.tsx
'use client';

import { useState } from 'react';
import CancelButton from './CancelButton';
import GenerateCodeButton from './GenerateCodeButton';
import styles from '../../styles/AddProject.module.css';
import Image from 'next/image';

interface AddProjectProps {
  onClose: () => void;
  onProjectCreated: () => void;
}

export default function AddProject({ onClose, onProjectCreated }: AddProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [copyMessageVisible, setCopyMessageVisible] = useState(false);

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopyMessageVisible(true);
      setTimeout(() => setCopyMessageVisible(false), 3000);
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
                  <Image src="/copy.svg" alt="copy" width={18} height={18} />
                </button>

                {copyMessageVisible && (
                  <div className={styles.copyMessage}>클립보드에 추가되었습니다.</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.buttonRow}>
            <CancelButton onClose={onClose} />
            <GenerateCodeButton
              isCodeGenerated={isCodeGenerated}
              projectName={projectTitle}
              onCodeGenerated={(code) => {
                setGeneratedCode(code);
                setIsCodeGenerated(true); // 코드가 생성됐다는 상태만 바꿔줌
              }}
              onClose={onClose} // 확인 누르면 닫힘
              onProjectCreated={onProjectCreated} // 리스트 갱신
            />

          </div>
        </div>
      </div>
    </div>
  );
}
