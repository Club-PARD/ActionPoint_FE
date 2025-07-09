'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/CopyCodeButton.module.css';

interface CopyCodeButtonProps {
  code: string;
}

export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCopy = async () => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(code);
      alert('코드가 복사되었습니다람쥐~!');
    } catch {
      alert('복사 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={loading}
      className={styles.button}
    >
      <Image src="/copy.svg" alt="copy icon" width={20} height={20} />
      <span className={styles.copycode}>{loading ? '복사 중...' : '코드 복사하기'}</span>
    </button>
  );
}
