'use client';

import styles from '../styles/ActionPointCheckBoxCard.module.css';

interface ActionPoint {
  id: number;
  content: string;
  finished: boolean;
}

interface Props {
  meeting: {
    id: number;
    title: string;
    date: string;
    actionPoints: ActionPoint[];
  };
  toggleActionPoint: (meetingId: number, pointId: number) => void;
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
              return a.finished === b.finished ? 0 : a.finished ? 1 : -1;
            })
            .map((point) => (
              <li
                key={point.id}
                className={`${styles.actionItem} ${point.finished ? styles.completedGoal : ''}`}
              >
                <input
                  type="checkbox"
                  checked={point.finished}
                  onChange={() => toggleActionPoint(meeting.id, point.id)}
                />
                <span className={styles.actionsText}>{point.content}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

