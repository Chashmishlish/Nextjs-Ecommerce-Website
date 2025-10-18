'use client';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/store/reducer/authReducer";

const AfterGoogleLoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [bridging, setBridging] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (status !== "authenticated" || !session || bridging) return;
      setBridging(true);
      try {
        // Bridge NextAuth session to app cookie on server
        const res = await fetch("/api/auth/sso-bridge", { method: "POST" });
        const data = await res.json();
        if (data?.success) {
          // Use app-shaped user payload for Redux
          dispatch(loginAction(data.data));
          router.push("/my-account");
        } else {
          console.error("SSO bridge failed:", data);
          router.push("/auth/login");
        }
      } catch (e) {
        console.error("SSO bridge error:", e);
        router.push("/auth/login");
      }
    };
    run();
  }, [status, session, dispatch, router]);

  return <div>Loading...</div>;
};

export default AfterGoogleLoginPage;
