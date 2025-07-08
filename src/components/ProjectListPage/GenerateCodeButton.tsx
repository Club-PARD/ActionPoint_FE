  'use client';

  import { useState } from 'react';
  import axios from 'axios';
  import styles from '../../styles/GenerateCodeButton.module.css';
  import { useUserStore } from '@/stores/UserStore';

  interface GenerateCodeButtonProps {
    isCodeGenerated: boolean;
    projectName: string;
    onCodeGenerated: (code: string) => void;
  }

  export default function GenerateCodeButton({
    isCodeGenerated,
    projectName,
    onCodeGenerated,
  }: GenerateCodeButtonProps) {
    const userId = useUserStore((state) => state.userId);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
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

        console.log('📤 POST /project 요청 전송');
        console.log('📦 Headers:', {
          'Content-Type': 'application/json',
          'X-USER-ID': Number(userId),
        });
        console.log('📦 Body:', { projectName });

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/project`,
          { projectName },
          {
            headers: {
              'Content-Type': 'application/json', // ✅ 추가!
              'X-USER-ID': Number(userId),
            },
          }
        );

        console.log('📨 서버 응답 전체:', response.data);

        const code = response.data.projectCode;
        onCodeGenerated(code);
        console.log('✅ 프로젝트 생성 성공:', code);
      } catch (error: any) {
        console.error('❌ 프로젝트 생성 실패:', error);

        if (error.response) {
          console.error('📨 서버 응답 상태코드:', error.response.status);
          console.error('📨 서버 응답 메시지:', error.response.data);
          alert('❌ 서버 응답: ' + JSON.stringify(error.response.data));
        } else if (error.request) {
          alert('❌ 요청은 전송되었지만 응답이 없습니다.');
        } else {
          alert('❌ 요청 생성 중 오류 발생: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

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
