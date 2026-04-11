'use client'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bike, Car, Package, Truck } from 'lucide-react'
const VEHICLES = [
    { id: "bike", label: "Bike", icon: Bike, desc: "2 wheeler" },
    { id: "car", label: "Car", icon: Car, desc: "4 wheeler" },
    { id: "truck", label: "Truck", icon: Truck, desc: "4 wheeler" },
    { id: "auto", label: "Auto", icon: Car, desc: "3 wheeler" },
    { id: "loading", label: "Loading", icon: Package, desc: "Loading" },
]

function VehiclePage() {
    const router = useRouter()
    const [vehicleType, setVehicleType] = useState<string>("")
    const [vehicleNumber, setVehicleNumber] = useState<string>("")
    const [vehicleModel, setVehicleModel] = useState<string>("")
    return (
        <div className='min-h-screen bg-white flex items-center justify-center px-4'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8'
            >
                <div className='relative text-center'>
                    <button className='absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-300
                                        flex items-center justify-center hover:bg-gray-100 transition'
                        onClick={() => router.back()}
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <p className='text-xs font-medium text-gray-500'>
                        step 1 of 3
                    </p>
                    <h1 className='text-2xl font-bold mt-1'>
                        Vehicle Details
                    </h1>
                    <p className='text-sm text-gray-600 mt-2'>
                        Add your vehicle information
                    </p>
                </div>


                <div className='mt-8 space-y-6'>
                    {/* vehicles types cards */}
                    <div>
                        <p className='text-xs font-semibold text-gray-500 mb-3'>
                            Vehicle Type
                        </p>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                            {VEHICLES.map((v) => {
                                const Icon = v.icon
                                const active = vehicleType === v.id

                                return (
                                    <motion.div
                                        key={v.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setVehicleType(v.id)}
                                        className={`
                                             p-4 rounded-2xl border flex flex-col items-center gap-2 transition
                                           ${active
                                                ? "border-black bg-black text-white"
                                                : "border-gray-200  hover:border-black"
                                            }
            `}
                                    >
                                        <div className={`w-11 h-11 rounded-full flex items-center justify-center
                    ${active
                                                ? "bg-white text-black"
                                                : "bg-black text-white"
                                            }
                    `}>
                                            <Icon size={24} />

                                        </div>
                                        <div className='text-sm font-semibold'>
                                            {v.label}
                                        </div>
                                        <p className={`text-xs ${active
                                            ? "text-gray-300"
                                            : "text-gray-500"
                                            }`}>
                                            {v.desc}
                                        </p>

                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                    {/* vehicle number */}
                    <div>
                        <label htmlFor='vn' className='text-xs font-semibold text-gray-500'>
                            Vehicle Number
                        </label>
                        <input
                            type='text'
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            value={vehicleNumber}
                            placeholder='e.g. DL 12 AB 1234'
                            id='vn'
                            className='w-full mt-2 pb-2  border-b border-gray-300 text-sm focus:border-black outline-none transition'
                        />
                    </div>
                    {/* vehicle model */}
                    <div>
                        <label htmlFor='vm' className='text-xs font-semibold text-gray-500'>
                            Vehicle Model
                        </label>
                        <input
                            type='text'
                            onChange={(e) => setVehicleModel(e.target.value)}
                            value={vehicleModel}
                            placeholder='Tata Ace'
                            id='vm'
                            className='w-full mt-2 pb-2  border-b border-gray-300 text-sm focus:border-black outline-none transition'
                        />
                    </div>
                </div>
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    className='w-full mt-8 h-14 rounded-2xl bg-black text-white py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition'
                >
                    Continue
                </motion.button>
            </motion.div>

        </div>
    )
}

export default VehiclePage