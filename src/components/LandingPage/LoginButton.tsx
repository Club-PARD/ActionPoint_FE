import React from "react";
import styles from "@/styles/LoginButton.module.css";
import { signIn } from "next-auth/react";

export default function LandingButtons() {
  return (
    <button
      className={styles.startButton}
      onClick={() =>
        signIn("google", { callbackUrl: "/MainPage" })
      }
    >
      Action Point 바로 시작하기
    </button>
  );
}
