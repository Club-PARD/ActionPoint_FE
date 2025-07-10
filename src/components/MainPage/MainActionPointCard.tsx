'use client';

import styles from '@/styles/MainActionPointCard.module.css';

interface Props {
  meeting: {
    id: number;
    title: string;
    actionPoints: string[];
    completedPoints: string[];
  };
  toggleActionPoint: (meetingId: number, point: string) => void;
}

export default function ActionPointCard({ meeting, toggleActionPoint }: Props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.next}>액션 포인트</h2>

      <div className={styles.projectInfo}>
        <img src="/active.svg" alt="프로젝트 아이콘" className={styles.projectIcon} />
        <span className={styles.projectName}>PARD 롱커톤</span>
      </div>

      <h3 className={styles.sub}>다음 회의 안건</h3>
      <div className={styles.cardTitleBox}>
        <h4 className={styles.cardTitle}>{meeting.title}</h4>
      </div>
      <p className={styles.countaction}>총 {meeting.actionPoints.length}개의 액션 포인트가 있어요!</p>

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
              className={`${styles.actionItem} ${meeting.completedPoints.includes(point) ? styles.completedGoal : ''
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

      <div className={styles.linkToWrapper}>
        <div className={styles.balloonWrapper}>
          <button className={styles.linkToMeeting}>
            › 회의록으로 바로 가기
          </button>
          <div className={styles.balloonTail} />
        </div>
        <img
          src="/GoToMeetingIcon.svg"
          alt="회의록 아이콘"
          className={styles.meetingIcon}
        />
      </div>
    </div>
  );
}
