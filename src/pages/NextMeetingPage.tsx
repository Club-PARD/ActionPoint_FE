'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../styles/NextMeetingPage.module.css';
import Header from '@/components/Header/Header';
import { FiX } from 'react-icons/fi';
import SaveModal from '../components/MeetingPage/SaveModal';

export default function NextMeetingPage() {
  
    const [showModal, setShowModal] = useState(false);
    const [agendaList, setAgendaList] = useState(['']);
   
  const handleAgendaChange = (index: number, value: string) => {
    const newList = [...agendaList];
    newList[index] = value;
    setAgendaList(newList);
  };
  

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [goal, setGoal] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [agendas, setAgendas] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<string[]>([]);
  const [nextActions, setNextActions] = useState<string[]>(['']);
  const [nextAssignees, setNextAssignees] = useState<string[]>(['']);
  const [discussion, setDiscussion] = useState('');
  
  const handleOpenModal = () => setShowModal(true);
  const handleSave = () => { setShowModal(false); alert('저장 완료!'); };
  const handleCancel = () => setShowModal(false);

  useEffect(() => {
    const getDecodedParam = (key: string) => {
      const param = searchParams.get(key);
      return param ? decodeURIComponent(param) : '';
    };

    const getDecodedArrayParam = (key: string, defaultValue: any[] = []) => {
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

      <h2 className={styles.sectionTitle}>회의 요약</h2>

      <div className={styles.goalBox}><strong>회의 목표:</strong> {goal}</div>

      <div className={styles.fileList}>
        <strong>참고자료:</strong>
        <ul>{files.map((f, i) => <li key={i} className={styles.fileItem}>{f}</li>)}</ul>
      </div>

      {/* 회의록 내용 표시 - 수정된 부분 */}
      {agendas.map((agenda, i) => (
        <div key={i} className={styles.agendaBox}>
          <div className={styles.agendaTitle}>안건 {i + 1}: {agenda}</div>
          <div className={styles.minuteContent}>
            {minutes[i] || '회의 내용이 없습니다.'}
          </div>
        </div>
      ))}

      {/* 다음 회의를 위한 준비 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>다음 회의를 위한 준비</h3>
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
            {index > 0 && (
              <button onClick={() => handleRemoveNextAction(index)} title="삭제">
                <FiX />
              </button>
            )}
          </div>
        ))}
        <button onClick={handleAddNextAction} className={styles.floatingAddButton}>＋</button>
      </div>

      {/* 추가 논의 사항 */}
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
        {agendaList.map((agenda, index) => (
          <div key={index} className={styles.agendaRow}>
            <label className={styles.agendaLabel}>회의 안건 {index + 1}</label>
            <div className={styles.agendaInputWrapper}>
              <input type="text" className={styles.agendaInput} placeholder="회의 안건을 작성해주세요" value={agenda} onChange={(e) => handleAgendaChange(index, e.target.value)} />
            </div>
          </div>
        ))}
        
      </section>

       <div className={styles.buttonGroup}>
          <button className={styles.whiteButton} onClick={handleOpenModal}>편집하기</button>

        <button className={styles.blueButton} onClick={handleOpenModal}>회의록 작성완료</button>
        {showModal && (
          <SaveModal
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )
        } 
      </div>
    </div>
  );
}