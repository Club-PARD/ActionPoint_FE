'use client';

import { useState } from 'react';
import AddProject from './ProjectListPage/AddProject';
import styles from '../styles/ProjectCreateButton.module.css';

export default function ProjectCreateButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        className={styles.createButton}
        onClick={() => setShowPopup(true)}
      >
        프로젝트 생성
      </button>

      {showPopup && <AddProject onClose={() => setShowPopup(false)} />}
    </>
  );
}
