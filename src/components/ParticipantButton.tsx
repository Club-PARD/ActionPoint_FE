'use client';

import styles from './ParticipantButton.module.css';

interface ParticipantButtonProps {
  projectTitle: string;
  onClick: (code: string) => void;
}

export default function ParticipantButton({ projectTitle, onClick }: ParticipantButtonProps) {
  return (
    <button
      onClick={() => onClick(projectTitle)}
      className={styles.button}
    >
      참여
    </button>
  );
}
