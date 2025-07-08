'use client';

import styles from '../../styles/MainPage.module.css';

interface ParticipantButtonProps {
  projectTitle: string;
  onClick: (code: string) => void;
}

export default function ParticipantButton({ projectTitle, onClick }: ParticipantButtonProps) {
  return (
    <button
      onClick={() => onClick(projectTitle)}
      className={styles.commonButton} // ✅ 동일 스타일 적용
    >
      프로젝트 참여
    </button>
  );
}
