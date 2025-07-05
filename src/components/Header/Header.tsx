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
        </nav>

        <div className={styles.right}>
          <span className={styles.profileText}>
            {session?.user?.name ?? "이름"}님
          </span>
          <span className={styles.profileText}>내 프로필</span>
        </div>
      </div>
    </header>
  );
}