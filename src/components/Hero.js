import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="h-screen w-screen bg-green-500 md:flex font-Poppins">
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center gap-10 p-10 md:p-0">
        <motion.h1 
          className="font-bold text-6xl text-yellow-300 pl-10 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore the Area for Green Building
        </motion.h1>
        
        <motion.button 
          className="p-4 w-44 h-15 bg-blue-600 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          Explore 
        </motion.button>
      </div>
      
      <div className="md:w-1/2 w-full flex items-end md:justify-center justify-end">
        <motion.img 
          src="greenbuilding.png"
          className="w-auto h-96"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </div>
  )
}

export default Hero
