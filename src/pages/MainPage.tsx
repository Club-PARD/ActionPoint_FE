import Header from "@/components/Header/Header";
import styles from "../styles/MainPage.module.css";
import { useState } from "react";

export default function MainPage() {
  const dummyProjects = [
    { id: 1, title: "불만있냐", actionPointCount: 4 },
    { id: 2, title: "영갱", actionPointCount: 1 },
    { id: 3, title: "불만있냐", actionPointCount: 4 },
    { id: 4, title: "영갱", actionPointCount: 1 },
    { id: 5, title: "불만있냐", actionPointCount: 4 },
    { id: 6, title: "영갱", actionPointCount: 1 },
    { id: 7, title: "프로젝트7", actionPointCount: 3 },
    { id: 8, title: "프로젝트8", actionPointCount: 2 },
    { id: 9, title: "프로젝트9", actionPointCount: 5 },
  ];

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 6;
  const totalPages = Math.ceil(dummyProjects.length / projectsPerPage);

  const currentProjects = dummyProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.contentWrapper}>
        {/* 좌측 영역 */}
        <div className={styles.leftArea}>
          <div className={styles.whiteCard}>
            <h2 className={styles.title}>오늘의 액션포인트</h2>

            <div className={styles.memoWrapper}>
              <img src="/memo.png" alt="메모지" className={styles.memoImage} />
              <div className={styles.memoContent}>
                <h3>중간산출물 제출하기</h3>
                <ul>
                  <li><input type="checkbox" /> 프론트 프로젝트리스트 페이지 만들어오기</li>
                  <li><input type="checkbox" /> 프론트 프로젝트리스트 페이지 만들어오기</li>
                  <li><input type="checkbox" /> 프론트 프로젝트리스트 페이지 만들어오기</li>
                  <li><input type="checkbox" /> 프론트 프로젝트리스트 페이지 만들어오기</li>
                  <li><input type="checkbox" /> 프론트 프로젝트리스트 페이지 만들어오기</li>
                </ul>
                <p className={styles.linkText}>회의록으로 바로 가기 &gt;</p>
              </div>
            </div>
          </div>
        </div>

        {/* 우측 영역 */}
        <div className={styles.rightArea}>
          <div className={styles.calendarArea}>달력(오늘만 강조)</div>

          <div className={styles.projectListArea}>
            <div className={styles.pageIndicator}>
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lt;</button>
              {currentPage}/{totalPages}
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>&gt;</button>
            </div>

            {currentProjects.map((project) => (
              <div
                key={project.id}
                className={`${styles.projectCard} ${selectedProjectId === project.id ? styles.selected : ""}`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <p>{project.title}</p>
                <p>{project.actionPointCount} 액션포인트</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
