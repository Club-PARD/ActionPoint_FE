'use client';

interface CancelButtonProps {
  onClose: () => void;
}

export default function CancelButton({ onClose }: CancelButtonProps) {
  return (
    <button
      onClick={onClose} // 바로 실행
      className="bg-[#D9D9D9] text-black px-6 py-2 rounded hover:bg-gray-300"
    >
      취소
    </button>
  );
}
