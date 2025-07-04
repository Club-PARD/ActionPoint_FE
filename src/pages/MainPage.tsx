import Header from "../components/Header/Header"
import ActionPointCard from "@/components/ActionPointCard";
import styles from "../styles/MainPage.module.css";
import { useState } from "react";
import ProjectCreateButton from "@/components/ProjectCreateButton";
import ParticipantButton from "@/components/ParticipationProjectButton";
import Image from "next/image";
import { useSession } from "next-auth/react";

type ActionPoint = {
  id: number;
  title: string;
  checklist: string[];
};

export default function MainPage() {
  const { data: session } = useSession();
  const [actionPointList, setActionPointList] = useState<ActionPoint[]>([]);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.backgroundArea}>
        <div className={styles.content}>
          <h2 className={styles.pageTitle}>
            💡 ACTION POINT / {session?.user?.name ?? "이름"}님
          </h2>

          {actionPointList.length === 0 ? (
            <div className={styles.emptyBox}>
              <Image
                src="/actionpoint.png"
                alt="액션포인트 아이콘"
                className={styles.emptyIcon}
                width={67}
                height={230}
              />
              <p className={styles.emptyText}>
                {session?.user?.name ?? "이름"}님의 금주 액션포인트가 없어요!
              </p>
              <p className={styles.emptyText}>
                프로젝트를 통해 액션 포인트를 만들어 보아요!
              </p>

              <div className={styles.buttonWrapper}>
                <ProjectCreateButton />
                <ParticipantButton />
              </div>
            </div>
          ) : (
            <div className={styles.carouselContainer}>
              {actionPointList.map((item) => (
                <div key={item.id} className={styles.carouselItem}>
                  <ActionPointCard title={item.title} checklist={item.checklist} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
