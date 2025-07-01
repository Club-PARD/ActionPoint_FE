'use client';

import { useState } from 'react';
import XButton from './XButton';
import CodeCreateButton from './CodeCreateButton';
import CancelButton from './CancelButton';
import ParticipantButton from './ParticipantButton';

interface AddProjectProps {
  onClose: () => void;
}

export default function AddProject({ onClose }: AddProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');

  const handleClick = (code: string) => {
    if (!code.trim()) {
      alert('참여 코드를 입력해주세요.');
    } else {
      alert(`참여 요청한 코드: ${code}`);
      onClose(); // 참여 후 모달 닫기
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px] relative text-black">
        <XButton onClick={onClose} />

        <label className="block text-sm font-semibold mb-1">프로젝트 참여하기</label>

        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="프로젝트 참여할 코드를 입력해주세요."
          className="w-full bg-[#D9D9D9] text-sm text-black px-3 py-2 rounded mb-6 placeholder:text-black"
        />

        <ParticipantButton projectTitle={projectTitle} onClick={handleClick} />
        <CancelButton onClose={onClose} />
      </div>
    </div>
  );
}
