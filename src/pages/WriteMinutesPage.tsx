//회의록 작성 2단계
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from '../styles/WriteMinutesPage.module.css';
import SaveModal from '../components/MeetingPage/SaveModal';
import axios from 'axios';
import Header from '../components/Header/Header';

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

  const handleSave = async (): Promise<void> => {
  try {
    // 1. PATCH 요청 payload 구성
    const patchPayload = agendas.map((agenda, idx) => ({
      agendaId: agenda.agendaId,
      agendaContent: minutes[idx] ?? '',
    }));

    // 2. PATCH 요청 보내기
    const response = await axiosInstance.patch('/meetings/create/agendas', patchPayload);
    console.log('📨 PATCH 응답:', response.data);

    // 3. 응답으로부터 필요한 값 확인
    const meetingId = response.data.meetingId ?? 1;

    // 4. query string 구성
    const goalParam = encodeURIComponent(goal);
    const filesParam = encodeURIComponent(JSON.stringify(files));
    const agendasParam = encodeURIComponent(JSON.stringify(agendas));
    const minutesParam = encodeURIComponent(JSON.stringify(minutes));

    const meetingDateParam = encodeURIComponent(searchParams.get('meetingDate') ?? '');
    const meetingTimeParam = encodeURIComponent(searchParams.get('meetingTime') ?? '');
    const participantsParam = encodeURIComponent(searchParams.get('participants') ?? '');
    const recorderParam = encodeURIComponent(searchParams.get('recorder') ?? '');


    // 5. 3단계로 이동
    router.push(`/NextMeetingPage?goal=${goalParam}` +
      `&files=${filesParam}` +
      `&agendas=${agendasParam}` +
      `&minutes=${minutesParam}` +
      `&meetingDate=${meetingDateParam}` +
      `&meetingTime=${meetingTimeParam}` +
      `&participants=${participantsParam}` +
      `&recorder=${recorderParam}`
    );
  } catch (error) {
    console.error('❌ 회의록 저장 실패:', error);
    alert('회의록 저장 중 오류가 발생했습니다.');
  }
};

  const handleOpenModal = () => setShowModal(true);
  const handleCancel = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <Header></Header>
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
  <button className={styles.blueButton} onClick={handleSave}>
    회의록 저장 및 다음 단계로
  </button>
</div>


      {/* <div className={styles.buttonGroup}>
<button onClick={handleSave}>회의록 저장 및 다음 단계로</button> */}
        {showModal && (
  <SaveModal
    onSave={handleSave}  // 이제 meetingId 반환
    onCancel={handleCancel}
  />
)}
      
    </div>
  );
}



