// 파일: components/MeetingRecordSection.tsx
import styles from '../../styles/MeetingRecordSection.module.css';

interface Meeting {
  id: number;
  title: string;
  date: string;
}

interface Props {
  meetings: Meeting[];
}

export default function MeetingRecordSection({ meetings }: Props) {
  return (
    <div className={styles.meetingSection}>
      <div className={styles.meetingHeader}>
        <h3 className={styles.sectionTitle}>회의 기록</h3>
        <button className={styles.createBtn}>+ 새로운 회의록 작성하기</button>
      </div>

      <ul className={styles.meetingList}>
        {meetings.map((meeting) => (
          <li key={meeting.id} className={styles.meetingItem}>
            <p className={styles.meetingTitle}>{meeting.title}</p>
            <span className={styles.meetingDate}>{meeting.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
