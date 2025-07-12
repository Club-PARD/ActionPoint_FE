//회의록 작성 3단계
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/NextMeetingPage.module.css';
import Header from '@/components/Header/Header';
import { FiX } from 'react-icons/fi';
import SaveModal from '../components/MeetingPage/SaveModal';
import axiosInstance from '../../src/utils/axiosInstance';

export default function NextMeetingPage() {
  const [showModal, setShowModal] = useState(false);
  const [agendaList, setAgendaList] = useState(['']);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [goal, setGoal] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [participants, setParticipants] = useState('');
  const [recorder, setRecorder] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [agendas, setAgendas] = useState<unknown[]>([]);
  const [minutes, setMinutes] = useState<string[]>([]);
  const [nextActions, setNextActions] = useState<string[]>(['']);
  const [nextAssignees, setNextAssignees] = useState<string[]>(['']);
  const [discussion, setDiscussion] = useState('');

 

  const handleSave = async () => {
  try {
    // 1. 회의 안건 저장
    const patchPayloadForAgendas = agendas.map((agenda, idx) => ({
      agendaId: agenda.agendaId,
      agendaContent: minutes[idx] ?? '',
    }));

    console.log('📦 PATCH 안건 내용 요청:', patchPayloadForAgendas);


    const agendaRes = await axiosInstance.patch('/meetings/create/agendas', patchPayloadForAgendas);
const meetingId = agendaRes.data; // ✅ 숫자 그대로 받음


    if (!meetingId || isNaN(meetingId)) {
      alert('❌ 서버 응답에 유효한 meetingId가 없습니다.');
      console.error('❌ 서버 응답 meetingId:', meetingId);
      return;
    }

    console.log('✅ 안건 저장 성공, 받은 meetingId:', meetingId);

    // 2. 추가 논의 사항 저장
    const patchDiscussionRes = await axiosInstance.patch(
      `/meetings/create/${meetingId}/summary`,
      { meetingLastSummary: discussion },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('✅ 논의사항 저장 성공:', patchDiscussionRes.data);

    // 3. 액션포인트 저장
    const actionPointPayload = nextActions.map((action, idx) => ({
      actionPointId: 0,
      actionContent: action,
      userId: Number(nextAssignees[idx]),
      userName: '',
      finished: false,
    }));

    const actionRes = await axiosInstance.post(
      `/meetings/create/${meetingId}/actionpoints`,
      actionPointPayload
    );
    console.log('✅ 액션포인트 저장 성공:', actionRes.data);

    alert('모든 회의 정보가 성공적으로 저장되었습니다!');
    setShowModal(false);

    // ✅ 회의 뷰어 페이지로 이동
    router.push(`/MeetingViewerPage?meetingId=${meetingId}`);
  } catch (error: any) {
    console.error('❌ 저장 중 오류:', error.response?.data || error.message);
    alert('저장 중 오류가 발생했습니다.');
  }
};


  useEffect(() => {
    const getDecodedParam = (key: string) => {
      const param = searchParams.get(key);
      return param ? decodeURIComponent(param) : '';
    };

    const getDecodedArrayParam = (key: string, defaultValue: unknown[] = []) => {
      const param = searchParams.get(key);
      if (!param) return defaultValue;
      try {
        return JSON.parse(decodeURIComponent(param));
      } catch (e) {
        console.error(`Error parsing ${key}:`, e);
        return defaultValue;
      }
    };

    setGoal(getDecodedParam('goal'));
    setMeetingDate(getDecodedParam('meetingDate'));
    setMeetingTime(getDecodedParam('meetingTime'));
    setParticipants(getDecodedParam('participants'));
    setRecorder(getDecodedParam('recorder'));
    setFiles(getDecodedArrayParam('files', []));
    setAgendas(getDecodedArrayParam('agendas', []));
    setMinutes(getDecodedArrayParam('minutes', []));
    setNextActions(getDecodedArrayParam('nextActions', ['']));
    setNextAssignees(getDecodedArrayParam('nextAssignees', ['']));
    setDiscussion(getDecodedParam('discussion'));
  }, [searchParams]);

  const handleChangeNextAction = (index: number, value: string) => {
    const updated = [...nextActions];
    updated[index] = value;
    setNextActions(updated);
  };

  const handleChangeAssignee = (index: number, value: string) => {
    const updated = [...nextAssignees];
    updated[index] = value;
    setNextAssignees(updated);
  };

  const handleAddNextAction = () => {
    setNextActions([...nextActions, '']);
    setNextAssignees([...nextAssignees, '']);
  };

  const handleRemoveNextAction = (index: number) => {
    setNextActions(prev => prev.filter((_, i) => i !== index));
    setNextAssignees(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.backLink} onClick={() => router.back()}>&lt; 돌아가기</div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 목표</h3>
        <div className={styles.formRow}>
          <label>회의 목표 *</label>
          <input type="text" value={goal} readOnly />
        </div>
        <div className={styles.formGrid}>
          <div className={styles.formRow}>
            <label>회의 날짜</label>
            <input type="date" value={meetingDate} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>시간</label>
            <input type="time" value={meetingTime} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>참여자 *</label>
            <input type="text" value={participants} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>기록자 *</label>
            <input type="text" value={recorder} readOnly />
          </div>
        </div>

        {/* ✅ 참고자료 별도 박스로 분리 */}
<div className={styles.referenceBox}>
  <div className={styles.referenceTitle}>참고자료 :</div>
  <ul>
    {files.map((f, i) => (
      <li key={i} className={styles.referenceFile}>{f}</li>
    ))}
  </ul>
</div>

      </section>
{nextActions.map((action, index) => (
  <div key={index} className={styles.agendaRow}>
    <input
      type="text"
      value={action}
      placeholder="다음 회의를 위한 액션 포인트를 작성해주세요"
      onChange={(e) => handleChangeNextAction(index, e.target.value)}
    />
    <input
      type="text"
      value={nextAssignees[index]}
      placeholder="누구에게"
      onChange={(e) => handleChangeAssignee(index, e.target.value)}
    />
    <button
      onClick={() => handleRemoveNextAction(index)}
      title="삭제"
      className={styles.inlineRemoveButton}
    >
      <FiX />
    </button>
  </div>
))}

{/* 가운데 정렬된 + 버튼 */}
<div className={styles.centeredAddButtonWrapper}>
  <button
    onClick={handleAddNextAction}
    className={styles.floatingAddButton}
    type="button"
    title="추가"
  >
    +
  </button>
</div>



      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>추가 논의 사항</h3>
        <textarea
          className={styles.agendaInput}
          placeholder="다음 회의를 위해 논의할 사항을 자유롭게 적어주세요"
          value={discussion}
          onChange={(e) => setDiscussion(e.target.value)}
        />
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>오늘의 회의 안건</h3>
        {agendas.map((agenda, index) => (
          <div key={index} className={styles.agendaBox}>
            <label className={styles.agendaTitle}>회의 안건 {index + 1}</label>
            <div className={styles.minuteContent}>
              {minutes[index]?.trim() !== '' ? minutes[index] : '회의 내용이 없습니다.'}
            </div>
          </div>
        ))}
      </section>

      <div className={styles.buttonGroup}>
        <button className={styles.blueButton} onClick={handleSave}>
          회의 작성 완료
        </button>
      </div>
    </div>
  );
}
