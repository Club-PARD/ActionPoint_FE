'use client';

import { useState } from 'react';
import Header from "@/components/Header/Header";
import ActionPointCard from "@/components/MainPage/MainActionPointCard";
import styles from "../styles/MainPage.module.css";

interface Meeting {
  id: number;
  title: string;
  actionPoints: string[];
  completedPoints: string[];
}

export default function MainPage() {
  const dummyProjects = [
    { id: 1, title: "1번 산출물 정리하기", actionPointCount: 3 },
    { id: 2, title: "2번 최종 발표 준비", actionPointCount: 3 },
    { id: 3, title: "3번 기능 구현 마무리", actionPointCount: 3 },
    { id: 4, title: "4번 보고서 작성", actionPointCount: 3 },
    { id: 5, title: "5번 회의록 정리", actionPointCount: 2 },
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
      actionPoints: ["슬라이드 만들기", "발표자 선정", "리허설 진행"],
      completedPoints: ["발표자 선정"],
    },
    {
      id: 3,
      title: "3번 기능 구현 마무리",
      actionPoints: ["버그 수정", "리팩토링", "테스트 코드 작성"],
      completedPoints: [],
    },
    {
      id: 4,
      title: "4번 보고서 작성",
      actionPoints: ["초안 작성", "수정 반영", "최종 제출"],
      completedPoints: ["초안 작성", "수정 반영"],
    },
    {
      id: 5,
      title: "5번 회의록 정리",
      actionPoints: ["지난 회의 내용 정리", "공유 링크 만들기"],
      completedPoints: [],
    },
  ];

  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [meetings, setMeetings] = useState<Meeting[]>(dummyMeetings);

  const selectedMeeting = meetings.find(meeting => meeting.id === selectedProjectId);

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

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        {/* 왼쪽 프로젝트 리스트 */}
        <div className={styles.projectList}>
          <h2 className={styles.sectionTitle}>프로젝트 리스트</h2>
          <ul className={styles.projectItems}>
            {dummyProjects.map((project) => (
              <li
                key={project.id}
                className={`${styles.projectItem} ${selectedProjectId === project.id ? styles.selected : ''}`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <img src="/active.svg" alt="아이콘" className={styles.projectIcon} />
                <div>
                  <p className={styles.projectTeam}>PARD 롱커톤</p>
                  <p className={styles.projectTitle}>{project.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 오른쪽 액션포인트 카드 */}
        <div className={styles.actionPointSection}>
          {selectedMeeting && (
            <ActionPointCard
              meeting={selectedMeeting}
              toggleActionPoint={toggleActionPoint}
            />
          )}
        </div>
      </div>
    </div>
  );
}
