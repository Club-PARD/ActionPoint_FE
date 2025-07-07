import styles from "../../styles/Header.module.css"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/MainPage">
            <Image src="/Logo.png" alt="로고" width={120} height={24} />
          </Link>
        </div>

        <nav className={styles.center}>
          <Link href="/ProjectListPage">
            <span className={router.pathname === "/ProjectListPage" ? styles.active : ""}>프로젝트</span>
          </Link>
          <Link href="/MainPage">
            <span className={router.pathname === "/MainPage" ? styles.active : ""}>액션 포인트</span>
          </Link>
           <Link href="/ProjectPage">
            <span className={router.pathname === "/ProjectPage" ? styles.active : ""}>프로젝트 페이지</span>
          </Link>
          <Link href="/MeetingPage">
            <span className={router.pathname === "/MeetingPage" ? styles.active : ""}>회의 페이지</span>
          </Link>
        </nav>

  
      {/* 🔹 오른쪽 사용자 정보 */}
<div className={styles.right}>
  <div className={styles.profile}>
    <Image
      src="/profile.svg"
      alt="유저 아이콘"
      width={40}
      height={40}
      className={styles.profileImage}
    />
    <span className={styles.profileText}>
      {session?.user?.name ?? "김사랑"}님
    </span>
  </div>
</div>

</div>
    </header>
)
}

