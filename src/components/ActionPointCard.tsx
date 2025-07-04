import styles from "../styles/ActionPointCard.module.css";

type Props = {
  title: string;
  checklist: string[];
};

export default function ActionPointCard({ title, checklist }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.folderShape}></div>
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <ul>
          {checklist.map((item, idx) => (
            <li key={idx}>
              <input type="checkbox" id={`check-${idx}`} />
              <label htmlFor={`check-${idx}`}>{item}</label>
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  );
}
