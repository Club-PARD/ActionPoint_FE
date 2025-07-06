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
        <div className={styles.progressRow}>
          <span className={styles.percentLabel}>{percent}%</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
        <p className={styles.progressMessage}>{message}</p>
      </div>
        <div className={styles.imageWrapper}>
          <Image
            src="./Walla.svg"
            alt="액션 포인트 이미지"
            width={72}
            height={98}
          />
        </div>
    </div>
  );
}
