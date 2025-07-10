'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../styles/WriteMinutesPage.module.css';
import Header from "@/components/Header/Header";
import SaveModal from '../components/MeetingPage/SaveModal';
import axios from 'axios';

interface AgendaItem {
  agendaId: number;
  agendaTitle: string;
}

export default function WriteMinutesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [minutes, setMinutes] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const agendaParam = searchParams.get('agendas');
    const goalParam = searchParams.get('goal');
    const filesParam = searchParams.get('files');

    if (agendaParam) {
      const parsed: AgendaItem[] = JSON.parse(decodeURIComponent(agendaParam));
      console.log('✅ 받은 agendas:', parsed); // ✅ agendaId 확인 로그 추가
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

  const handleSave = async () => {
    try {
      const patchPayload = agendas.map((agenda, idx) => ({
        agendaId: Number(agenda.agendaId),
        agendaContent: minutes[idx],
      }));

      console.log('📦 PATCH payload 확인:', JSON.stringify(patchPayload, null, 2));

      const response = await axios.patch('/meetings/create/agendas', JSON.stringify(patchPayload), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ PATCH 성공 응답:', response.data);

      const nextParams = new URLSearchParams({
        goal: encodeURIComponent(goal),
        agendas: encodeURIComponent(JSON.stringify(agendas)),
        minutes: encodeURIComponent(JSON.stringify(minutes)),
        files: encodeURIComponent(JSON.stringify(files)),
        nextActions: searchParams.get('nextActions') || '',
        nextAssignees: searchParams.get('nextAssignees') || '',
        discussion: searchParams.get('discussion') || '',
      });

      router.push(`/NextMeetingPage?${nextParams.toString()}`);
    } catch (error) {
      alert('회의록 저장에 실패했습니다.');
      console.error('❌ API 호출 오류:', error);

      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      }
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCancel = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.backLink} onClick={() => router.back()}>&lt; 회의록 돌아가기</div>

      <h2 className={styles.sectionTitle}>회의록</h2>

      <div className={styles.section}>
        <div className={styles.goalBox}><label>회의 목표:</label> {goal}</div>

        <div className={styles.fileList}>
          <div className={styles.fileBox}>
            <label>참고자료:</label>
            <ul>
              {files.map((file, index) => (
                <li key={`file-${index}`} className={styles.fileItem}>{file}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        {agendas.map((agenda, index) => (
          <div key={`agenda-${agenda.agendaId}`} className={styles.agendaBox}>
            <label className={styles.agendaTitle}> [ 안건 {index + 1} {agenda.agendaTitle} ]</label>
            <textarea
              className={styles.agendaInput}
              placeholder="회의 내용을 입력하세요"
              value={minutes[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.blueButton} onClick={handleOpenModal}>회의록 저장</button>
        {showModal && (
          <SaveModal
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
