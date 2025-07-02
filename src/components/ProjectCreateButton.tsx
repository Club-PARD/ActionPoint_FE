'use client';

import { useState } from 'react';
import AddProject from './AddProject';
import styles from './ProjectCreateButton.module.css';

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
