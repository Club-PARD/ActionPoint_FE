// 파일: components/ProgressCard.tsx
import styles from '../../styles/ProgressCard.module.css';
import Image from 'next/image';

interface Props {
  percent: number;
  message: string;
}

export default function ProgressCard({ percent, message }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.progressWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src="/Walla.svg"
            alt="액션 포인트 이미지"
            width={74}
            height={66}
          />
        </div>
        <p className={styles.today}>오늘도 책임감을 가지고<br></br>나의 <span className={styles.actionPoint}>액션포인트</span>를 달성해보아요!</p>
        <div className={styles.progressRow}>
          <p className={styles.progressMessage}>{message}</p>
          <span className={styles.percentLabel}>{percent}%</span>
        </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${percent}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
}
