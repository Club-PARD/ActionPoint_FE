'use client';

interface XButtonProps {
  onClick: () => void;
}

export default function XButton({ onClick }: XButtonProps) {
  return (
    <button
      className="absolute top-2 right-2 text-gray-600 hover:text-black text-l"
      onClick={onClick}
    >
      X
    </button>
  );
}
