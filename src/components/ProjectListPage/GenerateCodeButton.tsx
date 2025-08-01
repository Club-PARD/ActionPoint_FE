'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/GenerateCodeButton.module.css';
import { useUserStore } from '@/stores/UserStore';

interface GenerateCodeButtonProps {
  isCodeGenerated: boolean;
  projectName: string;
  onCodeGenerated: (code: string) => void;
  onClose: () => void;
  onProjectCreated: () => void;
}

export default function GenerateCodeButton({
  isCodeGenerated,
  projectName,
  onCodeGenerated,
  onClose,
  onProjectCreated,
}: GenerateCodeButtonProps) {
  const userId = useUserStore((state) => state.userId);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (isCodeGenerated) {
      onProjectCreated();
      onClose();
      return;
    }

    if (!projectName.trim()) {
      alert('❗ 프로젝트명을 입력해주세요.');
      return;
    }

    if (userId === null || userId === undefined) {
      alert('❗ 로그인 상태가 아닙니다.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/project`,
        { projectName },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': Number(userId),
          },
        }
      );

      const code = response.data.projectCode;
      onCodeGenerated(code);
      console.log('✅ 프로젝트 생성 성공:', code);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ 프로젝트 생성 실패:', error.response?.data);
      } else {
        console.error('❌ 알 수 없는 에러:', error);
      }

    } finally {
      setLoading(false); // ✅ 반드시 로딩을 해제해줘야 버튼이 복원됨
    }
  }

  return (
    <div className={styles.action}>
      <button
        onClick={handleClick}
        className={`${styles.actionButton} ${isCodeGenerated ? styles.confirmed : ''}`}
        disabled={loading}
      >
        {loading ? '로딩 중...' : isCodeGenerated ? '확인' : '코드 생성'}
      </button>
    </div>
  );
}
