'use client';

interface ParticipantButtonProps {
  projectTitle: string;
  onClick: (code: string) => void;
}

export default function ParticipantButton({ projectTitle, onClick }: ParticipantButtonProps) {
  return (
    <button
      onClick={() => onClick(projectTitle)}
      className="bg-[#D9D9D9] text-black px-6 py-2 rounded hover:bg-gray-300"
    >
      참여
    </button>
  );
}
