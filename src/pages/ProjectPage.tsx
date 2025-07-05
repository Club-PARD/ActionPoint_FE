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

const dummyMeetings: Meeting[] = [
  {
    id: 1,
    title: '제목은 이정도 길이로 가져가고 만약에 길어진다면 어느정도까지 잘리는게 좋을까요?',
    date: '2025/07/01',
    actionPoints: ['중간산출물 제출하기', 'primary 색상 정하기', 'primary 색상 정하기2', '서브테마와 문단 스타일 정하기'],
    completedPoints: ['primary 색상 정하기']
  },
];

export default function ProjectPage() {
  const [meetings, setMeetings] = useState<Meeting[]>(dummyMeetings);

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

  const getProgressMessage = (percent: number): string => {
    if (percent === 100) return '전부 끝! 정말 멋져요! 오늘의 나에게 박수 짝짝~';
    if (percent >= 95) return '헉! 거의 다 왔어요~ 마지막 하나, 우리 꼭 마무리해봐요!';
    if (percent >= 75) return '여기까지 온 거 진짜 대단해요! 이제 마무리만 남았어요!';
    if (percent >= 50) return '우왕 시작이 반이다 벌써 반이 넘었어요! 우리 조금만 더 화이팅해요~';
    if (percent >= 25) return '좋아요! 이미 첫 발을 내디뎠어요. 계속 이렇게만 가봐요~';
    return '처음 한 걸음이 가장 멋진 거 아시죠? 우리 이제 시작해봐요!';
  };

  const currentMeeting = meetings[0];
  const total = currentMeeting.actionPoints.length;
  const done = currentMeeting.completedPoints.length;
  const percent = Math.round((done / total) * 100);

  return (

    <div className={styles.pageBackground}>
      <Header />

      <div className={styles.pageWrapper}>
        <div className={styles.topSection}>
          <ActionPointCheckBoxCard
            meeting={currentMeeting}
            toggleActionPoint={toggleActionPoint}
          />
          <ProgressCard percent={percent} message={getProgressMessage(percent)} />
        </div>

        <MeetingRecordSection meetings={meetings} />
      </div>
    </div>
  );
}