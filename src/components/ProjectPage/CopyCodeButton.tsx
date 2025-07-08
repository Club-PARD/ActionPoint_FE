'use client';

import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/CopyCodeButton.module.css';

export default function CopyCodeButton() {
  const [loading, setLoading] = useState(false);

  const handleCopy = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/project/code');
      const code = res.data.code || res.data;
      await navigator.clipboard.writeText(code);
      alert('코드가 복사되었습니다!');
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
