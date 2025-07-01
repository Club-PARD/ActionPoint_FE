'use client';

import { useState } from 'react';
import AddProject from './AddProject';

export default function ProjectCreateButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        className="bg-white text-black border border-gray-300 px-4 py-2 rounded"
        onClick={() => setShowPopup(true)}
      >
        프로젝트 생성
      </button>

      {showPopup && <AddProject onClose={() => setShowPopup(false)} />}
    </>
  );
}
