// ✅ MeetingPage.tsx
'use client';

import styles from '../styles/Meeting.module.css';
import Header from "@/components/Header/Header";
import { AiOutlinePlus } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';
import SaveChangesModal from "../components/MeetingPage/SaveModal";
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

  const handleOpenModal = () => setShowModal(true);
  const handleSave = () => { setShowModal(false); alert('저장 완료!'); };
  const handleCancel = () => setShowModal(false);

  const handleAddAgenda = () => setAgendaList([...agendaList, '']);
  const handleRemoveAgenda = (index: number) => setAgendaList(prev => prev.filter((_, i) => i !== index));
  const handleAgendaChange = (index: number, value: string) => {
    const newList = [...agendaList];
    newList[index] = value;
    setAgendaList(newList);
  };

  const handleAddFileInput = () => setFileInputs([...fileInputs, { id: Date.now(), files: null }]);
  const handleRemoveFileInput = (id: number) => setFileInputs(prev => prev.filter(input => input.id !== id));
  const handleFileChange = (id: number, files: FileList | null) => {
    setFileInputs(prev => prev.map(input => input.id === id ? { ...input, files } : input));
  };

  const getFileNames = () => {
    return fileInputs.map((input) => input.files?.[0]?.name).filter((name): name is string => !!name);
  };

  const handleWriteMinutes = () => {
    const agendasParam = encodeURIComponent(JSON.stringify(agendaList));
    const goalParam = encodeURIComponent(goal);
    const filesParam = encodeURIComponent(JSON.stringify(getFileNames()));
    router.push(`/WriteMinutesPage?agendas=${agendasParam}&goal=${goalParam}&files=${filesParam}`);
  };

  return (
    <div className={styles.container}>
      <Header />
      {/* <div className={styles.backLink}><span>&lt; 프로젝트로 돌아가기</span></div> */}
            <div className={styles.backLink} onClick={() => router.back()}>&lt; 프로젝트로 돌아가기</div>


      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 목표</h3>
        <div className={styles.formRow}>
          <label>회의 목표 *</label>
          <input type="text" placeholder="회의 목표를 작성해주세요." value={goal} onChange={(e) => setGoal(e.target.value)} />
        </div>
        <div className={styles.formGrid}>
          <div className={styles.formRow}><label>회의 날짜</label><input type="date" defaultValue="yyyy-mm-dd" /></div>
          <div className={styles.formRow}><label>시간</label><input type="time" placeholder="시간을 입력해주세요" /></div>
          <div className={styles.formRow}><label>참여자 *</label><input type="text" placeholder="참여자를 입력해주세요" /></div>
          <div className={styles.formRow}><label>기록자 *</label><input type="text" placeholder="기록자를 입력해주세요" /></div>
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
        {fileInputs.length === 0 && (
          <button onClick={handleAddFileInput} className={styles.addFileButton}>+ 파일 추가</button>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 안건</h3>
        {agendaList.map((agenda, index) => (
          <div key={index} className={styles.agendaRow}>
            <label className={styles.agendaLabel}>회의 안건 {index + 1}</label>
            <div className={styles.agendaInputWrapper}>
              <input type="text" className={styles.agendaInput} placeholder="회의 안건을 작성해주세요" value={agenda} onChange={(e) => handleAgendaChange(index, e.target.value)} />
              <button className={styles.agendaRemoveButton} onClick={() => handleRemoveAgenda(index)} title="삭제"><FiX /></button>
            </div>
          </div>
        ))}
        <button onClick={handleAddAgenda} className={styles.floatingAddButton}><AiOutlinePlus /></button>
      </section>

      <div className={styles.buttonGroup}>
        <button className={styles.whiteButton} onClick={handleWriteMinutes}>회의록 작성</button>
        <button className={styles.blueButton} onClick={handleOpenModal}>회의 목표 저장</button>
        {showModal && (<SaveChangesModal onSave={handleSave} onCancel={handleCancel} />)}
      </div>
    </div>
  );
}
