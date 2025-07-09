'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '@/components/ProjectListPage/ProjectCard';
import styles from '../styles/ProjectListPage.module.css';
import ProjectCreateButton from '@/components/ProjectCreateButton';
import SortDropdown from '@/components/ProjectListPage/SortDropdown';
import ParticipationProjectButton from '@/components/ParticipationProjectButton';
import Header from '@/components/Header/Header';
import AddProject from '@/components/ProjectListPage/AddProject';
import { useUserStore } from '@/stores/UserStore';
import EmptyPage from '@/components/EmptyPage';

interface Project {
  projectId: number;
  projectName: string;
  ownerName: string;
  userCnt: number;
  projectStatus: 0 | 1 | 2;
}

interface ProjectCreateButtonProps {
  onClick: () => void;
}

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useUserStore((state) => state.userId);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  const fetchProjects = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/lists`, {
        headers: { 'X-USER-ID': Number(userId) },
      });
      setProjects(res.data);
    } catch (err) {
      console.error('❌ 프로젝트 목록 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === '진행중인 프로젝트') return project.projectStatus === 2;
    if (selectedFilter === '준비중인 프로젝트') return project.projectStatus === 1;
    if (selectedFilter === '종료된 프로젝트') return project.projectStatus === 0;
    return true;
  });

  if (userId === null) return null;

    if (projects.length === 0) {
      return <EmptyPage />;
    }

  const currentProjects = filteredProjects.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

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
          {currentProjects.map((p) => (
            <ProjectCard
              key={p.projectId}
              title={p.projectName}
              participant={p.ownerName}
              count={p.userCnt}
              status={p.projectStatus}
              projectId={p.projectId} // ← 추가!
            />
          ))}
        </section>


        <header className={styles.header}>
          <div className={styles.actions}>
            <ParticipationProjectButton />
            <ProjectCreateButton onClick={() => setIsModalOpen(true)} />
          </div>
        </header>

        {isModalOpen && (
          <AddProject
            onClose={() => setIsModalOpen(false)}
            onProjectCreated={fetchProjects}
          />
        )}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.activePage : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
