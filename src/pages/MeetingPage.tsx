'use client';

import { useState } from 'react';
import styles from '../styles/Meeting.module.css';
import Header from "@/components/Header/Header";

import { AiOutlinePlus } from 'react-icons/ai';

export default function MeetingPage() {
  const [agendaList, setAgendaList] = useState(['']);

  const handleAddAgenda = () => {
    setAgendaList([...agendaList, '']);
  };

  const handleAgendaChange = (index: number, value: string) => {
    const newList = [...agendaList];
    newList[index] = value;
    setAgendaList(newList);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.backLink}>
        <span>&lt; 프로젝트로 돌아가기</span>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 목표</h3>

        <div className={styles.formRow}>
          <label>회의 목표 *</label>
          <input type="text" placeholder="회의 목표를 작성해주세요." />
        </div>

        <div className={styles.formRow}>
          <label>회의 날짜</label>
          <input type="date" defaultValue="2025-07-07" />
        </div>

        <div className={styles.formRow}>
          <label>시간</label>
          <input type="time" placeholder="시간을 입력해주세요" />
        </div>

        <div className={styles.formRow}>
          <label>참여자 *</label>
          <input type="text" placeholder="참여자를 입력해주세요" />
        </div>

        <div className={styles.formRow}>
          <label>기록자 *</label>
          <input type="text" placeholder="기록자를 입력해주세요" />
        </div>

        <div className={styles.formRow}>
          <label>참고 자료</label>
          <input type="file" />
          <button className={styles.uploadButton}>업로드</button>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 안건</h3>

        {agendaList.map((agenda, index) => (
          <div key={index} className={styles.formRow}>
            <label>회의 안건{index + 1} *</label>
            <input
              type="text"
              placeholder="회의 안건을 작성해주세요"
              value={agenda}
              onChange={(e) => handleAgendaChange(index, e.target.value)}
            />
          </div>
        ))}

        <button onClick={handleAddAgenda} className={styles.addButton}>
          <AiOutlinePlus /> 추가
        </button>
      </section>

      <div className={styles.buttonGroup}>
        <button className={styles.whiteButton}>회의록 작성</button>
        <button className={styles.blueButton}>회의 목표 저장</button>
      </div>
    </div>
  );
}
