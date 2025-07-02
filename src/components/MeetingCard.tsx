import styles from './MeetingCard.module.css';

interface MeetingCardProps {
  title: string;
  date: string;
}

export default function MeetingCard({ title, date }: MeetingCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.date}>날짜: {date}</p>
    </div>
  );
}
