// components/MainPage/EmptyPage.tsx
import styles from "@/styles/MainPage.module.css";

interface EmptyPageProps {
  userId: string;
}

export default function EmptyPage({ userId }: EmptyPageProps) {
  return (
    <div className={styles.emptyWrapper}>
      <img src="/empty_icon.svg" alt="빈 상태 아이콘" className={styles.emptyIcon} />
      <p className={styles.emptyText}>
        <strong>{userId}</strong>님의 액션포인트가 없어요.
      </p>
      <p className={styles.subText}>
        프로젝트를 통해 액션 포인트를 만들어 보아요!
      </p>

      <div className={styles.buttonGroup}>
        <button className={styles.createButton} onClick={() => alert('프로젝트 생성')}>
          프로젝트 생성
        </button>
        <button className={styles.joinButton} onClick={() => alert('프로젝트 참여')}>
          프로젝트 참여
        </button>
      </div>
    </div>
  );
}
