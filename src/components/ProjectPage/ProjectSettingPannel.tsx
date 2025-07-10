'use client';

import CopyCodeButton from './CopyCodeButton';
import LeaveProjectButton from './LeaveProjectButton';
import styles from '../../styles/ProjectSettingPannel.module.css';

interface ProjectSettingsPanelProps {
  onClose: () => void;
  projectCode: string;
  projectId: number;
  userId: number;
}

export default function ProjectSettingsPanel({
  projectCode,
  projectId,
  userId
}: ProjectSettingsPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.content}>
        <CopyCodeButton code={projectCode} />
        <LeaveProjectButton projectId={projectId} userId={userId} />
      </div>
    </div>
  );
}
