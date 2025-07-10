'use client';

import { useState } from 'react';
import styles from '../styles/ActionPointCheckBoxCard.module.css';

interface ActionPoint {
  id: number;
  content: string;
  finished: boolean;
  userName: string;
}

interface Props {
  meeting: {
    id: number;
    title: string;
    date: string;
    actionPoints: ActionPoint[];
  };
  toggleActionPoint: (pointId: number) => void;
}

export default function ActionPointCheckBoxCard({ meeting, toggleActionPoint }: Props) {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(meeting.actionPoints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = [...meeting.actionPoints]
    .sort((a, b) => (a.finished === b.finished ? 0 : a.finished ? 1 : -1))
    .slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.card}>
      <h2 className={styles.next}>다음 회의 안건</h2>
      <h3 className={styles.cardTitle}>{meeting.title}</h3>
      <h4 className={styles.countaction}>
        총 {meeting.actionPoints.length}개의 액션 포인트가 있어요!
 
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          <span className={styles.pageInfo}>
            {currentPage} / {totalPages}
          </span>

          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
    </h4>

      <div className={styles.contentWrapper}>
        <ul className={styles.actionList}>
          {currentItems.map((point) => (
            <li
              key={point.id}
              className={`${styles.actionItem} ${point.finished ? styles.completedGoal : ''}`}
            >
              <input
                type="checkbox"
                checked={point.finished}
                onChange={() => toggleActionPoint(point.id)}
              />
              <span className={styles.actionsText}>
                {point.content}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
