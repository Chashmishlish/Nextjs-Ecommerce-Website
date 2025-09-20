'use client';
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/store/reducer/authReducer";

const AfterGoogleLoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session) {
      console.log("Logged in via Google:", session.user); // ✅ yahan dikhega
      dispatch(loginAction(session.user));
      router.push("/my-account"); // final redirect
    }
  }, [status, session, dispatch, router]);

  return <div>Loading...</div>;
};

export default AfterGoogleLoginPage;
