// 파일: components/MeetingRecordSection.tsx
import styles from '../../styles/MeetingRecordSection.module.css';
import MeetingSettingPannel from './MeetingSettingPannel';
import CreateMeetingButton from './CreateMeetingButton';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';

interface Meeting {
  id: number;
  title: string;
  date: string;
}

interface Props {
  meetings: Meeting[];
  selectedMeetingId: number;
  onSelect: (id: number) => void;
  projectId: number; // ✅ 추가
  userId: number;    // ✅ 추가
  onClose: () => void;
}

export default function MeetingRecordSection({
  meetings,
  selectedMeetingId,
  onSelect,
  projectId,
  userId,
}: Props) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // ✅ 타임아웃 핸들을 보관할 ref
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleClick = (id: number) => {
    // 이전 타임아웃이 있으면 지우기
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // ✅ ref.current 에 저장 (재할당 아님)
    clickTimeoutRef.current = setTimeout(() => {
      onSelect(id);
    }, 250);
  };

  const handleDoubleClick = (id: number) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    router.push(`/meetings/${id}`);
  };

  /* 외부 클릭 감지 */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className={styles.meetingSection}>
      <div className={styles.meetingHeader}>
        <h3 className={styles.sectionTitle}>회의 기록</h3>
        <CreateMeetingButton projectId={projectId} userId={userId} />
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

            <button
              className={styles.menuBtn}
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === meeting.id ? null : meeting.id);
              }}
            >
              ⋮
            </button>

            {openMenuId === meeting.id && (
              <div ref={panelRef}>
                <MeetingSettingPannel
                  onEdit={() => {
                    console.log(`Edit ${meeting.id}`);
                    setOpenMenuId(null);
                  }}
                  onDelete={() => {
                    console.log(`Delete ${meeting.id}`);
                    setOpenMenuId(null);
                  }}
                  onClose={() => setOpenMenuId(null)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
