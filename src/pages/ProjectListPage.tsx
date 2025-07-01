'use client';

import ProjectCard from '@/components/ProjectCard';
import styles from '../styles/project.module.css';
import ProjectCreateButton from '@/components/ProjectCreateButton';
import ParticipationProjectButton from '@/components/ParticipationProjectButton';

//이건 받아야 하는것
const dummyProjects = new Array(6).fill({
  title: '제목은 이정도 길이 넘어가면 줄 바꿈',
  participant: '주최자 : 최옥토외',
  count:6
});

export default function ProjectListPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h2>프로젝트 리스트</h2>
        <div className={styles.actions}>
          <ProjectCreateButton></ProjectCreateButton>
          <ParticipationProjectButton></ParticipationProjectButton>
        </div>
      </header>

      <section className={styles.grid}>
        {dummyProjects.map((p, i) => (
          <ProjectCard key={i} title={p.title} participant={p.participant} count ={p.count} />
        ))}
      </section>

    </main>
  );
}


{/*26번줄 p는 배열의 현재요소 i는 현재 인덱스*/} 