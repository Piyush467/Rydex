'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, BadgeCheck, CheckCircle, CircleDashed, CreditCard, Landmark, Phone, UploadCloud } from 'lucide-react'
import axios, { AxiosError } from 'axios'

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

function BankPage() {
    const router = useRouter()
    const [accountHolderName, setAccountHolderName] = useState<string>("")
    const [accountNumber, setAccountNumber] = useState<string>("")
    const [ifsc, setIfsc] = useState<string>("")
    const [mobileNumber, setMobileNumber] = useState<string>("")
    const [upi, setUpi] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const sanitizedIfsc = ifsc.trim().toUpperCase()
    const isNameValid = accountHolderName.trim().length > 3
    const isAccountValid =
        /^[0-9]{9,18}$/.test(accountNumber)
    const isIfscValid = IFSC_REGEX.test(sanitizedIfsc)
    const isMobileValid =
        /^[6-9][0-9]{9}$/.test(mobileNumber)

    const canSubmit = isNameValid && isAccountValid && isIfscValid && isMobileValid


    const handleBank = async () => {
        setLoading(false)
        setError("")
        if (!canSubmit) {
            setError("Please fill valid bank details");
            return;
        }
        try {
            setLoading(true)
            const { data } = await axios.post("/api/partner/onboarding/bank", {
                accountHolderName,
                accountNumber,
                ifsc: sanitizedIfsc,
                mobileNumber,
                upi
            })
            setLoading(false)
            console.log(data)

        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            setError(axiosError?.response?.data.message ?? "Something went wrong")
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        const handleGetBank = async () => {
            try {

                const { data } = await axios.get("/api/partner/onboarding/bank")
                setAccountHolderName(
                    data.partnerBank.accountHolderName || ""
                )
                setAccountNumber(data.partnerBank.accountNumber)
                setIfsc(data.partnerBank.ifsc)
                setMobileNumber(data.mobileNumber)
                setUpi(data.partnerBank.upi)
                console.log(data)

            } catch (error: unknown) {
                console.log(error)
            }
        }
        handleGetBank();
    }, [])


    return (
        <div className='min-h-screen bg-white flex items-center justify-center px-4'>
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-xl bg-white rounded-3xl border border-gray-200
        shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8'
            >
                <div className='relative text-center'>
                    <button className='absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300
                                flex items-center justify-center hover:bg-gray-100 transition'
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <p className='text-xs font-medium text-gray-500'>
                        step 3 of 3
                    </p>
                    <h1 className='text-2xl font-bold mt-1'>
                        Bank & Payout Setup
                    </h1>
                    <p className='text-sm text-gray-600 mt-2'>
                        Used for partner payout
                    </p>
                </div>

                <div className='mt-8 space-y-6'>
                    {/* account holder name */}
                    <div>
                        <label htmlFor='bn' className='text-xs font-semibold text-gray-500'>
                            Account holder name
                        </label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-gray-400'><BadgeCheck /></div>
                            <input
                                type='text'
                                id='bn'
                                placeholder='As per bank records'
                                className={`flex-1 border-b pb-2 text-sm focus:outline-none
                                    ${!isNameValid && accountHolderName.length > 0 ? "border-red-400 focus:border-red-500" :
                                        "border-gray-300 focus:border-black"}
                                    `}
                                value={accountHolderName}
                                onChange={(e) => {
                                    setError("");
                                    setAccountHolderName(e.target.value);
                                }}
                            />
                        </div>
                        {!isNameValid && accountHolderName.length > 0 && <p className='mt-1 text-xs text-red-400'>
                            Minimum 3 characters required
                        </p>}
                    </div>
                    {/* account number */}
                    <div>
                        <label htmlFor='bn' className='text-xs font-semibold text-gray-500'>
                            Bank Account Number
                        </label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-gray-400'><CreditCard /></div>
                            <input type='text' id='bn' placeholder='Enter Account Number'
                                className={`flex-1 border-b pb-2 text-sm focus:outline-none
                                    ${!isAccountValid && accountNumber.length > 0 ? "border-red-400 focus:border-red-500" :
                                        "border-gray-300 focus:border-black"}
                                    `}
                                value={accountNumber}
                                onChange={(e) => {
                                    setError("");

                                    setAccountNumber(
                                        e.target.value.replace(/\D/g, "")
                                    );
                                }}
                            />
                        </div>
                        {!isAccountValid && accountNumber.length > 0 && <p className='mt-1 text-xs text-red-400'>
                            Invalid account number
                        </p>}
                    </div>
                    {/* IFSC code */}
                    <div>
                        <label htmlFor='bn' className='text-xs font-semibold text-gray-500'>
                            IFSC code
                        </label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-gray-400'><Landmark /></div>
                            <input type='text' id='bn' placeholder='HDFC001234'
                                className={`flex-1 border-b pb-2 text-sm focus:outline-none
                                    ${!isIfscValid && ifsc.length > 0 ? "border-red-400 focus:border-red-500" :
                                        "border-gray-300 focus:border-black"}
                                    `}
                                value={ifsc.toUpperCase()}
                                onChange={(e) => {
                                    setError("");

                                    setIfsc(
                                        e.target.value.toUpperCase()
                                    );
                                }}
                            />
                        </div>
                        {!isIfscValid && ifsc.length > 0 && <p className='mt-1 text-xs text-red-400'>
                            Invalid IFSC code
                        </p>}
                    </div>
                    {/* mobile number */}
                    <div>
                        <label htmlFor='bn' className='text-xs font-semibold text-gray-500'>
                            Mobile Number
                        </label>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='text-gray-400'><Phone /></div>
                            <input type='text' id='bn' placeholder='Enter your mobile number'
                                className={`flex-1 border-b pb-2 text-sm focus:outline-none
                                    ${!isMobileValid && mobileNumber.length > 0 ? "border-red-400 focus:border-red-500" :
                                        "border-gray-300 focus:border-black"}
                                    `}
                                value={mobileNumber}
                                onChange={(e) => {
                                    setError("");

                                    setMobileNumber(
                                        e.target.value.replace(/\D/g, "")
                                    );
                                }}
                            />
                        </div>
                        {!isMobileValid && mobileNumber.length > 0 && <p className='mt-1 text-xs text-red-400'>
                            Enter a valid 10-digit mobile number
                        </p>}
                    </div>

                    <div>
                        <label htmlFor='bn' className='text-xs font-semibold text-gray-500'>
                            UPI ID (optional)
                        </label>
                        <div className='flex items-center gap-2 mt-2'>

                            <input type='text' id='bn' placeholder='name@upi'
                                className='flex-1 border-b pb-2 text-sm focus:outline-none
                                 border-gray-300 focus:border-black'
                                value={upi}
                                onChange={(e) => {
                                    setError("");
                                    setUpi(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className='text-red-500 text-sm'>{error}</p>
                    )}

                </div>

                <div className='mt-6 flex items-start gap-3 text-xs text-gray-500'>
                    <CheckCircle size={16} className='text-green-600 mt-0.5' />
                    <p> Bank details are verified before first payout.
                        This ususlly takes 24-48 hours
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='mt-8 w-full h-12 bg-black text-white rounded-2xl font-semibold flex
                    items-center justify-center gap-2 disabled:opacity-50 transition flex items-center justify-center'
                    onClick={handleBank}
                    disabled={!canSubmit || loading}
                >
                    {loading ? <CircleDashed className='text-white animate-spin' /> : "Continue"}
                </motion.button>

            </motion.div>
        </div>
    )
}

export default BankPage