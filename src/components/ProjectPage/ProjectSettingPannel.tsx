'use client';

import Image from 'next/image';
import CopyCodeButton from './CopyCodeButton';
import LeaveProjectButton from './LeaveProjectButton';
import styles from '../../styles/ProjectSettingPannel.module.css';

interface Props {
  onClose: () => void;
}

export default function ProjectSettingsPanel({ onClose }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>프로젝트 설정</h2>
        <button onClick={onClose} className={styles.closeButton}>
          <Image src="/XButton.svg" alt="leave icon" width={24} height={24} />
        </button>
      </div>
      <div className={styles.content}>
        <CopyCodeButton />
        <LeaveProjectButton />
      </div>
    </div>
  );
}
