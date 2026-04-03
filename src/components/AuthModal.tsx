'use client'
import React from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react';
import Image from 'next/image';

type propType = {
    open: boolean;
    onClose: () => void;
}
function AuthModal({ open, onClose }: propType) {
    return (
        <>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={onClose}
                        className='fixed inset-0 bg-black/80 z-[90] backdrop-blur-md'
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
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

                            </div>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </>


    )
}

export default AuthModal