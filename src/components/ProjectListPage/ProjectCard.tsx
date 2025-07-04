import styles from '../../styles/ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  participant: string,
  count: number,
}

export default function ProjectCard({ title, participant,count }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.footer}>
        <span>{participant}</span>
        <span>{count}</span>
        <button>⋯</button> {/* ...은 따로 컴포넌트 구분해서 다시 제작*/}
      </div>
    </div>
  );
}


