'use client';

import Image from 'next/image';
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
      <h3 className={styles.cardTitle}>{meeting.title}</h3>

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
                {point}
              </li>
            ))}
        </ul>

        {/* next/image로 이미지 추가 */}
        <div className={styles.imageWrapper}>
          <Image
            src="./Paper.svg"
            alt="액션 포인트 이미지"
            width={174}
            height={181}
          />
        </div>
      </div>
    </div>
  );
}
