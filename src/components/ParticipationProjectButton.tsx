'use client';

import { useState } from 'react';
import ParticipateProject from './ParticipateProject';

export default function ParticipationProjectButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        className="bg-white text-black border border-gray-300 px-4 py-2 rounded"
        onClick={() => setShowPopup(true)}
      >
        프로젝트 참여
      </button>

      {showPopup && <ParticipateProject onClose={() => setShowPopup(false)} />}
    </>
  );
}
