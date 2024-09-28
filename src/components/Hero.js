import React from 'react'

const Hero = () => {
  return (
    <div className="h-screen w-screen bg-green-500 md:flex font-Poppins">
         <div className="md:w-1/2 w-full  flex flex-col justify-center items-center gap-10 p-10 md:p-0">
            <h1 className="font-bold text-5xl">Explore the Area for Green Building </h1>
            <button className="p-4 w-44 h-15 bg-blue-600 rounded-full">
                Explore 
            </button>
         </div>
         <div className="md:w-1/2 w-full flex items-end md:justify-center justify-end">
            <img src="greenbuilding.png" />
         </div>
    </div>
  )
}

export default Hero