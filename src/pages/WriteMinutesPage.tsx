// ✅ WriteMinutesPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../styles/WriteMinutesPage.module.css';
import Header from "@/components/Header/Header";

export default function WriteMinutesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [agendas, setAgendas] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const agendaParam = searchParams.get('agendas');
    const goalParam = searchParams.get('goal');
    const filesParam = searchParams.get('files');

    if (agendaParam) {
      const parsed = JSON.parse(decodeURIComponent(agendaParam));
      setAgendas(parsed);
      setMinutes(new Array(parsed.length).fill(''));
    }
    if (goalParam) setGoal(decodeURIComponent(goalParam));
    if (filesParam) setFiles(JSON.parse(decodeURIComponent(filesParam)));
  }, [searchParams]);

  const handleChange = (index: number, value: string) => {
    const updated = [...minutes];
    updated[index] = value;
    setMinutes(updated);
  };

  const handleSave = () => {
    console.log('📝 회의록 저장됨:', minutes);
    alert('회의록이 저장되었습니다!');
    router.push('/ProjectPage');
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.backLink} onClick={() => router.back()}>&lt; 회의록 돌아가기</div>

      <h2 className={styles.sectionTitle}>회의록</h2>

      <div className={styles.section}>
        <div className={styles.goalBox}><strong>📌 회의 목표:</strong> {goal}</div>

        <div className={styles.fileList}>
          <strong>📎 참고자료:</strong>
          <ul>
            {files.map((file, index) => (
              <li key={index} className={styles.fileItem}>{file}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        {agendas.map((agenda, index) => (
          <div key={index} className={styles.agendaBox}>
            <label className={styles.agendaTitle}>안건{index + 1} {agenda}</label>
            <textarea className={styles.agendaInput} placeholder="회의 내용을 입력하세요" value={minutes[index]} onChange={(e) => handleChange(index, e.target.value)} />
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.blueButton} onClick={handleSave}>회의록 저장</button>
        {/* {showModal && (<SaveChangesModal onSave={handleSave} onCancel={handleCancel} />)} */}
      </div>
    </div>
  );
}
