import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/ProjectPage.module.css';
import ActionPointCheckBoxCard from '@/components/ActionPointCheckBoxCard';
import ProgressCard from '@/components/ProjectPage/ProgressCard';
import ProjectSettingsPanel from '@/components/ProjectPage/ProjectSettingPannel';
import MeetingRecordSection from '@/components/ProjectPage/MeetingRecordSection';
import Header from '@/components/Header/Header';
import { useUserStore } from '@/stores/UserStore';
import NoMeetingPage from '../../pages/NoMeetingPage';

interface ProjectDetailResponse {
  projectName: string;
  projectCode: string;
  meetings: Meeting[];
}

interface Meeting {
  meetingId: number;
  meetingTitle: string;
  meetingDate: string;
  actionPoints: ActionPoint[];
}

interface ActionPoint {
  actionPointId: number;
  actionCentent: string;
  userId: number;
  userName: string;
  finished: boolean;
}

interface ProjectPageProps {
  projectId: number;
}

export default function ProjectPageContent({ projectId }: ProjectPageProps) {
  const [projectData, setProjectData] = useState<ProjectDetailResponse | null>(null);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const userId = useUserStore((state) => state.userId);

  // 📥 프로젝트 데이터 가져오기
  useEffect(() => {
    if (!userId || !projectId) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/details`, {
        headers: {
          'X-USER-ID': Number(userId),
        },
      })
      .then((res) => {
        const data = res.data;
        console.log('✅ 불러온 프로젝트 상세 데이터:', data);
        setProjectData(data);

        if (data.meetings.length > 0) {
          const sorted = [...data.meetings].sort((a, b) => b.meetingId - a.meetingId);
          setSelectedMeetingId(sorted[0].meetingId);
        }
      })
      .catch((err) => {
        console.error('❌ 프로젝트 상세 불러오기 실패:', err);
      });
  }, [userId, projectId]);

  // ✅ 액션 포인트 상태 토글
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

        // ✅ 상태 업데이트 (불변성 유지)
        setProjectData((prev) => {
          if (!prev) return prev;

          const updatedMeetings = prev.meetings.map((meeting) => {
            if (meeting.meetingId !== selectedMeetingId) return meeting;

            const updatedPoints = meeting.actionPoints.map((p) =>
              p.actionPointId === actionPointId ? { ...p, finished: !p.finished } : p
            );

            return {
              ...meeting,
              actionPoints: updatedPoints,
            };
          });

          return {
            ...prev,
            meetings: updatedMeetings,
          };
        });
      } catch (err) {
        console.error("❌ 액션 포인트 상태 토글 실패:", err);
      }
    };


  // 📦 로딩/에러 처리
  if (!projectData || userId === null) return <div>로딩 중...</div>;

  if (projectData.meetings.length === 0) {
    return (
      <NoMeetingPage
        projectName={projectData.projectName}
        projectCode={projectData.projectCode}
        projectId={projectId}
        userId={userId}
      />
    );
  }

  if (selectedMeetingId === null) return <div>회의 정보를 불러올 수 없습니다.</div>;

  const currentMeeting = projectData.meetings.find((m) => m.meetingId === selectedMeetingId);
  if (!currentMeeting) return <div>회의 정보를 불러올 수 없습니다.</div>;

  const total = currentMeeting.actionPoints.length;
  const done = currentMeeting.actionPoints.filter((p) => p.finished).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const getProgressMessage = (percent: number): string => {
    if (percent === 100) return '전부 끝! 정말 멋져요!\n오늘의 나에게 박수 짝짝~';
    if (percent >= 75) return '헉! 거의 다 왔어요~ 마지막 하나,\n우리 꼭 마무리해봐요!';
    if (percent >= 50) return '여기까지 온 거 진짜 대단해요!\n 이제 마무리만 남았어요!';
    if (percent >= 25) return '좋아요! 이미 첫 발을 내디뎠어요.\n 계속 이렇게만 가봐요~';
    return '처음 한 걸음이 가장 멋진 거 아시죠?\n 우리 이제 시작해봐요!';
  };

  return (
    <div className={styles.pageBackground}>
      <Header />
      <div className={styles.pageWrapper}>
        <div className={styles.projectTitleWrapper}>
          <div className={styles.projectTitle}>
            {projectData.projectName}
            <button
              onClick={() => setShowSettings((prev) => !prev)}
              className={styles.optionsButton}
            >
              ⋮
            </button>
            {showSettings && (
              <div className={styles.settingsPanelWrapper}>
                <ProjectSettingsPanel
                  onClose={() => setShowSettings(false)}
                  projectCode={projectData.projectCode}
                  projectId={projectId}
                  userId={userId}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.topSection}>
          <ActionPointCheckBoxCard
            meeting={{
              id: currentMeeting.meetingId,
              title: currentMeeting.meetingTitle,
              date: new Date(currentMeeting.meetingDate).toLocaleDateString('ko-KR'),
              actionPoints: currentMeeting.actionPoints.map((p) => ({
                id: p.actionPointId, // 이거 정확히!
                content: p.actionCentent,
                finished: p.finished,
                userId: p.userId,
                userName: p.userName,
              })),
            }}
            userId={userId}
            toggleActionPoint={toggleActionPoint}
          />
          <ProgressCard percent={percent} message={getProgressMessage(percent)} />
        </div>

        <MeetingRecordSection
          meetings={projectData.meetings.map((m) => ({
            id: m.meetingId,
            title: m.meetingTitle,
            date: new Date(m.meetingDate).toLocaleDateString('ko-KR'),
            actionPoints: m.actionPoints.map((p) => p.actionCentent),
            completedPoints: m.actionPoints.filter((p) => p.finished).map((p) => p.actionCentent),
          }))}
          selectedMeetingId={selectedMeetingId}
          onSelect={setSelectedMeetingId}
        />
      </div>
    </div>
  );
}
