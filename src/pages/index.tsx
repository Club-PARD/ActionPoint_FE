import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/LandingPage"); // ✅ "/LandingPage"로 자동 이동
  }, [router]);

  return null; // 아무것도 안 보여줌
}