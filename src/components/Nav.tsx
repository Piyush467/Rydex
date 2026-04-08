'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthModal from './AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { Bike, Car, ChevronRight, Truck, User, LogOut, Settings, History, CreditCard, LogOutIcon, X, Menu } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { setUserData } from '@/redux/userSlice'

const Nav_Items = ["Home", "Bookings", "About", "Contact"]
const Nav = () => {
    const pathname = usePathname();
    const [authOpen, setAuthOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { userData } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const handlelogOut = async () => {
        await signOut({ redirect: false })
        dispatch(setUserData(null))
        setProfileOpen(false)
    }
    return (
        <>
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}
            >
                <div className='max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between'>
                    <Image src="/logo.jpeg" alt="Logo" width={44} height={44} priority />
                    <div>
                        {Nav_Items.map((i, index) => {
                            const href = i === "Home" ? "/" : `/${i.toLowerCase()}`;

                            const active = href === pathname;
                            return <Link key={index} href={href} className={`text-sm pl-4 font-medium
                         transition ${active
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}>
                                {i}
                            </Link>
                        })}
                    </div>

                    <div className='flex items-center gap-3 relative'>

                        <div className='hidden md:block relative'>
                            {!userData ? (
                                <button className='px-4 py-1.5 bg-white text-black rounded-full font-semibold shadow-xl'
                                    onClick={() => setAuthOpen(true)}
                                >
                                    Login
                                </button>
                            ) : (
                                <>
                                    <button className='w-11 h-11 rounded-full bg-white text-black font-bold'
                                        onClick={() => setProfileOpen(p => !p)}
                                    >
                                        {userData?.name?.charAt(0)?.toUpperCase()}
                                    </button>

                                    <AnimatePresence>
                                        {profileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className='absolute top-14 right-0 w-max bg-white text-black rounded-2xl shadow-xl p-4 border border-gray-200'
                                            >
                                                <div className='p-5'>
                                                    <p className='font-semibold text-lg'>{userData.name}</p>
                                                    <p className='text-sm uppercase mb-4 text-gray-500'>{userData.role}</p>
                                                    {userData.role != "partner" && (
                                                        <div className='w-full flex items-center gap-6 py-3 hover:bg-gray-100 rounded-xl'>
                                                            <div className='flex -space-x-2'>
                                                                <div className='bg-gray-100 p-1 rounded-full'><Bike size={16} /></div>
                                                                <div className='bg-gray-100 p-1 rounded-full'><Car size={16} /></div>
                                                                <div className='bg-gray-100 p-1 rounded-full'><Truck size={16} /></div>
                                                            </div>
                                                            Become a Partner
                                                            <ChevronRight size={16} className='ml-auto' />
                                                        </div>
                                                    )}

                                                    <button className='w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl mt-2 '
                                                        onClick={handlelogOut}
                                                    >
                                                        <LogOutIcon size={16} />
                                                        Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </>
                            )
                            }
                        </div>

                        {/* for mobiles */}
                        <div className='md:hidden '>
                            {!userData ? (
                                <button className='px-4 py-1.5 bg-white text-black rounded-full font-semibold shadow-xl'
                                    onClick={() => setAuthOpen(true)}
                                >
                                    Login
                                </button>
                            ) : (
                                <>
                                    <button className='w-11 h-11 rounded-full bg-white text-black font-bold'
                                        onClick={() => setProfileOpen(p => !p)}
                                    >
                                        {userData?.name?.charAt(0)?.toUpperCase()}
                                    </button>



                                </>
                            )
                            }
                        </div>

                        <button className='md:hidden text-white ' onClick={() => setMenuOpen(p => !p)}>
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                    </div>
                </div>

            </motion.div>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className='fixed top-[80px] left-[4%] w-52 bg-[#0B0B0B] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40 md:hidden overflow-hidden'
                        >
                            <div className='flex flex-col p-2'>
                                {Nav_Items.map((i, index) => {
                                    const href = i === "Home" ? "/" : `/${i.toLowerCase()}`;

                                    const active = href === pathname;
                                    return (
                                        <Link
                                            key={index}
                                            href={href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`text-base py-4 px-6 font-medium transition-all rounded-xl ${active
                                                ? "bg-white text-black"
                                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {i}
                                        </Link>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {profileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setProfileOpen(false)}
                        className='fixed insert-0 bg-black z-30 md:hidden'
                    >
                        <motion.div
                            initial={{ y: 400 }}
                            animate={{ y: 0 }}
                            exit={{ y: 400 }}
                            transition={{ type: "spring", damping: 25 }}
                            className='fixed insert-x-0 bottom-0 bg-white w-full rounded-t-3xl shadow-2xl z-50 md:hidden'
                        >
                            <div className='p-5'>
                                <p className='font-semibold text-lg'>{userData?.name}</p>
                                <p className='text-sm uppercase mb-4 text-gray-500'>{userData?.role}</p>
                                {userData?.role != "partner" && (
                                    <div className='w-full flex items-center gap-6 py-3 hover:bg-gray-100 rounded-xl'>
                                        <div className='flex -space-x-2'>
                                            <div className='bg-gray-100 p-1 rounded-full'><Bike size={16} /></div>
                                            <div className='bg-gray-100 p-1 rounded-full'><Car size={16} /></div>
                                            <div className='bg-gray-100 p-1 rounded-full'><Truck size={16} /></div>
                                        </div>
                                        Become a Partner
                                        <ChevronRight size={16} className='ml-auto' />
                                    </div>
                                )}

                                <button className='w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl mt-2 '
                                    onClick={handlelogOut}
                                >
                                    <LogOutIcon size={16} />
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    )
}

export default Nav