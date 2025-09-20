// // 'use client'
// // import { USER_DASHBOARD, WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
// // import Image from 'next/image'
// // import Link from 'next/link'
// // import React, { useState } from 'react'
// // import { LuSearch } from "react-icons/lu";
// // import { MdAccountBox } from "react-icons/md";
// // import logo from '@/public/assests/images/logo-bgb.png'
// // import Cart from './Cart';
// // import { useSelector } from 'react-redux';
// // import { Avatar, AvatarImage } from '@/components/ui/avatar'
// // import userIcon from '@/public/assests/images/user.png'
// // import { IoMdCloseCircle } from "react-icons/io";
// // import { FaBars } from "react-icons/fa6";
// // import Search from './Search'

// // const Header = () => {
// //     const auth = useSelector(store => store.authStore.auth)
// //     const [isMobileMenu, setIsMobileMenu] = useState(false)
// //     const [showSearch, setShowSearch] = useState(false)

// //     return (
// //         <div className='bg-white border-b lg:px-32 px-4'>
// //             <div className='flex justify-between items-center lg:py-5 py-3'>
// //                 <Link href={WEBSITE_HOME}>
// //                     <Image
// //                         src={logo}
// //                         width={383}
// //                         height={146}
// //                         alt='logo'
// //                         className='lg:w-32 w-24'
// //                     />
// //                 </Link>

// //                 <div className='flex justify-between gap-20'>
// //                     <nav className={`lg:relative lg:w-auto lg:h-auto lg:top-0 lg:left-0 lg:p-0 bg-white fixed z-50 top-0 w-full h-screen transition-all duration-300 ease-in-out ${isMobileMenu ? 'left-0' : '-left-full'}`}>

// //                         <div className='lg:hidden flex justify-between items-center bg-pink-50 py-3 border-b px-3'>
// //                             <Image
// //                                 src={logo}
// //                                 width={383}
// //                                 height={146}
// //                                 alt='logo'
// //                                 className='lg:w-32 w-24'
// //                             />

// //                             <button type='button' onClick={() => setIsMobileMenu(false)}>
// //                             <IoMdCloseCircle size={25} className='text-gray-500 hover:text-primary cursor-pointer'
// //                             />
// //                             </button>

// //                         </div>

// //                         <ul className='lg:flex justify-between items-center gap-10 px-3'>
// //                             <li className='text-gray-600 hover:text-primary hover:font-semibold'>
// //                                 <Link href={WEBSITE_HOME} className='block py-2'>
// //                                     Home
// //                                 </Link>
// //                             </li>
// //                             <li className='text-gray-600 hover:text-primary hover:font-semibold'>
// //                                 <Link href="/about-us" className='block py-2'>
// //                                     About
// //                                 </Link>
// //                             </li>
// //                             <li className='text-gray-600 hover:text-primary hover:font-semibold'>
// //                                 <Link href={WEBSITE_SHOP} className='block py-2'>
// //                                     Shop
// //                                 </Link>
// //                             </li>
// //                             <li className='text-gray-600 hover:text-primary hover:font-semibold'>
// //                                 <Link href={`${WEBSITE_SHOP}?category=t-shirts`} className='block py-2'>
// //                                     T-shirt
// //                                 </Link>
// //                             </li>
// //                             <li className='text-gray-600 hover:text-primary hover:font-semibold'>
// //                                 <Link href={`${WEBSITE_SHOP}?category=hoodies`} className='block py-2'>
// //                                     Hoodies
// //                                 </Link>
// //                             </li>
// //                             <li className='text-gray-600 hover:text-primary hover:font-semibold'>
// //                                 <Link href={`${WEBSITE_SHOP}?category=oversized`} className='block py-2'>
// //                                     Oversized
// //                                 </Link>
// //                             </li>
// //                         </ul>
// //                     </nav>


// //                     <div className='flex justify-between items-center gap-8'>
// //                         <button type='button' onClick={() => setShowSearch(!showSearch)}>
// //                             <LuSearch
// //                                 className='text-gray-500 hover:text-primary cursor-pointer'
// //                                 size={25}
// //                             />
// //                         </button>
// //                         <Cart />

// //                         {!auth
// //                             ?
// //                             <Link href={WEBSITE_LOGIN}>
// //                                 <MdAccountBox className='text-gray-500 hover:text-primary cursor-pointer'
// //                                     size={25}
// //                                 />
// //                             </Link>
// //                             :
// //                             <Link href={USER_DASHBOARD}>
// //                                 <Avatar>
// //                                     <AvatarImage
// //                                         src={auth?.avatar?.url || userIcon.src}
// //                                         className='text-gray-500 hover:text-primary cursor-pointer'
// //                                         size={25}
// //                                     />
// //                                 </Avatar>
// //                             </Link>
// //                         }

// //                         <button type='button' className='lg:hidden block' onClick={() => setIsMobileMenu(true) }>
// //                             <FaBars size={25} className='text-gray-500 hover:text-primary cursor-pointer'
// //                             />
// //                         </button>


