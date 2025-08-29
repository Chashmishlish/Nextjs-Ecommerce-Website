"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const Page = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(WEBSITE_LOGIN);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-pink-500 via-[#ef3a5d] to-rose-400">
      <div className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to <span className="text-pink-100">Smilish</span>
        </h1>
        <Button
          onClick={handleNavigate}
          className="font-semibold px-6 py-3 rounded-xl bg-white text-[#ef3a5d] hover:bg-[#ef3a5d] hover:text-white transition-all duration-300"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Page;




// import { Button } from "@/components/ui/button";
// import React from "react";

// const page = () => {
//   return (
//   <div>
//     <Button>Baba and Mama</Button>
//   </div>
//   )
// }

// export default page 