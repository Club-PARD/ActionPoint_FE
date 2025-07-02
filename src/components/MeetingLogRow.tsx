import styles from './MeetingLogRow.module.css';

interface MeetingLogRowProps {
  title: string;
  date: string;
}

export default function MeetingLogRow({ title, date }: MeetingLogRowProps) {
  return (
    <li className={styles.row}>
      <span className={styles.title}>{title}</span>
      <span className={styles.date}>날짜: {date}</span>
    </li>
  );
}
