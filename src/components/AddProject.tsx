'use client';

import { useState } from 'react';
import XButton from './XButton';
import CancelButton from './CancelButton';

interface AddProjectProps {
  onClose: () => void;
}

export default function AddProject({ onClose }: AddProjectProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isCodeGenerated, setIsCodeGenerated] = useState(false); // 버튼 상태 전환용

  const handleButtonClick = () => {
    if (!projectTitle.trim()) {
      alert('프로젝트명을 입력해주세요.');
      return;
    }

    if (!isCodeGenerated) {
      // 코드 생성 (임시 - 나중에 서버로 대체)
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedCode(code);
      setIsCodeGenerated(true); // 상태 변경
    } else {
      // 코드 생성 후 확인 누르면 모달 닫기
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px] relative text-black">
        <XButton onClick={onClose} />

        <h2 className="text-xl font-bold mb-6">프로젝트 추가하기</h2>

        <label className="block text-sm font-semibold mb-1">프로젝트명</label>

        {/* 프로젝트 제목 */}
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="프로젝트 제목을 입력해주세요."
          className="w-full bg-[#D9D9D9] text-sm text-black px-3 py-2 rounded placeholder:text-black"
        />

          {/* 프로젝트 코드 서버한테서 받아오기, 지금 더미 랜덤 값 */}
        {generatedCode && (
          <div className="mt-6">
            <label className="block text-sm font-semibold mb-1">프로젝트 참여 코드</label>
            <input
              type="text"
              readOnly
              value={generatedCode}
              className="w-full bg-[#D9D9D9] text-sm text-black px-3 py-2 rounded placeholder:text-black"
            />
          </div>
        )}

        {/* 코드 생성 버튼 컴포 필요 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleButtonClick}
            className={`px-6 py-2 rounded text-black ${
              isCodeGenerated ? 'bg-black hover:bg-gray-800' : 'bg-gray-800 hover:bg-black'
            }`}
          >
            {/* 확인 버튼을 누르면 서버한테 다시 get을 받아서 프로젝트 갱신 */}
            {isCodeGenerated ? '확인' : '코드 생성'} 
          </button>

            {/* 취소 버튼 */}
          <CancelButton onClose={onClose} />

        </div>
      </div>
    </div>
  );
}

//확인 부분 컴포넌트 화
//프로젝트 참여 코드도 컴포넌트화 하면 좋을듯