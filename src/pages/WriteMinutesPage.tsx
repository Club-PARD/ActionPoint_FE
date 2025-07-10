'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../styles/WriteMinutesPage.module.css';
import SaveModal from '../components/MeetingPage/SaveModal';
import axios from 'axios';

import axiosInstance from '../../src/utils/axiosInstance';



interface AgendaItem {
  agendaId: number;
  agendaTitle: string;
  agendaContent?: string;
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
      console.log('✅ 받은 agendas:', parsed);
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

  const handleSave = async (): Promise<number | null> => {
  try {
    const patchPayload = agendas.map((agenda, idx) => ({
      agendaId: agenda.agendaId,
      agendaContent: minutes[idx] ?? '',
    }));

    const response = await axiosInstance.patch('/meetings/create/agendas', patchPayload);

    console.log('📨 PATCH 응답 전체:', response);
    console.log('📨 PATCH 응답 데이터:', response.data);

    const meetingId = response.data; // 또는 response.data.meetingId
    if (!meetingId) throw new Error('No meetingId returned from server');

    return meetingId;
  } catch (error) {
    console.error('❌ 회의록 저장 실패:', error);
    return null;
  }
};



  const handleOpenModal = () => setShowModal(true);
  const handleCancel = () => setShowModal(false);

  return (
    <div className={styles.container}>
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
    onSave={handleSave}  // 이제 meetingId 반환
    onCancel={handleCancel}
  />
)}

      </div>
    </div>
  );
}