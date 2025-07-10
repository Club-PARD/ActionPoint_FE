'use client';

import { useState } from 'react';
import Header from "@/components/Header/Header";
import CreateMeetingButton from "@/components/ProjectPage/CreateMeetingButton";
import ProjectSettingsPanel from "@/components/ProjectPage/ProjectSettingPannel";
import styles from '../styles/NoMeetingPage.module.css';
import Image from 'next/image';

interface Props {
  projectName: string;
  projectCode: string;
  projectId: number;
  userId: number;
}

export default function NoMeetingPage({ projectName, projectCode, projectId, userId }: Props) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={styles.pageBackground}>
      <Header />

      <div className={styles.projectTitle}>
        {projectName}
        <button
          onClick={() => setShowSettings((prev) => !prev)}
          className={styles.optionsButton}
        >
          ⋮
        </button>
        {showSettings && (
          <div className={styles.settingsPanelWrapper}>
            <ProjectSettingsPanel
              onClose={() => setShowSettings(false)}
              projectCode={projectCode}
              projectId={projectId}
              userId={userId}
            />

          </div>
        )}
      </div>

      <div className={styles.content}>
        <Image
          src="/folder.svg"
          alt="폴더 아이콘"
          width={135}
          height={100}
          className={styles.folderIcon}
        />
        <p className={styles.message}>
          아직 추가된 회의 목표가 없어요<br />
          회의 목표 작성을 통해 회의 목표를 만들어보세요!
        </p>
           <CreateMeetingButton projectId={projectId} userId={userId} />
      </div>
    </div>
  );
}
