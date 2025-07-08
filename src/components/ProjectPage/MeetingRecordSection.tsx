// 파일: components/MeetingRecordSection.tsx
import { useState } from 'react';
import styles from '../../styles/MeetingRecordSection.module.css';
import MeetingSettingPannel from './MeetingSettingPannel';
import Link from 'next/link'; 

interface Meeting {
  id: number;
  title: string;
  date: string;
}

interface Props {
  meetings: Meeting[];
  selectedMeetingId: number;
  onSelect: (id: number) => void;
}

export default function MeetingRecordSection({ meetings, selectedMeetingId, onSelect }: Props) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className={styles.meetingSection}>
      <div className={styles.meetingHeader}>
        <h3 className={styles.sectionTitle}>회의 기록</h3>
        <Link href="/MeetingPage" passHref>
    <button className={styles.createBtn}>+ 새로운 회의록 작성하기</button>
  </Link>
      </div>

      <ul className={styles.meetingList}>
        {meetings.map((meeting) => (
          <li
            key={meeting.id}
            className={`${styles.meetingItem} ${meeting.id === selectedMeetingId ? styles.selected : ''}`}
            onClick={() => onSelect(meeting.id)}
          >
            <p className={styles.meetingTitle}>{meeting.title}</p>
            <span className={styles.meetingDate}>{meeting.date}</span>

            {/* 메뉴 버튼 + 토글 */}
              <button
                className={styles.menuBtn}
                onClick={(e) => {
                  e.stopPropagation(); // 회의 선택 방지
                  setOpenMenuId(openMenuId === meeting.id ? null : meeting.id);
                }}
              >
                ⋮
              </button>

              {openMenuId === meeting.id && (
                <MeetingSettingPannel
                  onEdit={() => {
                    console.log(`Edit ${meeting.id}`);
                    setOpenMenuId(null);
                  }}
                  onDelete={() => {
                    console.log(`Delete ${meeting.id}`);
                    setOpenMenuId(null);
                  }}
                />
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}