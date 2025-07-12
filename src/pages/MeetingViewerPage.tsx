// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import axiosInstance from '@/utils/axiosInstance';
// import styles from '.././styles/MeetingViewerPage.module.css';
// import Header from '@/components/Header/Header';

// export default function MeetingViewerPage() {
//   const searchParams = useSearchParams();
//   const meetingId = searchParams.get('meetingId');
//   const router = useRouter();

//   const [data, setData] = useState<any>(null);
//   const [projectId, setProjectId] = useState<number | null>(null);

//   useEffect(() => {
//     if (!meetingId) return;

//     const fetchData = async () => {
//       try {
//         const res = await axiosInstance.get(`/meetings/${meetingId}`);
//         setData(res.data);
//         setProjectId(res.data.projectId); // ✅ projectId 따로 저장
//       } catch (err) {
//         console.error('불러오기 실패:', err);
//       }
//     };

//     fetchData();
//   }, [meetingId]);

//   if (!data) return <p>불러오는 중...</p>;

//   return (
//     <div className={styles.container}>
//       <Header />
//       <div className={styles.backLink} onClick={() => router.back()}>&lt; 이전으로</div>

//       <section className={styles.section}>
//         <h3 className={styles.sectionTitle}>회의 정보</h3>
//         <div className={styles.formGrid}>
//           <div className={styles.formRow}>
//             <label>프로젝트 ID</label>
//             <input type="text" value={data.projectId} readOnly />
//           </div>
//           <div className={styles.formRow}>
//             <label>회의 제목</label>
//             <input type="text" value={data.meetingTitle} readOnly />
//           </div>
//           <div className={styles.formRow}>
//             <label>날짜</label>
//             <input type="date" value={data.meetingDate?.substring(0, 10)} readOnly />
//           </div>
//           <div className={styles.formRow}>
//             <label>시간</label>
//             <input type="time" value={data.meetingTime} readOnly />
//           </div>
//           <div className={styles.formRow}>
//             <label>기록자</label>
//             <input type="text" value={data.meetingWriter?.userName} readOnly />
//           </div>
//           <div className={styles.formRow}>
//             <label>참여자</label>
//             <input type="text" value={data.meetingParticipants} readOnly />
//           </div>
//         </div>

//         <div className={styles.fileList}>
//           <label>참고자료 :</label>
//           <ul>
//             {data.referenceUrls?.map((url: string, i: number) => {
//               const fileName = url.split('/').pop();
//               return (
//                 <li key={i} className={styles.fileItem}>
//                   <div className={styles.inputBox}>
//                     <a
//                       href={url}
//                       download={fileName}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={styles.downloadLink}
//                     >
//                       📎 {fileName}
//                     </a>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </section>

//       <section className={styles.section}>
//         <h3 className={styles.sectionTitle}>오늘의 회의 안건</h3>
//         {data.agendas?.map((agenda: any, i: number) => (
//           <div key={i} className={styles.agendaBox}>
//             <label className={styles.agendaTitle}>회의 안건 {i + 1}</label>
//             <div className={styles.minuteContent}>
//               <p><strong>{agenda.agendaTitle}</strong></p>
//               <p>{agenda.agendaContent || '회의 내용이 없습니다.'}</p>
//             </div>
//           </div>
//         ))}
//       </section>

//       <section className={styles.section}>
//         <h3 className={styles.sectionTitle}>추가 논의 사항</h3>
//         <textarea
//           className={styles.agendaInput}
//           value={data.meetingLastSummary}
//           readOnly
//         />
//       </section>

//       <section className={styles.section}>
//         <h3 className={styles.sectionTitle}>다음 회의를 위한 액션 포인트</h3>
//         {data.actionPoints?.map((ap: any, i: number) => (
//           <div key={i} className={styles.agendaRow}>
//             <input type="text" value={ap.actionContent} readOnly />
//             <input type="text" value={ap.userName} readOnly />
//           </div>
//         ))}
//       </section>

