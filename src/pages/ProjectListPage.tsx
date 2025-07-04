'use client';

import ProjectCard from '@/components/ProjectListPage/ProjectCard';
import styles from '../styles/ProjectListPage.module.css';
import ProjectCreateButton from '@/components/ProjectCreateButton';
import ParticipationProjectButton from '@/components/ParticipationProjectButton';

//이건 받아야 하는것
const dummyProjects: {
  title: string;
  participant: string;
  count: number;
  status: 0 | 1 | 2;
}[] = [
  { title: '불만있나', participant: '정사목', count: 6, status: 2 },
  { title: '스마트미디어시스템트', participant: '정사목 김사현 외 N명', count: 6, status: 1 },
  { title: '스마트미디어시스템트', participant: '정사목 김사현 외 N명', count: 6, status: 0 },
  { title: '불만있나', participant: '정사목 김사현 외 N명', count: 6, status: 2 },
  { title: '스마트미디어시스템트', participant: '정사목 김사현 외 N명', count: 6, status: 1 },
  { title: '0gang', participant: '정사목 김사현 외 N명', count: 6, status: 0 },
];



export default function ProjectListPage() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.main}>프로젝트 리스트</h2>

        <div className={styles.actions}>
          <ProjectCreateButton></ProjectCreateButton>
          <ParticipationProjectButton></ParticipationProjectButton>
        </div>
      </header>

      <h3>최신순</h3>

      <section className={styles.grid}>
        {dummyProjects.map((p, i) => (
          <ProjectCard
            key={i}
            title={p.title}
            participant={p.participant}
            count={p.count}
            status={p.status} // ✅ 추가
          />
        ))}
      </section>


    </main>
  );
}


{/*26번줄 p는 배열의 현재요소 i는 현재 인덱스*/} 