// import React from 'react'
// import UserPanelNavigation from './UserPanelNavigation'

// const UserPanelLayout = ({ children }) => {
//     return (
//          <div className="flex flex-wrap lg:flex-nowrap gap-10 lg:px-32 px-5 my-20">
//             <div className="lg:w-64 w-full lg:mb-0 mb-5">
//                 <UserPanelNavigation />
//             </div>
//             <div className="w-full lg:w-[calc(100%-16rem)]">
//                 {children}
//             </div>
//         </div>
//     )
// }

// export default UserPanelLayout


import React from "react";
import UserPanelNavigation from "./UserPanelNavigation";

const UserPanelLayout = ({ children }) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-8 lg:px-20 px-5 my-16">
      {/* Sidebar */}
      <div className="lg:w-64 w-full lg:mb-0 mb-6">
        <div className="sticky top-20">
          <div className="backdrop-blur-xl bg-white/70 shadow-xl rounded-2xl border border-white/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
            <UserPanelNavigation />
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:flex-1">
        <div className="backdrop-blur-xl bg-white/70 shadow-lg rounded-2xl border border-white/30 p-6 transition-all duration-300 hover:shadow-2xl hover:bg-white/90">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserPanelLayout;
