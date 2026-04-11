'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileCheck, UploadCloud } from 'lucide-react'

function DocumentsPage() {
    const router = useRouter()
    return (
        <div className='min-h-screen bg-white flex items-center justify-center px-4'>
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-xl bg-white rounded-3xl border 
            border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8'
            >
                <div className='relative text-center'>
                    <button className='absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300
                                        flex items-center justify-center hover:bg-gray-100 transition'
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <p className='text-xs font-medium text-gray-500'>
                        step 2 of 3
                    </p>
                    <h1 className='text-2xl font-bold mt-1'>
                        Upload Documents
                    </h1>
                    <p className='text-sm text-gray-600 mt-2'>
                        Required for verification
                    </p>
                </div>

                <div className='mt-8 space-y-6'>
                    {/* document cards */}
                    <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center justify-between p-4 rounded-2xl border border-gray-200
                    cursor-pointer hover:border-black transition'
                    >
                        <div>
                            <p className='text-sm font-semibold'>Aadhar / ID Proof</p>
                            <p className='text-xs text-gray-500'>Government issued ID</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-400'>Upload</span>
                            <div className='w-5 h-5 rounded-full border border-gray-300
                                        flex items-center justify-center hover:bg-gray-100 transition'
                            >
                                <UploadCloud size={18} />
                            </div>
                        </div>
                    </motion.label>

                    <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center justify-between p-4 rounded-2xl border border-gray-200
                    cursor-pointer hover:border-black transition'
                    >
                        <div>
                            <p className='text-sm font-semibold'>Driving License</p>
                            <p className='text-xs text-gray-500'>Valid Driving License</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-400'>Upload</span>
                            <div className='w-5 h-5 rounded-full border border-gray-300
                                        flex items-center justify-center hover:bg-gray-100 transition'
                            >
                                <UploadCloud size={18} />
                            </div>
                        </div>
                    </motion.label>

                    <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center justify-between p-4 rounded-2xl border border-gray-200
                    cursor-pointer hover:border-black transition'
                    >
                        <div>
                            <p className='text-sm font-semibold'>Vehicle Rc</p>
                            <p className='text-xs text-gray-500'>Vehicle Registration Certificate</p>
                        </div>
                        <div>
                            <span className='text-xs text-gray-400'>Upload</span>
                            <div className='w-5 h-5 rounded-full border border-gray-300
                                        flex items-center justify-center hover:bg-gray-100 transition'
                            >
                                <UploadCloud size={18} />
                            </div>
                        </div>
                    </motion.label>
                </div>

                <div className='mt-6 flex items-start gap-3 text-xs text-gray-500'>
                    <FileCheck size={16} className='mt-0.5' />
                    <p>
                        Documents are securely stored and manually verified by our team.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='mt-8 w-full h-12 bg-black text-white rounded-2xl font-semibold flex 
                        items-center justify-center gap-2 disabled:opacity-50 transition'
                    onClick={() => router.push('/partner/onboarding/documents')}
                >
                    Continue
                </motion.button>

            </motion.div>

        </div>
    )
}

export default DocumentsPage