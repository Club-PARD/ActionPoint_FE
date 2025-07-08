'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '@/components/ProjectListPage/ProjectCard';
import styles from '../styles/ProjectListPage.module.css';
import ProjectCreateButton from '@/components/ProjectCreateButton';
import SortDropdown from '@/components/ProjectListPage/SortDropdown';
import ParticipationProjectButton from '@/components/ParticipationProjectButton';
import Header from '@/components/Header/Header';
import { useUserStore } from '@/stores/UserStore'; 
import { useRouter } from 'next/router'; // ✅ 추가

interface Project {
  title: string;
  participant: string;
  count: number;
  status: 0 | 1 | 2;
}

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const userId = useUserStore((state) => state.userId);
  const router = useRouter(); // ✅ 라우터 초기화

  useEffect(() => {
    console.log("👀 ProjectListPage 마운트됨");
    console.log("👀 현재 userId 상태:", userId);

    if (typeof window === 'undefined' || userId === null) {
      console.log("⛔ userId 없음. 요청 안 보냄.");
      return;
    }

    console.log("🚀 프로젝트 목록 GET 요청 보냄");

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/lists`, {
      headers: {
        'X-USER-ID': Number(userId),
      },
    })
      .then((res) => {
        console.log("✅ 응답:", res.data);
      })
      .catch((err) => {
        console.error("❌ 요청 실패", err);
        console.log("📦 최종 전송 userId:", userId, typeof userId);
      });
  }, [userId]);

  // ✅ 필터 적용
  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === '진행중인 프로젝트') return project.status === 2;
    if (selectedFilter === '준비중인 프로젝트') return project.status === 1;
    if (selectedFilter === '종료된 프로젝트') return project.status === 0;
    return true; // 전체 보기
  });

  return (
    <div className={styles.pageBackground}>
      <Header />
      <main className={styles.container}>
        <div className={styles.header1}>
          <h2 className={styles.main}>프로젝트 리스트</h2>
          <div className={styles.sort}>
            <SortDropdown onSelect={(option) => setSelectedFilter(option)} />
          </div>
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

        <header className={styles.header}>
          <div className={styles.actions}>
            <ParticipationProjectButton />
            <ProjectCreateButton />
          </div>
        </header>
      </main>
    </div>
  );
}
