'use client'
import React from 'react'
import { motion } from 'motion/react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


function Footer() {
  return (
    <div className='w-full bg-black text-white'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className='max-w-7xl mx-auto px-6 md:px-12 py-16'
      >
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
          <div>
            <h3 className='text-2xl font-bold mb-4 tracking-wider'>Rydex</h3>
            <p className='text-gray-400'>Ride with ease and comfort</p>

            <div className='flex gap-4 mt-6'>
              {[FaFacebook, FaInstagram, FaXTwitter, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className='text-gray-400 hover:text-white'
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className='text-2xl font-bold mb-4 tracking-wider'>About</h3>
            <ul className='space-y-2'>
              <li><a href="#" className='text-gray-400 hover:text-white'>About Us</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>Contact Us</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>Privacy Policy</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className='text-2xl font-bold mb-4'>Services</h3>
            <ul className='space-y-2'>
              <li><a href="#" className='text-gray-400 hover:text-white'>Car Rental</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>Bike Rental</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>Truck Rental</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>Bus Rental</a></li>
            </ul>
          </div>
          <div>
            <h3 className='text-2xl font-bold mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li><a href="#" className='text-gray-400 hover:text-white'>+1234567890</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>rydex@gmail.com</a></li>
              <li><a href="#" className='text-gray-400 hover:text-white'>123 Main St, Anytown, India</a></li>
            </ul>
          </div>
        </div>
      </motion.div>
      

    </div>
  )
}

export default Footer

