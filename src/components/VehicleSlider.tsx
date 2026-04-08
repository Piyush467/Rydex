import React from 'react'
import { motion } from 'motion/react'

import { CarTaxiFront, Car, Bike, Truck, Bus, Ambulance } from "lucide-react";

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
        </motion.div>
      </div>
    </div>
  )
}

export default VehicleSlider