// "use client";
// import { Input } from "@/components/ui/input";
// import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { IoSearchOutline } from "react-icons/io5";


// const Search = ({ isShow }) => {
//   const router = useRouter()
//   const [query, setQuery] = useState()
//   const handleSearch = () => {
//     router.push(`${WEBSITE_SHOP}?q=${query}`)
//   }
//   return (
//     <div
//       className={`absolute border-t transition-all left-0 py-5 md:px-32 px-5 z-10 bg-white w-full ${isShow ? "top-18" : "-top-full "
//         }`}
//     >
//       <div className="flex justify-between items-center relative">
//         <Input
//           className="rounded-full md:h-12 ps-5 border-primary"
//           placeholder="Search..."
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button type="button" onClick={handleSearch} className="absolute right-3 cursor-pointer">
//           <IoSearchOutline size={20} className="text-gray-500" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Search;


"use client";
import { Input } from "@/components/ui/input";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ isShow }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`${WEBSITE_SHOP}?q=${query}`);
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out bg-white border-b shadow-md ${
        isShow ? "max-h-28 py-5 md:px-32 px-5" : "max-h-0 py-0 px-0"
      }`}
    >
      <div className="flex justify-between items-center relative">
        {/* Input */}
        <Input
          className="rounded-full md:h-12 h-10 ps-5 pr-12 border-2 border-primary focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-gray-700 placeholder:text-gray-400 shadow-sm w-full"
          placeholder="Search for products..."
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className="absolute right-3 flex items-center justify-center rounded-full p-2 hover:bg-primary hover:text-white transition-all"
        >
          <IoSearchOutline size={22} />
        </button>
      </div>
    </div>
  );
};

export default Search;
