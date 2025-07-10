//회의록 작성 1단계
// MeetingPage.tsx
'use client';

import styles from '../styles/Meeting.module.css';
import Header from "@/components/Header/Header";
import { AiOutlinePlus } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';
import ChangeModal from "../components/MeetingPage/ChangeModal";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FileInputItem {
  id: number;
  files: FileList | null;
}

export default function MeetingPage() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [agendaList, setAgendaList] = useState(['']);
  const [fileInputs, setFileInputs] = useState<FileInputItem[]>([
    { id: Date.now(), files: null },
  ]);
  const [goal, setGoal] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [participants, setParticipants] = useState('');
  const [recorder, setRecorder] = useState('');
  
  // 유효성 검사 에러 상태
  const [errors, setErrors] = useState({
    goal: '',
    participants: '',
    recorder: ''
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCancel = () => setShowModal(false);

  const handleAddAgenda = () => setAgendaList([...agendaList, '']);
  const handleRemoveAgenda = (index: number) => setAgendaList(prev => prev.filter((_, i) => i !== index));
  const handleAgendaChange = (index: number, value: string) => {
    const newList = [...agendaList];
    newList[index] = value;
    setAgendaList(newList);
  };

  const handleRemoveFileInput = (id: number) => setFileInputs(prev => prev.filter(input => input.id !== id));
  const handleFileChange = (id: number, files: FileList | null) => {
    setFileInputs(prev => prev.map(input => input.id === id ? { ...input, files } : input));
  };

  const getFileNames = () => {
    return fileInputs.map((input) => input.files?.[0]?.name).filter((name): name is string => !!name);
  };

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {
      goal: '',
      participants: '',
      recorder: '',
      agendaList: '',
    };

    if (!goal.trim()) {
      newErrors.goal = '회의 목표를 입력해주세요.';
    }

    if (!participants.trim()) {
      newErrors.participants = '참여자를 입력해주세요.';
    }

    if (!recorder.trim()) {
      newErrors.recorder = '기록자를 입력해주세요.';
    }

    if (agendaList.length === 0 || agendaList.some(item => !item.trim())) {
  newErrors.agendaList = '하나 이상의 안건을 입력해주세요.';
}

    setErrors(newErrors);
    return !newErrors.goal && !newErrors.participants && !newErrors.recorder && !newErrors.agendaList;
  };

  // 입력값 변경 시 해당 필드 에러 제거
  const handleInputChange = (field: string, value: string) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
    
    switch (field) {
      case 'goal':
        setGoal(value);
        break;
      case 'participants':
        setParticipants(value);
        break;
      case 'recorder':
        setRecorder(value);
        break;
      case 'agendaList':
        break;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      setShowModal(false);
      alert('저장 완료!');
    }
  };

  const handleWriteMinutes = () => {
    if (validateForm()) {
      const agendasParam = encodeURIComponent(JSON.stringify(agendaList));
      const goalParam = encodeURIComponent(goal);
      const filesParam = encodeURIComponent(JSON.stringify(getFileNames()));
      const meetingDateParam = encodeURIComponent(meetingDate);
      const meetingTimeParam = encodeURIComponent(meetingTime);
      const participantsParam = encodeURIComponent(participants);
      const recorderParam = encodeURIComponent(recorder);
      
      router.push(`/WriteMinutesPage?agendas=${agendasParam}&goal=${goalParam}&files=${filesParam}&meetingDate=${meetingDateParam}&meetingTime=${meetingTimeParam}&participants=${participantsParam}&recorder=${recorderParam}`);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.backLink} onClick={() => router.back()}>&lt; 프로젝트로 돌아가기</div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 목표</h3>
        <div className={styles.formRow}>
          <label>회의 목표 *</label>
          <input 
            type="text" 
            placeholder="EX) 신규 서비스 개발 아이디어 브레인스토밍"
            value={goal} 
            onChange={(e) => handleInputChange('goal', e.target.value)}
            style={{ borderColor: errors.goal ? '#ef4444' : '' }}
          />
          {errors.goal && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.goal}</span>}
        </div>
        <div className={styles.formGrid}>
          <div className={styles.formRow}>
            <label>회의 날짜</label>
            <input 
              type="date" 
              value={meetingDate} 
              onChange={(e) => setMeetingDate(e.target.value)} 
            />
          </div>
          <div className={styles.formRow}>
            <label>시간</label>
            <input 
              type="time" 
              value={meetingTime} 
              onChange={(e) => setMeetingTime(e.target.value)} 
            />
          </div>
          <div className={styles.formRow}>
            <label>참여자 *</label>
            <input 
              type="text" 
              placeholder="EX) 김왈라, 박왈왈, 김옥지, 김빵빵" 
              value={participants} 
              onChange={(e) => handleInputChange('participants', e.target.value)}
              style={{ borderColor: errors.participants ? '#ef4444' : '' }}
            />
            {errors.participants && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.participants}</span>}
          </div>
          <div className={styles.formRow}>
            <label>기록자 *</label>
            <input 
              type="text" 
              placeholder="EX) 김왈라"
              value={recorder} 
              onChange={(e) => handleInputChange('recorder', e.target.value)}
              style={{ borderColor: errors.recorder ? '#ef4444' : '' }}
            />
            {errors.recorder && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.recorder}</span>}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>참고 자료</h3>
        {fileInputs.map((input) => (
          <div key={input.id} className={styles.uploadLineRow}>
            <input type="file" className={styles.uploadLineInput} onChange={(e) => handleFileChange(input.id, e.target.files)} />
            <button className={styles.uploadLineButton}>업로드</button>
            <button className={styles.uploadLineRemove} onClick={() => handleRemoveFileInput(input.id)} title="삭제"><FiX /></button>
          </div>
        ))}
      </section>

         

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 안건 * </h3>
        {agendaList.map((agenda, index) => (
          <div key={index} className={styles.agendaRow}>
            <label className={styles.agendaLabel}>회의 안건 {index + 1}</label>
            <div className={styles.agendaInputWrapper}>
              <input type="text" className={styles.agendaInput} placeholder="회의 안건을 작성해주세요" value={agenda} onChange={(e) => handleAgendaChange(index, e.target.value)} />
              <button className={styles.agendaRemoveButton} onClick={() => handleRemoveAgenda(index)} title="삭제"><FiX />
              </button>
            </div>
          </div>
        )
      )
        }
       
      
        <button onClick={handleAddAgenda} className={styles.floatingAddButton}><AiOutlinePlus /></button>
      </section>

      <div className={styles.buttonGroup}>
        <button className={styles.whiteButton} onClick={handleWriteMinutes}>회의록 작성</button>
        <button className={styles.blueButton} onClick={handleOpenModal}>회의 목표 저장</button>
        {showModal && (<ChangeModal onSave={handleSave} onCancel={handleCancel} />)}
      </div>
    </div>
  );
}