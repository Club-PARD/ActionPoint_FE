'use client';

import Header from "@/components/Header/Header";
import ActionPointCard from "@/components/MainPage/MainActionPointCard";
import EmptyPage from "@/components/EmptyPage";
import styles from "../styles/MainPage.module.css";
import { useState } from "react";

interface Meeting {
  id: number;
  title: string;
  actionPoints: string[];
  completedPoints: string[];
}

export default function MainPage() {
  // const userId = "김사랑";

  const dummyProjects = [
    { id: 1, title: "1번 산출물 정리하기", actionPointCount: 3 },
    { id: 2, title: "2번 최종 발표 준비", actionPointCount: 3 },
    { id: 3, title: "3번 기능 구현 마무리", actionPointCount: 3 },
    { id: 4, title: "4번 보고서 작성", actionPointCount: 3 },
    { id: 5, title: "5번 회의록 정리", actionPointCount: 2 },
    { id: 6, title: "6번 테스트 케이스 작성", actionPointCount: 2 },
    { id: 7, title: "7번 리팩토링", actionPointCount: 2 },
  ];

  const dummyMeetings: Meeting[] = [
    {
      id: 1,
      title: "1번 산출물 정리하기",
      actionPoints: ["기획안 작성", "UI 시안 만들기", "기술스택 정리"],
      completedPoints: ["기획안 작성"],
    },
    {
      id: 2,
      title: "2번 최종 발표 준비",
      actionPoints: ["슬라이드 정리", "Q&A 정리", "리허설 진행"],
      completedPoints: [],
    },
    {
      id: 3,
      title: "3번 기능 구현 마무리",
      actionPoints: ["버그 수정", "기능 테스트", "리팩토링"],
      completedPoints: [],
    },
    {
      id: 4,
      title: "4번 보고서 작성",
      actionPoints: ["목차 구성", "본문 작성", "검토"],
      completedPoints: [],
    },
    {
      id: 5,
      title: "5번 회의록 정리",
      actionPoints: ["회의 내용 정리", "PDF 변환"],
      completedPoints: [],
    },
    {
      id: 6,
      title: "6번 테스트 케이스 작성",
      actionPoints: ["경계값 테스트", "예외처리 테스트"],
      completedPoints: [],
    },
    {
      id: 7,
      title: "7번 리팩토링",
      actionPoints: ["중복 제거", "함수 분리"],
      completedPoints: [],
    },
  ];

  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [meetings, setMeetings] = useState<Meeting[]>(dummyMeetings);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const projectsPerPage = 6;
  const totalPages = Math.ceil(dummyProjects.length / projectsPerPage);

  const currentProjects = dummyProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const selectedMeeting = meetings.find(meeting => meeting.id === selectedProjectId);
  const isEmpty = dummyProjects.length === 0;

  const toggleActionPoint = (meetingId: number, point: string) => {
    setMeetings(prev =>
      prev.map(meeting =>
        meeting.id !== meetingId
          ? meeting
          : {
              ...meeting,
              completedPoints: meeting.completedPoints.includes(point)
                ? meeting.completedPoints.filter(p => p !== point)
                : [...meeting.completedPoints, point],
            }
      )
    );
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className={styles.container}>
      <Header />

      {isEmpty ? (
        <EmptyPage/>
      ) : (
        <div className={styles.contentWrapper}>
          {/* 왼쪽: 프로젝트 리스트 */}
          <div className={styles.projectList}>
            <h2 className={styles.sectionTitle}>프로젝트 리스트</h2>
            <ul className={styles.projectItems}>
              {currentProjects.map((project) => (
                <li
                  key={project.id}
                  className={`${styles.projectItem} ${selectedProjectId === project.id ? styles.selected : ''}`}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <img src="/active.svg" alt="프로젝트 아이콘" className={styles.projectIcon} />
                  <div>
                    <p className={styles.projectTeam}>PARD 롱커톤</p>
                    <p className={styles.projectTitle}>{project.title}</p>
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
            {selectedMeeting ? (
              <ActionPointCard
                meeting={selectedMeeting}
                toggleActionPoint={toggleActionPoint}
              />
            ) : (
              <p style={{ padding: '16px' }}>선택된 프로젝트에 해당하는 회의가 없습니다.</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}