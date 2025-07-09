import React from "react";
import styles from "./LandingButtons.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function LandingButtons() {
  const router = useRouter();

  return (
     <button
        className={styles.googleButton}
        onClick={() =>
          signIn("google", { callbackUrl: "/MainPage" })
        }
      >
        Action Point 바로 시작하기
      </button>
  );
}
