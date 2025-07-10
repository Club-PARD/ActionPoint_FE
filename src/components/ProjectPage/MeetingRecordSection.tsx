// 파일: components/MeetingRecordSection.tsx
import { useState } from 'react';
import styles from '../../styles/MeetingRecordSection.module.css';
import MeetingSettingPannel from './MeetingSettingPannel';
import CreateMeetingButton from './CreateMeetingButton';
import { useRouter } from 'next/router';

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
  const clickTimeoutRef = useState<NodeJS.Timeout | null>(null)[0];
  const router = useRouter();

  const handleClick = (id: number) => {
    if (clickTimeoutRef) clearTimeout(clickTimeoutRef as NodeJS.Timeout);
    // 클릭 -> 타임아웃 대기 → 단일 클릭 처리
    (clickTimeoutRef as NodeJS.Timeout) = setTimeout(() => {
      onSelect(id);
    }, 250);
  };

  const handleDoubleClick = (id: number) => {
    if (clickTimeoutRef) clearTimeout(clickTimeoutRef as NodeJS.Timeout);
    router.push(`/meetings/${id}`);
  };

  return (
    <div className={styles.meetingSection}>
      <div className={styles.meetingHeader}>
        <h3 className={styles.sectionTitle}>회의 기록</h3>
           <CreateMeetingButton />
      </div>

      <ul className={styles.meetingList}>
        {meetings.map((meeting) => (
          <li
            key={meeting.id}
            className={`${styles.meetingItem} ${meeting.id === selectedMeetingId ? styles.selected : ''}`}
            onClick={() => handleClick(meeting.id)}
            onDoubleClick={() => handleDoubleClick(meeting.id)}
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