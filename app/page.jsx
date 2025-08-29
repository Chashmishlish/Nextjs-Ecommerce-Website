"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const Page = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(WEBSITE_LOGIN); // Correct: Route constant use kiya function ke andar
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Button 
        onClick={handleNavigate} 
        className="font-semibold cursor-pointer"
      >
        Welcome to Smilish
      </Button>
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