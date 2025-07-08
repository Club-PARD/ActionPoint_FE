'use client';

import styles from '../styles/ActionPointCheckBoxCard.module.css';

interface Props {
  meeting: {
    id: number;
    title: string;
    actionPoints: string[];
    completedPoints: string[];
  };
  toggleActionPoint: (meetingId: number, point: string) => void;
}

export default function ActionPointCheckBoxCard({ meeting, toggleActionPoint }: Props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.next}>다음 회의 안건</h2>
      <h3 className={styles.cardTitle}>{meeting.title}</h3>
      <h4 className={styles.countaction}>총 {meeting.actionPoints.length}개의 액션 포인트가 있어요!</h4>

      <div className={styles.contentWrapper}>
        <ul className={styles.actionList}>
          {[...meeting.actionPoints]
            .sort((a, b) => {
              const aDone = meeting.completedPoints.includes(a);
              const bDone = meeting.completedPoints.includes(b);
              return aDone === bDone ? 0 : aDone ? 1 : -1;
            })
            .map((point, i) => (
               <li
                key={i}
                className={`${styles.actionItem} ${
                  meeting.completedPoints.includes(point) ? styles.completedGoal : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={meeting.completedPoints.includes(point)}
                  onChange={() => toggleActionPoint(meeting.id, point)}
                />
                <span className={styles.actionText}>{point}</span> 
              </li>
            ))}
        </ul>
        </div>
      </div>
  );
}
