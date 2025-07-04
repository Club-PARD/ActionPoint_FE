// components/GenerateCodeButton.tsx
'use client';

import styles from '../../styles/GenerateCodeButton.module.css';

interface GenerateCodeButtonProps {
  isCodeGenerated: boolean;
  onClick: () => void;
}

export default function GenerateCodeButton({
  isCodeGenerated,
  onClick,
}: GenerateCodeButtonProps) {
  return (
    <div className={styles.action}>
        <button
        onClick={onClick}
        className={`${styles.actionButton} ${isCodeGenerated ? styles.confirmed : ''}`}
        >
        {isCodeGenerated ? '확인' : '코드 생성'}
        </button>
    </div>
  );
}
