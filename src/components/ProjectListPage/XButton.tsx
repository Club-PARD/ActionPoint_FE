'use client';

import styles from '../../styles/XButton.module.css';

interface XButtonProps {
  onClick: () => void;
}

export default function XButton({ onClick }: XButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.button} // 모달 닫기용 X 버튼
    >
      X
    </button>
  );
}
