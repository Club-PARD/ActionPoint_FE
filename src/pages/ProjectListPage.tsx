'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectListPage/ProjectCard';
import styles from '../styles/ProjectListPage.module.css';
import ProjectCreateButton from '@/components/ProjectCreateButton';
import SortDropdown from '@/components/ProjectListPage/SortDropdown';
import ParticipationProjectButton from '@/components/ParticipationProjectButton';
import Header from '@/components/Header/Header';

// 초기 프로젝트 배열
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
  const [selectedFilter, setSelectedFilter] = useState('최신순');

  // 필터링/정렬된 프로젝트 반환
  const filteredProjects = dummyProjects.filter((project) => {
    if (selectedFilter === '진행중인 프로젝트') return project.status === 2;
    if (selectedFilter === '준비중인 프로젝트') return project.status === 1;
    if (selectedFilter === '종료된 프로젝트') return project.status === 0;
    return true; // 최신순 or 전체
  });

  return (
  <>
  <div className={styles.pageBackground}>
    <Header />
      <main className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.main}>프로젝트 리스트</h2>

          <div className={styles.actions}>
            <ProjectCreateButton />
            <ParticipationProjectButton />
          </div>
        </header>

        <div className={styles.sort}>
            <SortDropdown onSelect={(option) => setSelectedFilter(option)} />
        </div>

        <section className={styles.grid}>
          {filteredProjects.map((p, i) => (
            <ProjectCard
              key={i}
              title={p.title}
              participant={p.participant}
              count={p.count}
              status={p.status}
            />
          ))}
        </section>
      </main>
    </div>
    </>
  );
}
