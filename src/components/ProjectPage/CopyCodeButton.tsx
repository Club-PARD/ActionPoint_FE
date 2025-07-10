'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/CopyCodeButton.module.css';

interface CopyCodeButtonProps {
  code: string;
}

export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState('');

  const handleCopy = async () => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(code);
      setCopiedMessage('프로젝트 코드가 복사되었습니다.');
      setTimeout(() => setCopiedMessage(''), 2000);
    } catch {
      setCopiedMessage('❌ 복사 실패');
      setTimeout(() => setCopiedMessage(''), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {copiedMessage && (
        <div className={styles.toastMessage}>
          {copiedMessage}
        </div>
      )}
      <button
        onClick={handleCopy}
        disabled={loading}
        className={styles.button}
      >
        <Image src="/copy.svg" alt="copy icon" width={20} height={20} />
        <span className={styles.copycode}>
          {loading ? '복사 중...' : '코드 복사하기'}
        </span>
      </button>
    </>
  );
}
