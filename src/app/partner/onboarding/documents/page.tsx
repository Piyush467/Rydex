'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CircleDashed, FileCheck, UploadCloud } from 'lucide-react'
import axios from 'axios'

type docsType = "aadhar" | "license" | "rc"
function DocumentsPage() {
    const router = useRouter()
    const [docs, setDocs] = useState<Record<docsType, File | null>>({
        aadhar: null,
        license: null,
        rc: null
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleDocs = async () => {
        setLoading(false)
        setError("")
        try {
            setLoading(true)
            const formdata = new FormData()
            if (!docs.aadhar || !docs.license || !docs.rc) {
                setError("Please upload all documents")
                setLoading(false)
                return null
            }
            formdata.append("aadhar", docs.aadhar)
            formdata.append("license", docs.license)
            formdata.append("rc", docs.rc)

            const { data } = await axios.post("/api/partner/onboarding/documents", formdata)
            setLoading(false)

        } catch (error: any) {
            setError(error?.response?.data.message ?? "Something went wrong")
            setLoading(false)
        }
    }

    const handleImage = (doc: docsType, file: File | null) => {
        if (!file) {
            return
        }
        setDocs(prev => ({ ...prev, [doc]: file }))
    }
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
                        <input type="file" hidden accept="image/*.pdf"
                            onChange={(e) => handleImage("aadhar", e.target.files?.[0] ?? null)}
                        />
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
                        <input type="file" hidden accept="image/*.pdf"
                            onChange={(e) => handleImage("license", e.target.files?.[0] ?? null)}
                        />
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
                        <input type="file" hidden accept="image/*.pdf"
                            onChange={(e) => handleImage("rc", e.target.files?.[0] ?? null)}
                        />
                    </motion.label>
                </div>

                <div className='mt-6 flex items-start gap-3 text-xs text-gray-500'>
                    <FileCheck size={16} className='mt-0.5' />
                    <p>
                        Documents are securely stored and manually verified by our team.
                    </p>
                </div>
                {error && (
                    <p className='text-red-500 text-sm mt-2'>{error}</p>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    disabled={loading}
                    whileTap={{ scale: 0.98 }}
                    className='mt-8 w-full h-12 bg-black text-white rounded-2xl font-semibold flex 
                        items-center justify-center gap-2 disabled:opacity-50 transition'
                    onClick={handleDocs}
                >
                    {loading ? <CircleDashed className='text-white animate-spin' /> : "Continue"}
                </motion.button>

            </motion.div>

        </div>
    )
}

export default DocumentsPage