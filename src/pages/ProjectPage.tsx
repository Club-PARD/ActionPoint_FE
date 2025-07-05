// 파일: ProjectPage.tsx
'use client';

import { useState } from 'react';
import styles from '../styles/ProjectPage.module.css';
import ActionPointCheckBoxCard from '@/components/ActionPointCheckBoxCard';
import ProgressCard from '@/components/ProjectPage/ProgressCard';
import MeetingRecordSection from '@/components/ProjectPage/MeetingRecordSection';
import Header from '@/components/Header/Header';

interface Meeting {
  id: number;
  title: string;
  date: string;
  actionPoints: string[];
  completedPoints: string[];
}

const dummyProjects: {
  title: string;
  participant: string;
  count: number;
  status: 0 | 1 | 2;
}[] = [
  { title: '불만있나', participant: '정사목', count: 6, status: 2 },
];


const dummyMeetings: Meeting[] = [
  {
    id: 1,
    title: '제목은 이정도 길이로 가져가고 만약에 만약에 길어진다면 어느정도까지 잡는게 좋을까요?',
    date: '2025/07/01',
    actionPoints: ['중간산출물 제출하기', '나는 빡빡이다' , 'primary 색상 정하기', '서브테마 결정'],
    completedPoints: ['primary 색상 정하기']
  },
  {
    id: 2,
    title: '개발 로드맵 점검 및 역할 분배',
    date: '2025/07/03',
    actionPoints: ['담당자 배정', 'API 명세서 공유', '테스트 환경 세팅'],
    completedPoints: ['API 명세서 공유']
  },
  {
    id: 3,
    title: '2차 기획 회의',
    date: '2025/07/05',
    actionPoints: ['스토리보드 작성', '기획안 피드백 반영'],
    completedPoints: []
  },
  {
    id: 4,
    title: '3차 내부 리뷰',
    date: '2025/07/07',
    actionPoints: ['코드 리뷰 완료', '디자인 QA 수행'],
    completedPoints: ['코드 리뷰 완료', '디자인 QA 수행']
  }
];


export default function ProjectPage() {
  const projectTitle = dummyProjects[0].title;
  const sortedMeetings = [...dummyMeetings].sort((a, b) => b.id - a.id);
  const [meetings, setMeetings] = useState<Meeting[]>(sortedMeetings);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number>(sortedMeetings[0].id);
  
  const toggleActionPoint = (meetingId: number, point: string) => {
    setMeetings(prev =>
      prev.map(meeting => {
        if (meeting.id !== meetingId) return meeting;
        const isCompleted = meeting.completedPoints.includes(point);
        const newCompleted = isCompleted
          ? meeting.completedPoints.filter(p => p !== point)
          : [...meeting.completedPoints, point];
        return {
          ...meeting,
          completedPoints: newCompleted
        };
      })
    );
  };

  const currentMeeting = meetings.find(m => m.id === selectedMeetingId)!;
  const total = currentMeeting.actionPoints.length;
  const done = currentMeeting.completedPoints.length;
  const percent = Math.round((done / total) * 100);

  const getProgressMessage = (percent: number): string => {
    if (percent === 100) return '전부 끝! 정말 멋져요!\n오늘의 나에게 박수 짝짝~';
    if (percent >= 95) return '헉! 거의 다 왔어요~ 마지막 하나,\n우리 꼭 마무리해봐요!';
    if (percent >= 75) return '여기까지 온 거 진짜 대단해요!\n 이제 마무리만 남았어요!';
    if (percent >= 50) return '우왕 시작이 반이다 벌써 반이 넘었어요!\n 우리 조금만 더 화이팅해요~';
    if (percent >= 25) return '좋아요! 이미 첫 발을 내디뎠어요.\n 계속 이렇게만 가봐요~';
    return '처음 한 걸음이 가장 멋진 거 아시죠?\n 우리 이제 시작해봐요!';
  };

  return (
    <div className={styles.pageBackground}>
      <Header />


      <div className={styles.pageWrapper}>
       <h2 className={styles.projectTitle}>{projectTitle}</h2>
        <div className={styles.topSection}>
          <ActionPointCheckBoxCard
            meeting={currentMeeting}
            toggleActionPoint={toggleActionPoint}
          />
          <ProgressCard
            percent={percent}
            message={getProgressMessage(percent)}
          />
        </div>

        <MeetingRecordSection
          meetings={meetings}
          selectedMeetingId={selectedMeetingId}
          onSelect={(id) => setSelectedMeetingId(id)}
        />
      </div>
    </div>
  );
}
