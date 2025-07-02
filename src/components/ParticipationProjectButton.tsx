'use client';

import { useState } from 'react';
import ParticipateProject from './ParticipateProject';
import styles from './ParticipationProjectButton.module.css';

export default function ParticipationProjectButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        className={styles.participationButton}
        onClick={() => setShowPopup(true)}
      >
        프로젝트 참여
      </button>

      {showPopup && <ParticipateProject onClose={() => setShowPopup(false)} />}
    </>
  );
}
