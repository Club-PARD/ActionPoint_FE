import { useState, useRef, useEffect } from "react";
import styles from "../../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/stores/UserStore";
import LogoutModal from "./LogoutModal"; // 로그아웃 모달 컴포넌트

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = useUserStore((state) => state.userId);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (router.pathname.toLowerCase() === "/landingpage") {
    return (
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link href="/MainPage">
              <Image src="/Logo.png" alt="로고" width={120} height={24} />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
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
            <div
              className={styles.profile}
              onClick={handleProfileClick}
              ref={dropdownRef}
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/profile.svg"
                alt="유저 아이콘"
                width={40}
                height={40}
                className={styles.profileImage}
              />
              <span className={styles.profileText}>
                {session?.user?.name ?? "김사랑"}님
                {userId !== null && ` (ID: ${userId})`}
              </span>

              {showDropdown && (
                <div className={styles.dropdown}>
                  <button className={styles.logoutBtn} onClick={handleLogoutClick}>
                    로그아웃 하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)} />
      )}
    </>
  );
}
