import React from "react";
import styles from "../styles/LandingPage.module.css";
import LoginButton from "../components/LandingPage/LoginButton";

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <img src="/landing1.png" className={styles.image} alt="랜딩1" />

      <div className={styles.buttonArea}>
        <LoginButton />
      </div>

      <img src="/landing2.png" className={styles.image} alt="랜딩2" />

      <div className={styles.buttonArea}>
        <LoginButton />
      </div>
    </div>
  );
}
