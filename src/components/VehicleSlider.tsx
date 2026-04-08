import React, { useRef, useState } from 'react'
import { motion } from 'motion/react'

import { CarTaxiFront, Car, Bike, Truck, Bus, Ambulance, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export const VEHICLE_CATEGORIES = [
  {
    title: "All Vehicles",
    desc: "Browse the full fleet",
    Icon: CarTaxiFront,
    tag: "popular",
  },
  {
    title: "Cars",
    desc: "Comfortable rides for daily travel",
    Icon: Car,
    tag: "recommended",
  },
  {
    title: "Bikes",
    desc: "Quick and affordable two-wheelers",
    Icon: Bike,
    tag: "Quick",
  },
  {
    title: "Trucks",
    desc: "Heavy vehicles for goods transport",
    Icon: Truck,
    tag: "logistics",
  },
  {
    title: "Buses",
    desc: "Spacious rides for group travel",
    Icon: Bus,
    tag: "group",
  },
  {
    title: "Ambulance",
    desc: "Emergency medical transport",
    Icon: Ambulance,
    tag: "emergency",
  },
];



function VehicleSlider() {
  const [hovered, setHovered] = useState<number | null>()
  const slideRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: "left" | "right") => {
    if (!slideRef.current) return
    slideRef.current.scrollBy({ left: dir == "left" ? -300 : 300, behavior: "smooth" })
  }
  return (
    <div className='w-full bg-white py-20 px-4 overflow-hidden'>
      <div className='max-w-7xl mx-auto '>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className='flex items-end justify-between mb-10'
        >
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <div className='h-px w-8 bg-zinc-900' />
              <span className='text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 '>Fleet</span>

            </div>
            <h2 className='text-3xl md:text-4xl font-black tracking-tight text-zinc-900 leading-none'>
              Vehicle <br />
              <span className='relative inline-block'>Categories
                <motion.div
                  className='absolute -bottom-1 right-0 left-0 h-0.5 bg-zinc-900 origin-left'
                  initial={{ scale: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h2>
            <p className='text-zinc-400 text-sm mt-3 font-medium'>
              Choose the ride that fits your journey
            </p>
          </div>
          <div className='hidden sm:flex items-center gap-2'>
            <motion.div
              whileTap={{ scale: 0.88 }}
              onClick={() => scroll("left")}
              className='w-11 h-11 rounded-2xl border border-zinc-200 flex items-center justify-center
             hover:bg-zinc-900 hover:text-white disabled:opacity-25 disabled:hover:bg-white 
             disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm'
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.88 }}
              onClick={() => scroll("right")}
              className='w-11 h-11 rounded-2xl border border-zinc-200 flex items-center justify-center
             hover:bg-zinc-900 hover:text-white disabled:opacity-25 disabled:hover:bg-white 
             disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm'
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>

        <div className='relative'>
          <div
            ref={slideRef}
            className='flex gap-5 pt-20 overflow-x-auto scroll-smooth pb-4 px-1'
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {
              VEHICLE_CATEGORIES.map((c, i) => {
                const isHovered = hovered == i
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    whileHover={{ y: -8 }}
                    className='group relative min-w-[220px] sm:min-w-[260px] flex-shrink-0 cursor-pointer'
                  >
                    <motion.div
                      animate={{
                        backgroundColor: isHovered ? "#09090b" : "#e4e4e7",
                        boxShadow: isHovered
                          ? "0 24px 56px rgba(0,0,0,0.2)"
                          : "0 2px 16px rgba(0,0,0,0.06)"
                      }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className='relative rounded-3xl border p-6 sm:p-7 overflow-hidden h-full'
                    >
                      <motion.div
                        animate={{
                          color: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(113, 113, 122, 1)",
                          borderColor: isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(209, 209, 214, 1)",
                          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(244, 244, 245, 1)",
                        }}
                        className='inline-flex items-center gap-1.5 border text-[9px] font-black
                              uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full mb-5 transition-colors'
                      >
                        <Sparkles size={8} />
                        {c.tag}
                      </motion.div>

                      <motion.div
                        animate={{
                          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "#f4f4f5",
                          borderColor: isHovered ? "#09090b" : "#e4e4e7",

                        }}
                        className='w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 transition-colors'
                      >
                        <motion.div
                          animate={{
                            color: isHovered ? "#fff" : "#3f3f46",
                          }}
                          transition={{ duration: 0.24 }}
                        >
                          <c.Icon size={24} strokeWidth={1.5} />
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        animate={{
                          color: isHovered ? "#ffffff" : "#09090b",
                        }}
                        transition={{ duration: 0.24 }}
                        className='text-lg font-black leading-none tracking-tight mb-2'
                      >
                        {c.title}
                      </motion.h3>
                      <motion.p
                        animate={{
                          color: isHovered ? "rgba(255, 255, 255, 0.8)" : "#a1a1aa",
                        }}
                        transition={{ duration: 0.24 }}
                        className='text-xs font-medium leading-relaxed'
                      >
                        {c.desc}
                      </motion.p>

                    </motion.div>
                  </motion.div>
                )
              })
            }

          </div>
        </div>


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className='flex items-center gap-6 mt-8 pt-6 border-t border-zinc-100'
        >
          {
            [
              { num: "6+", label: "Categories" },
              { num: "10+", label: "Vehicles types" },
              { num: "24/7", label: "Availability" },
            ].map((item, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className='flex items-center gap-2'
                >
                  <span className='text-2xl font-black text-zinc-900'>{item.num}</span>
                  <span className='text-sm font-medium text-zinc-400'>{item.label}</span>
                </motion.div>
              )
            })
          }

        </motion.div>

      </div>
    </div>
  )
}

export default VehicleSlider