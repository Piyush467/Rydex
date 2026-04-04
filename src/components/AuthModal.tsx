'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CircleDashed, Lock, Mail, User, X } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

type propType = {
    open: boolean;
    onClose: () => void;
}

type stepType = "login" | "signup" | "otp";

function AuthModal({ open, onClose }: propType) {

    const [step, setStep] = useState<stepType>("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/auth/register", { name, email, password });
            console.log(data);
            setLoading(false);
        }
        catch (error: any) {
            setLoading(false);
            console.log(error.response.data.message);
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 bg-black/80 z-[90] backdrop-blur-md'
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className='fixed inset-0 z-[100] flex items-center justify-center px-4'
                        >
                            <div className='relative w-full max-w-md rounded-3xl bg-white text-black border border-black/10 shadow-[0_40px_100px_rgba(0,0,0,0.35)] p-6 sm:p-8'>
                                <div className='absolute top-4 right-4 z-10 text-gray-500 hover:text-black cursor-pointer 
                                  transition'
                                    onClick={onClose}>
                                    <X size={24} />
                                </div>

                                <div className='mb-6 text-center'>
                                    <h1 className='text-3xl font-extrabold tracking-widest'>RYDEX</h1>
                                    <p className=' mt-1 text-xs text-gray-600'>Premium rides at affordable prices</p>
                                </div>

                                <button className='w-full h-11 rounded-xl flex items-center justify-center gap-3 border border-black/20 text-sm font-semibold hover:bg-black hover:text-white transition'>
                                    <Image src={"/google.png"} alt='google' width={20} height={20} />
                                    Continue with Google
                                </button>

                                <div className='flex items-center gap-3 my-6'>
                                    <div className='flex-1 h-[1px] bg-black/10' />
                                    <div className='text-xs text-gray-500 uppercase'>OR</div>
                                    <div className='flex-1 h-[1px] bg-black/10' />
                                </div>

                                <div>
                                    {step == "login" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <h1 className='text-xl font-semibold'>Welcome back</h1>
                                            <div className='mt-5 space-y-4'>
                                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                    <Mail size={18} className='text-gray-500' />
                                                    <input type="email" placeholder='Email address'
                                                        className='outline-none w-full text-sm bg-transparent'
                                                        onChange={(e) => setEmail(e.target.value)} value={email}
                                                    />
                                                </div>

                                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                    <Lock size={18} className='text-gray-500' />
                                                    <input type="password" placeholder='Password'
                                                        className='outline-none w-full text-sm bg-transparent'
                                                        onChange={(e) => setPassword(e.target.value)} value={password}
                                                    />
                                                </div>

                                                <button className='w-full h-11 rounded-xl bg-black text-white text-sm font-semibold hover:bg-black/90 transition'>
                                                    Login
                                                </button>

                                            </div>
                                            <p className='text-center text-sm mt-6 text-gray-600'>Don't have an account? <span className='text-black font-semibold cursor-pointer'
                                                onClick={() => setStep("signup")}>Sign up</span></p>

                                        </motion.div>
                                    )}

                                    {step == "signup" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <h1 className='text-xl font-semibold'>Create account</h1>
                                            <div className='mt-5 space-y-4'>
                                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                    <User size={18} className='text-gray-500' />
                                                    <input type="text" placeholder='Full name'
                                                        className='outline-none w-full text-sm bg-transparent'
                                                        onChange={(e) => setName(e.target.value)} value={name}
                                                    />
                                                </div>
                                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                    <Mail size={18} className='text-gray-500' />
                                                    <input type="email" placeholder='Email address'
                                                        className='outline-none w-full text-sm bg-transparent'
                                                        onChange={(e) => setEmail(e.target.value)} value={email}
                                                    />
                                                </div>

                                                <div className='flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3'>
                                                    <Lock size={18} className='text-gray-500' />
                                                    <input type="password" placeholder='Password'
                                                        className='outline-none w-full text-sm bg-transparent'
                                                        onChange={(e) => setPassword(e.target.value)} value={password}
                                                    />
                                                </div>

                                                <button className='w-full h-11 rounded-xl bg-black text-white text-sm font-semibold hover:bg-black/90 transition'
                                                    disabled={loading}
                                                    onClick={handleSignUp}
                                                >
                                                    {!loading ? "Sign up" : <CircleDashed size={18} color='white' className='animate-spin mx-auto' />}
                                                </button>

                                            </div>
                                            <p className='text-center text-sm mt-6 text-gray-600'>
                                                Already have an account?
                                                <span className='text-black font-semibold cursor-pointer'
                                                    onClick={() => setStep("login")}>Login</span>
                                            </p>

                                        </motion.div>
                                    )}
                                </div>


                            </div>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>


    )
}

export default AuthModal