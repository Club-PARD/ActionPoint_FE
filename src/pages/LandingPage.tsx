import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Header from "@/components/Header/Header";
import styles from "../styles/LandingPage.module.css";
import axios from "axios";
import { useRouter } from "next/router";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // 로그인 완료 후 서버로 사용자 정보 POST
  useEffect(() => {
    const sendUserToServer = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              email: session.user.email,
              name: session.user.name,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const userId = response.data.userId;
          router.push(`/MainPage?userId=${userId}`);
        } catch (error) {
          console.error("서버 전송 실패:", error);
        }
      }
    };

    sendUserToServer();
  }, [status, session, router]);

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
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setShowLogin(false);
          }}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalLogoWrapper}>
              <img src="/Logo.png" alt="ACTION POINT 로고" className={styles.modalLogo} />
            </div>
            <p className={styles.modalDesc}>액션 포인트를 통해 효율적 회의를 누려보세요</p>
            <button
              className={styles.googleButton}
              onClick={() =>
                signIn("google", { callbackUrl: "/MainPage" })
              }
            >
              Sign up with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
