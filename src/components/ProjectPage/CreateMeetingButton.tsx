'use client';

import { useRouter } from 'next/navigation';
import styles from '../../styles/CreateMeetingButton.module.css';
import axios from 'axios';

interface Props {
  projectId: number;
  userId: number;
}

export default function CreateMeetingButton({ projectId, userId }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      // ✅ 서버에 projectId 전달
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/meetings/${projectId}/pass-id`,
        {},
        {
          headers: {
            'X-USER-ID': userId,
          },
        }
      );

      // ✅ 페이지 이동
      router.push('/MeetingPage');
    } catch (error) {
      console.error('❌ 회의 페이지 이동 전 projectId 전달 실패:', error);
      alert('서버에 프로젝트 ID 전달 중 오류가 발생했습니다.');
    }
  };

  return (
    <button onClick={handleClick} className={styles.createBtn}>
      + 새로운 회의록 작성하기
    </button>
  );
}