//       <div className={styles.buttonWrapper}>
//   <button
//     className={styles.primaryButton}
//     onClick={() => {
//       if (projectId) router.push(`/project/${projectId}`);
//       else alert('프로젝트 ID가 존재하지 않습니다.');
//     }}
//   >
//     &lt; 프로젝트로 돌아가기
//   </button>
// </div>

//     </div>
//   );
// }


'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import styles from '.././styles/MeetingViewerPage.module.css';
import Header from '@/components/Header/Header';

// 📌 타입 선언
interface Agenda {
  agendaTitle: string;
  agendaContent?: string;
}

interface ActionPoint {
  actionContent: string;
  userName: string;
}

interface MeetingWriter {
  userName: string;
}

interface MeetingData {
  projectId: number;
  meetingTitle: string;
  meetingDate: string;
  meetingTime: string;
  meetingWriter?: MeetingWriter;
  meetingParticipants: string;
  referenceUrls?: string[];
  agendas?: Agenda[];
  meetingLastSummary?: string;
  actionPoints?: ActionPoint[];
}

export default function MeetingViewerPage() {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('meetingId');
  const router = useRouter();

  const [data, setData] = useState<MeetingData | null>(null);
  const [projectId, setProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (!meetingId) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/meetings/${meetingId}`);
        setData(res.data);
        setProjectId(res.data.projectId);
      } catch (err) {
        console.error('불러오기 실패:', err);
      }
    };

    fetchData();
  }, [meetingId]);

  if (!data) return <p>불러오는 중...</p>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.backLink} onClick={() => router.back()}>
        &lt; 이전으로
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>회의 정보</h3>
        <div className={styles.formGrid}>
          <div className={styles.formRow}>
            <label>프로젝트 ID</label>
            <input type="text" value={data.projectId} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>회의 제목</label>
            <input type="text" value={data.meetingTitle} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>날짜</label>
            <input type="date" value={data.meetingDate?.substring(0, 10)} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>시간</label>
            <input type="time" value={data.meetingTime} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>기록자</label>
            <input type="text" value={data.meetingWriter?.userName || ''} readOnly />
          </div>
          <div className={styles.formRow}>
            <label>참여자</label>
            <input type="text" value={data.meetingParticipants} readOnly />
          </div>
        </div>

        <div className={styles.fileList}>
          <label>참고자료 :</label>
          <ul>
            {data.referenceUrls?.map((url, i) => {
              const fileName = url.split('/').pop();
              return (
                <li key={i} className={styles.fileItem}>
                  <div className={styles.inputBox}>
                    <a
                      href={url}
                      download={fileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadLink}
                    >
                      📎 {fileName}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>오늘의 회의 안건</h3>
        {data.agendas?.map((agenda, i) => (
          <div key={i} className={styles.agendaBox}>
            <label className={styles.agendaTitle}>회의 안건 {i + 1}</label>
            <div className={styles.minuteContent}>
              <p><strong>{agenda.agendaTitle}</strong></p>
              <p>{agenda.agendaContent || '회의 내용이 없습니다.'}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>추가 논의 사항</h3>
        <textarea
          className={styles.agendaInput}
          value={data.meetingLastSummary || ''}
          readOnly
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>다음 회의를 위한 액션 포인트</h3>
        {data.actionPoints?.map((ap, i) => (
          <div key={i} className={styles.agendaRow}>
            <input type="text" value={ap.actionContent} readOnly />
            <input type="text" value={ap.userName} readOnly />
          </div>
        ))}
      </section>

      <div className={styles.buttonWrapper}>
        <button
          className={styles.primaryButton}
          onClick={() => {
            if (projectId) router.push(`/project/${projectId}`);
            else alert('프로젝트 ID가 존재하지 않습니다.');
          }}
        >
          &lt; 프로젝트로 돌아가기
        </button>
      </div>
    </div>
  );
}
