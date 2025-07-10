'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/UserStore';
import styles from '../../styles/ParticipantButton.module.css';

interface ParticipantButtonProps {
  projectTitle: string;
  onClose: () => void;
  setIsError: (val: boolean) => void;
  setErrorMessage: (msg: string) => void;
}

export default function ParticipantButton({
  projectTitle,
  onClose,
  setIsError,
  setErrorMessage,
}: ParticipantButtonProps) {
  const userId = useUserStore((state) => state.userId);
  const router = useRouter();

  const handleJoin = async () => {
    if (!projectTitle.trim()) {
      setIsError(true);
      setErrorMessage('참여 코드를 입력해주세요.');
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/project/join`,
        { projectCode: projectTitle },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-USER-ID': userId,
          },
        }
      );

      alert('프로젝트에 성공적으로 참여하였습니다.');
      setIsError(false);
      setErrorMessage('');
      onClose();
      router.refresh();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('❌ 프로젝트 참여 실패:', error.response?.data);
      } else {
        console.error('❌ 알 수 없는 에러:', error);
      }
      setIsError(true);
    }
  };

  return (
    <button onClick={handleJoin} className={styles.button}>
      참여하기
    </button>
  );
}
