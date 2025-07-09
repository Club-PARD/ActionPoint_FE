'use client';

import styles from '../styles/ProjectCreateButton.module.css';

interface ProjectCreateButtonProps {
  onClick: () => void;
}

export default function ProjectCreateButton({ onClick }: ProjectCreateButtonProps) {
  return (
    <button
      className={styles.createButton}
      onClick={onClick}
    >
      프로젝트 생성
    </button>
  );
}
