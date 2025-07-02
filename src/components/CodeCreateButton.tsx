'use client';

import styles from './CodeCreateButton.module.css';

interface CodeCreateButtonProps {
  projectTitle: string;
}

// 여기서 코드 생성 누르면 코드 나오게 하는 페이지도 만들어야함
export default function CodeCreateButton({ projectTitle }: CodeCreateButtonProps) {
  const handleCreate = () => {
    if (!projectTitle.trim()) return alert('제목을 입력해주세요.');
    
    // TODO: 추후 코드 생성 로직 추가 예정
    alert(`'${projectTitle}' 코드 생성 요청`);
  };

  return (
    <button
      onClick={handleCreate}
      className={styles.button}
    >
      코드 생성
    </button>
  );
}
