import styles from "../styles/ActionPointCard.module.css";

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
  toggleActionPoint: (pointId: number) => void; // ✅ pointId만 넘김
}

export default function ActionPointCard({ meeting, toggleActionPoint }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.folderShape}></div>
      <div className={styles.cardContent}>
        <h3>{meeting.title}</h3>
        <ul>
          {meeting.actionPoints.map((point) => (
            <li key={point.id}>
              <input
                type="checkbox"
                checked={point.finished}
                onChange={() => toggleActionPoint(point.id)} // ✅ 올바른 토글
              />
              <label>{point.content}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