// //                     </div>
// //                 </div>
// //             </div>

// //             <Search  isShow={showSearch}/>
// //         </div>
// //     )
// // }

// // export default Header


// 'use client'
// import React, { useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { LuSearch } from "react-icons/lu";
// import { MdAccountBox } from "react-icons/md";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useSelector } from 'react-redux';
// import Cart from './Cart';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import logo from '@/public/assests/images/logo-bgb.png';
// import userIcon from '@/public/assests/images/user.png';
// import { WEBSITE_HOME, WEBSITE_SHOP, WEBSITE_LOGIN, USER_DASHBOARD } from '@/routes/WebsiteRoute';
// import Search from './Search';

// const Header = () => {
//     const auth = useSelector(store => store.authStore.auth);
//     const [isMobileMenu, setIsMobileMenu] = useState(false);
//     const [showSearch, setShowSearch] = useState(false);

//     const menuItems = [
//         { name: "Home", link: WEBSITE_HOME },
//         { name: "About", link: "/about-us" },
//         { name: "Shop", link: WEBSITE_SHOP },
//         { name: "T-shirt", link: `${WEBSITE_SHOP}?category=t-shirts` },
//         { name: "Hoodies", link: `${WEBSITE_SHOP}?category=hoodies` },
//         { name: "Oversized", link: `${WEBSITE_SHOP}?category=oversized` },
//     ];

//     return (
//         <header className='bg-white border-b sticky top-0 z-50 shadow-sm'>
//             <div className='flex justify-between items-center lg:px-32 px-4 py-4'>
                
//                 {/* Logo */}
//                 <Link href={WEBSITE_HOME}>
//                     <Image src={logo} width={383} height={146} alt='logo' className='lg:w-32 w-24'/>
//                 </Link>

//                 {/* Desktop Menu */}
//                 <ul className='hidden lg:flex items-center gap-10'>
//                     {menuItems.map((item, idx) => (
//                         <li key={idx} className='relative group'>
//                             <Link href={item.link} className='text-gray-700 hover:text-primary font-medium transition'>
//                                 {item.name}
//                             </Link>
//                             <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full'></span>
//                         </li>
//                     ))}
//                 </ul>

//                 {/* Right Icons */}
//                 <div className='flex items-center gap-6'>
//                     <button onClick={() => setShowSearch(!showSearch)} className='p-2 hover:bg-gray-100 rounded-full transition-transform duration-200 hover:scale-110'>
//                         <LuSearch size={24} className='text-gray-600'/>
//                     </button>
//                     <Cart />
//                     {!auth ? (
//                         <Link href={WEBSITE_LOGIN} className='p-2 hover:bg-gray-100 rounded-full transition-transform duration-200 hover:scale-110'>
//                             <MdAccountBox size={24} className='text-gray-600' />
//                         </Link>
//                     ) : (
//                         <Link href={USER_DASHBOARD} className='p-1 rounded-full hover:ring-2 hover:ring-primary transition-transform duration-200 hover:scale-105'>
//                             <Avatar>
//                                 <AvatarImage src={auth?.avatar?.url || userIcon.src} className='text-gray-500'/>
//                             </Avatar>
//                         </Link>
//                     )}

//                     {/* Mobile Burger Icon */}
//                     <button className='lg:hidden p-2 hover:bg-gray-100 rounded-full transition-transform duration-200 hover:scale-110' onClick={() => setIsMobileMenu(true)}>
//                         <FaBars size={24} className='text-gray-600'/>
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu Overlay */}
//             {isMobileMenu && (
//                 <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40' onClick={() => setIsMobileMenu(false)}></div>
//             )}

//             {/* Mobile Slide Menu */}
//             <div className={`fixed top-16 right-0 bg-white rounded-l-2xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
//                 <div className='flex justify-between items-center p-4 border-b'>
//                     <Image src={logo} width={120} height={50} alt='logo'/>
//                     <button onClick={() => setIsMobileMenu(false)} className='p-2 hover:bg-gray-100 rounded-full transition-transform duration-200 hover:scale-110'>
//                         <FaTimes size={24} className='text-gray-600'/>
//                     </button>
//                 </div>
//                 <ul className='flex flex-col gap-4 p-6'>
//                     {menuItems.map((item, idx) => (
//                         <li key={idx} className='text-gray-700 hover:text-primary font-medium transition'>
//                             <Link href={item.link} onClick={() => setIsMobileMenu(false)}>
//                                 {item.name}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Search Component */}
//             <Search isShow={showSearch}/>
//         </header>
//     )
// }

// export default Header;




'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LuSearch } from "react-icons/lu";
import { MdAccountBox } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Cart from './Cart';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import logo from '@/public/assests/images/logo-bgb.png';
import userIcon from '@/public/assests/images/user.png';
import { WEBSITE_HOME, WEBSITE_SHOP, WEBSITE_LOGIN, USER_DASHBOARD } from '@/routes/WebsiteRoute';
import Search from './Search';

