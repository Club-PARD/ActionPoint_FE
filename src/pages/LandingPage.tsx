import React from "react";
import styles from "../styles/LandingPage.module.css";
import LoginButton from "../components/LandingPage/LoginButton";
import ScrollToTopButton from "@/components/LandingPage/ScrollToTopButton";
import Header from "@/components/Header/Header";

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <Header /> {/* ✅ 헤더 넣어주기 */}

      <img src="/landing1.png" className={styles.image} alt="랜딩1" />

      <div className={styles.buttonArea}>
        <LoginButton />
      </div>

      <img src="/landing2.png" className={styles.image} alt="랜딩2" />

      <div className={styles.buttonArea}>
        <LoginButton />
      </div>
      
      <h6> © 2025 불만있냐. All rights reserved. 김사랑 김솔미 김제람 박하솔 조상근 최옥토 </h6>

      <ScrollToTopButton />
    </div>
  );
}
