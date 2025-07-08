// components/ProjectPage/ProjectSettingsPanel.tsx
'use client';

import CopyCodeButton from './CopyCodeButton';
import LeaveProjectButton from './LeaveProjectButton';
import styles from '../../styles/ProjectSettingPannel.module.css';

interface Props {
  onClose: () => void;
}

export default function ProjectSettingsPanel({ onClose }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.content}>
        <CopyCodeButton />
        <LeaveProjectButton />
      </div>
    </div>
  );
}
