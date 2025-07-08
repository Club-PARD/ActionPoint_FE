'use client';

import { useState } from 'react';
import Header from "@/components/Header/Header";
import ParticipantButton from "@/components/ProjectListPage/ParticipantButton";
import AddProject from "@/components/ProjectListPage/AddProject";
import ParticipateProject from "@/components/ProjectListPage/ParticipateProject";
import ActionPointCheckBoxCard from "@/components/ActionPointCheckBoxCard";
import styles from "../styles/MainPage.module.css";

export default function MainPage() {
  // ✅ 더미 프로젝트 데이터
  const dummyProjects = [
    { id: 1, title: "중간 산출물 제출하기", actionPointCount: 3 },
    { id: 2, title: "중간 산출물 제출하기", actionPointCount: 2 },
    { id: 3, title: "중간 산출물 제출하기", actionPointCount: 5 },
    { id: 4, title: "중간 산출물 제출하기", actionPointCount: 4 },
    { id: 5, title: "중간 산출물 제출하기", actionPointCount: 1 },
  ];

  const dummyMeetings = [
    {
      id: 1,
      title: "중간 산출물 제출하기",
      actionPoints: ["primary 색상 정하기", "무드보드 만들기", "레퍼런스 20개 찾기"],
      completedPoints: ["레퍼런스 20개 찾기"],
    },
  ];

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const projectsPerPage = 6;
  const totalPages = Math.ceil(dummyProjects.length / projectsPerPage);
  const currentProjects = dummyProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const isEmpty = dummyProjects.length === 0;

  return (
    <div className={styles.container}>
      <Header />

      {isEmpty ? (
        <div className={styles.emptyWrapper}>
          <img src="/empty.svg" alt="빈 상태 아이콘" className={styles.emptyIcon} />
          <p className={styles.emptyText}><strong>김사랑</strong>님의 액션포인트가 없어요.</p>
          <p className={styles.subText}>프로젝트를 통해 액션 포인트를 만들어 보아요!</p>

          <div className={styles.buttonGroup}>
            <button className={styles.commonButton} onClick={() => setShowAddModal(true)}>
              프로젝트 생성
            </button>

            <ParticipantButton
              projectTitle=""
              onClick={() => setShowJoinModal(true)}
            />
          </div>

          {showAddModal && <AddProject onClose={() => setShowAddModal(false)} />}
          {showJoinModal && <ParticipateProject onClose={() => setShowJoinModal(false)} />}
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          {/* 좌측 프로젝트 리스트 */}
          <div className={styles.projectList}>
            <h2 className={styles.sectionTitle}>프로젝트 리스트</h2>
            <ul className={styles.projectItems}>
              {currentProjects.map((project, idx) => (
                <li
                  key={project.id}
                  className={`${styles.projectItem} ${selectedProjectId === idx ? styles.selected : ''}`}
                  onClick={() => setSelectedProjectId(idx)}
                >
                  <img src="/folderIcon.svg" alt="프로젝트 아이콘" className={styles.projectIcon} />
                  <div>
                    <p className={styles.projectTeam}>PARD 콩커톤</p>
                    <p className={styles.projectTitle}>{project.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 우측 액션포인트 영역 */}
          <div className={styles.actionPointSection}>
            <h2 className={styles.sectionTitle}>액션 포인트</h2>

            <div className={styles.projectInfo}>
              <img src="/folderIcon.svg" alt="프로젝트 아이콘" className={styles.projectIcon} />
              <span className={styles.projectName}>PARD 옹커톤</span>
            </div>

            <ActionPointCheckBoxCard
              meeting={dummyMeetings[0]}
              toggleActionPoint={(meetingId, point) => {
                // TODO: 추후 상태 관리 로직으로 연결
                alert(`'${point}' 항목 클릭됨 (meeting ID: ${meetingId})`);
              }}
            />

            <button className={styles.linkToMeeting}>› 회의록으로 바로 가기</button>
          </div>
        </div>
      )}
    </div>
  );
}
