'use client';

import styles from '../styles/ProjectPage.module.css';
import MeetingCard from '@/components/ProjectPage/MeetingCard';
import MeetingLogRow from '@/components/ProjectPage/MeetingLogRow';

export default function ProjectPage() {
  const recentMeetings = [
    { id: 1, title: '제목은 이정도 길이 넘어가면 줄 바꿈', date: '2025.06.30' },
    { id: 2, title: '제목은 이정도 길이 넘어가면 줄 바꿈', date: '2025.06.30' },
    { id: 3, title: '제목은 이정도 길이 넘어가면 줄 바꿈', date: '2025.06.30' },
  ];

  const meetingLogs = [
    { id: 1, title: '길어진 제목이 이정도면 어떻게 될까 테스트', date: '2025.07.01' },
    { id: 2, title: '두번째 회의', date: '2025.07.02' },
    { id: 3, title: '세번째 회의', date: '2025.07.03' },
    { id: 4, title: '네번째 회의', date: '2025.07.04' },
  ];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>(프로젝트 이름)</h1>
        <button className={styles.writeButton}>회의록 작성하기</button>
      </header>

      <section>
        <h2 className={styles.sectionTitle}>📁 최근 회의</h2>
        <div className={styles.grid}>
          {recentMeetings.map((m) => (
            <MeetingCard key={m.id} title={m.title} date={m.date} />
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>📝 회의 기록</h2>
        <ul className={styles.meetingList}>
          {meetingLogs.map((log) => (
            <MeetingLogRow key={log.id} title={log.title} date={log.date} />
          ))}
        </ul>
      </section>
    </main>
  );
}

