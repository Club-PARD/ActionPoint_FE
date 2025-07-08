'use client';

import Header from "@/components/Header/Header";
import ParticipantButton from "@/components/ProjectListPage/ParticipantButton";
import AddProject from "@/components/ProjectListPage/AddProject";
import ParticipateProject from "@/components/ProjectListPage/ParticipateProject"; // ✅ 추가
import styles from "../styles/MainPage.module.css";
import { useState } from "react";

export default function MainPage() {
  const dummyProjects: { id: number; title: string; actionPointCount: number }[] = [];

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false); // ✅ 참여 모달 상태 추가

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
            <button
              className={styles.createButton}
              onClick={() => setShowAddModal(true)}
            >
              프로젝트 생성
            </button>

            <ParticipantButton
              projectTitle=""
              onClick={() => setShowJoinModal(true)} // ✅ 참여 모달 열기
            />
          </div>

          {showAddModal && <AddProject onClose={() => setShowAddModal(false)} />}
          {showJoinModal && <ParticipateProject onClose={() => setShowJoinModal(false)} />} {/* ✅ 참여 모달 렌더링 */}
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          {/* 생략: 기존 콘텐츠 */}
        </div>
      )}
    </div>
  );
}
