import styles from '../../styles/ProjectCard.module.css';

interface ProjectCardProps {
  title: string;
  participant: string;
  count: number;
  status: 0 | 1 | 2;
}

export default function ProjectCard({ title, participant, count, status }: ProjectCardProps) {
  const getBackgroundClass = () => {
    switch (status) {
      case 0:
        return styles.die;
      case 1:
        return styles.normal;
      case 2:
        return styles.active;
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.card} ${getBackgroundClass()}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.footer}>
        <span>참석자: </span>
        <span>{participant}</span>
        <span> 외 </span>
        <span>{count}</span>
        <span>명</span>
        <button>⋯</button>{/* 이건 컴포넌트로 따로 기능 넣어야해요~~*/}
      </div>
    </div>
  );
}
