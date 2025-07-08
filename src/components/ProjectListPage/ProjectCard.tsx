import styles from '../../styles/ProjectCard.module.css';
import Image from 'next/image';

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
        return styles.active;
      case 1:
        return styles.normal;
      case 2:
        return styles.die;
      default:
        return '';
    }
  };
  const getImageSrc = () => {
  switch (status) {
    case 0:
      return './active.svg';
    case 1:
      return './Normal.svg';
    case 2:
      return './Die.svg';
    default:
      return '';
  }
};
  return (
    <div className={`${styles.card} ${getBackgroundClass()}`}>
      <div className={styles.image}>
        <Image src={getImageSrc()} alt="project status" width={46} height={46} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.footer}>
        <span>{participant}님 외 {count}명</span>
      </div>
    </div>
  );
}
