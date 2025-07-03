'use client';

import styles from '../../styles/CancelButton.module.css';

interface CancelButtonProps {
  onClose: () => void;
}

export default function CancelButton({ onClose }: CancelButtonProps) {
  return (
    <button
      onClick={onClose} // 바로 실행
      className={styles.button}
    >
      취소
    </button>
  );
}
