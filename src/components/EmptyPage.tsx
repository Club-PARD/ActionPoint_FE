import ProjectCreateButton from "./ProjectCreateButton";
import ParticipationProjectButton from "./ParticipationProjectButton";
import styles from "@/styles/EmptyPage.module.css";
import { useState } from "react";
import Header from "./Header/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import AddProject from "./ProjectListPage/AddProject";

export default function EmptyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession(); // ✅ 세션 정보 가져오기

  const userName = session?.user?.name ?? "김왈라"; // ✅ 사용자 이름 또는 기본값

  return (
    <div className={styles.emptyWrapper}>
      <Header />
      <Image
        src="/Walla.svg"
        alt="빈 상태 아이콘"
        className={styles.emptyIcon}
        width={180}
        height={180}
      />
      <p className={styles.emptyText}>
        <strong>{userName}</strong>님의 액션포인트가 없어요.
      </p>
      <p className={styles.subText}>
        프로젝트를 통해 액션 포인트를 만들어 보아요!
      </p>


      <div className={styles.buttonGroup}>
        <ParticipationProjectButton />
        <ProjectCreateButton onClick={() => setIsModalOpen(true)} />
      </div>

        {isModalOpen && (
          <AddProject
            onClose={() => setIsModalOpen(false)}
            onProjectCreated={() => {
              setIsModalOpen(false);
              window.location.reload(); // ✅ 프로젝트 생성 후 페이지 새로고침
            }}
          />
        )}
    </div>
  );
}