const Header = () => {
    const auth = useSelector(store => store.authStore.auth);
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    // Sticky header shadow animation
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 50){
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: "Home", link: WEBSITE_HOME, icon: null },
        { name: "About", link: "/about-us", icon: null },
        { name: "Shop", link: WEBSITE_SHOP, icon: null },
        { name: "T-shirt", link: `${WEBSITE_SHOP}?category=t-shirts` },
        { name: "Hoodies", link: `${WEBSITE_SHOP}?category=hoodies` },
        { name: "Oversized", link: `${WEBSITE_SHOP}?category=oversized` },
    ];

    // Function for mobile touch feedback
    const playClickFeedback = () => {
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(20); // small vibration
        }
        // optional sound effect
    //     const audio = new Audio('/click.mp3'); // add small click.mp3 in public folder
    //     audio.play();
    }

    return (
        <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolling ? 'shadow-lg' : 'shadow-sm'}`}>
            <div className='flex justify-between items-center lg:px-32 px-4 py-4'>
                
                {/* Logo with slide + scale animation */}
                <Link href={WEBSITE_HOME}>
                    <Image 
                        src={logo} 
                        width={383} 
                        height={146} 
                        alt='logo' 
                        className={`lg:w-32 w-24 transition-transform duration-500 ease-out ${isMobileMenu ? 'translate-x-2 scale-110' : 'translate-x-0 scale-100'}`}
                    />
                </Link>

                {/* Desktop Menu */}
                <ul className='hidden lg:flex items-center gap-10'>
                    {menuItems.map((item, idx) => (
                        <li key={idx} className='relative group flex items-center gap-2 transition-transform duration-300 hover:translate-y-[-2px] hover:scale-105'>
                            {item.icon && <Image src={item.icon} width={20} height={20} alt={item.name} />}
                            <Link href={item.link} className='text-gray-700 hover:text-primary font-medium transition'>
                                {item.name}
                            </Link>
                            <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full'></span>
                        </li>
                    ))}
                </ul>

                {/* Right Icons */}
                <div className='flex items-center gap-6'>
                    <div className='relative'>
  {/* Search Button */}
  <button 
    onClick={() => setShowSearch(!showSearch)} 
    className='flex items-center justify-center w-10 h-10 hover:bg-pink-300 rounded-full transition-all duration-300'
  >
    <LuSearch size={22} className='text-gray-600' />
  </button>
</div>

                    {/* Cart */}
                    <Cart />

                    {/* User/Auth */}
                    {!auth ? (
                        <Link href={WEBSITE_LOGIN} className='p-2 hover:bg-gray-100 rounded-full transition-transform duration-200 hover:scale-110'>
                            <MdAccountBox size={24} className='text-gray-600' />
                        </Link>
                    ) : (
                        <Link href={USER_DASHBOARD} className='p-1 rounded-full hover:ring-2 hover:ring-primary transition-transform duration-200 hover:scale-105'>
                            <Avatar>
                                <AvatarImage src={auth?.avatar?.url || userIcon.src} className='text-gray-500'/>
                            </Avatar>
                        </Link>
                    )}

                    {/* Mobile Burger Icon */}
                    <button 
                        className='lg:hidden p-2 hover:bg-gray-100 rounded-full transition-transform duration-200 hover:scale-110'
                        onClick={() => { setIsMobileMenu(true); playClickFeedback(); }}
                    >
                        <div className={`transition-transform duration-300 ${isMobileMenu ? 'rotate-90' : ''}`}>
                            <FaBars size={24} className='text-gray-600'/>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenu && (
                <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40' onClick={() => setIsMobileMenu(false)}></div>
            )}

            {/* Mobile Slide Menu */}
            <div className={`fixed top-16 left-0 bg-white rounded-r-2xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex justify-between items-center p-4 border-b'>
                    <Image src={logo} width={120} height={50} alt='logo' className='transition-transform duration-500 ease-out scale-105'/>
                    {/* <button onClick={() => { setIsMobileMenu(false); playClickFeedback(); }} className='p-2 hover:bg-gray-100 rounded-full transition-transform duration-200 hover:scale-110'>
                        <FaTimes size={24} className='text-gray-600'/>
                    </button> */}
                    <button 
  onClick={() => { setIsMobileMenu(false); playClickFeedback(); }} 
  className='p-2 hover:bg-gray-100 rounded-full transition-transform duration-300 hover:scale-125 hover:rotate-20'
>
  <FaTimes size={24} className={`text-gray-600 transition-transform duration-300 ${isMobileMenu ? 'rotate-0 scale-100' : ''}`} />
</button>

                </div>
                <ul className='flex flex-col gap-4 p-6'>
                    {menuItems.map((item, idx) => (
                        <li key={idx} className='flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition-transform duration-300 hover:translate-x-1 hover:scale-105'>
                            {item.icon && <Image src={item.icon} width={20} height={20} alt={item.name} />}
                            <Link href={item.link} onClick={() => { setIsMobileMenu(false); playClickFeedback(); }}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search Component */}
            <Search isShow={showSearch}/>
        </header>
    )
}

export default Header;