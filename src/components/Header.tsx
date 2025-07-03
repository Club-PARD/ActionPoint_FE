import styles from "../styles/Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image src="/Logo.png" alt="로고" width={120} height={30} />
        <span className={styles.link}>프로젝트 보기</span>
      </div>

      <div className={styles.right}>
        <span className={styles.userName}>김사랑님</span>
        <span className={styles.link}>로그아웃</span>
        <span className={styles.link}>내 프로필</span>
      </div>
    </header>
  );
}
