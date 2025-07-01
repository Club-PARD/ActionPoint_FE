'use client';

interface CodeCreateButtonProps {
  projectTitle: string;
}
//여기서 코드 생성 누르면 코드 나오게 하는 페이지도 만들어야함
export default function CodeCreateButton({ projectTitle}: CodeCreateButtonProps) {
  const handleCreate = () => {
    if (!projectTitle.trim()) return alert('제목을 입력해주세요.');
  };

  return (
    <button
      onClick={handleCreate}
      className="bg-[#D9D9D9] text-black px-6 py-2 rounded hover:bg-gray-300"
    >
      코드 생성 
    </button>
  );
}
