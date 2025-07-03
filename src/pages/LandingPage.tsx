import { useState } from "react";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";
import styles from "../styles/LandingPage.module.css";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h2 className={styles.mainText}>Dreams come true.</h2>
        <p className={`${styles.mainText} ${styles.textSpacing}`}>
          Action Point를 통해 회의를 만들어 보아요
        </p>

        <div className={styles.logoWrapper}>
          <img src="/Logo.png" alt="ACTION POINT 로고" className={styles.logo} />
        </div>
        <button className={styles.startButton} onClick={() => setShowLogin(true)}>
          지금 바로 시작하기
        </button>
      </main>

      {showLogin && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalLogoWrapper}>
              <img src="/Logo.png" alt="ACTION POINT 로고" className={styles.modalLogo} />
            </div>
            <p className={styles.modalDesc}>액션 포인트를 통해 효율적 회의를 누려보세요</p>
            <button className={styles.googleButton} onClick={() => signIn("google")}>
              Sign up with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
