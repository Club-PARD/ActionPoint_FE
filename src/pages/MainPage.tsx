'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header/Header';
import ActionPointCard from '@/components/MainPage/MainActionPointCard';
import EmptyPage from '@/components/EmptyPage';
import styles from '../styles/MainPage.module.css';
import { useUserStore } from '@/stores/UserStore';

interface Project {
  projectId: number;
  projectName: string;
  latestMeetingId: number;
  latestMeetingTitle: string;
  myActionPointsCount: number;
  myActionPoints: ActionPoint[];
}

interface ActionPoint {
  actionPointId: number;
  actionContent: string;
  userId: number;
  userName: string;
  finished: boolean;
}

export default function MainPage() {
  const userId = useUserStore((state) => state.userId);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

  const selectedProject = projects.find((p) => p.projectId === selectedProjectId);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/dashboard`, {
        headers: {
          'X-USER-ID': Number(userId),
        },
      })
      .then((res) => {
        const fetchedProjects = res.data.projects;
        setProjects(fetchedProjects);
        if (fetchedProjects.length > 0) {
          setSelectedProjectId(fetchedProjects[0].projectId);
        }
      })
      .catch((err) => {
        console.error('❌ 프로젝트 리스트 불러오기 실패:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const toggleActionPoint = async (actionPointId: number) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/acitonpoints/${actionPointId}/toggle`,
        {},
        {
          headers: {
            'X-USER-ID': Number(userId),
          },
        }
      );

      setProjects((prevProjects) =>
        prevProjects.map((project) => {
          if (project.projectId !== selectedProjectId) return project;
          const updatedPoints = project.myActionPoints.map((point) =>
            point.actionPointId === actionPointId
              ? { ...point, finished: !point.finished }
              : point
          );
          return { ...project, myActionPoints: updatedPoints };
        })
      );
    } catch (err) {
      console.error("❌ 액션 포인트 상태 토글 실패:", err);
    }
  };


  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (isLoading) return <div className={styles.container}>로딩 중...</div>;
  if (projects.length === 0) return <EmptyPage />;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        {/* 왼쪽: 프로젝트 리스트 */}
        <div className={styles.projectList}>
          <h2 className={styles.sectionTitle}>프로젝트 리스트</h2>
          <ul className={styles.projectItems}>
            {currentProjects.map((project) => (
              <li
                key={project.projectId}
                className={`${styles.projectItem} ${selectedProjectId === project.projectId ? styles.selected : ''}`}
                onClick={() => setSelectedProjectId(project.projectId)}
              >
                <img src="/active.svg" alt="프로젝트 아이콘" className={styles.projectIcon} />
                <div>
                  <p className={styles.projectTeam}>PARD 롱커톤</p>
                  <p className={styles.projectTitle}>{project.projectName}</p>
                </div>
              </li>
            ))}
            <li className={styles.pagination}>
              <span onClick={handlePrevPage}>&lt;</span>
              <span className={styles.currentPage}>{currentPage}</span>
              <span className={styles.totalPage}> / {totalPages}</span>
              <span onClick={handleNextPage}>&gt;</span>
            </li>
          </ul>
        </div>

        {/* 오른쪽: 액션포인트 카드 */}
        <div className={styles.actionPointSection}>
          {selectedProject ? (
            <ActionPointCard
              meeting={{
                id: selectedProject.latestMeetingId,
                title: selectedProject.latestMeetingTitle,
                actionPoints: selectedProject.myActionPoints.map((p) => p.actionContent),
                completedPoints: selectedProject.myActionPoints
                  .filter((p) => p.finished)
                  .map((p) => p.actionContent),
              }}
              toggleActionPoint={(id, pointContent) => {
                const found = selectedProject.myActionPoints.find(
                  (p) => p.actionContent === pointContent
                );
                if (found) toggleActionPoint(found.actionPointId);
              }}
            />
          ) : (
            <p style={{ padding: '16px' }}>선택된 프로젝트가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
