import React from 'react'

const Hero = () => {
  return (
    <div className="h-screen w-screen bg-green-500 flex ">
         <div classNamew="w-1/2  flex flex-col justify-center items-center gap-10">
            <h1 className="font-bold text-5xl">Explore the Area for Green Building </h1>
            <button className="p-4 w-40 h-10 bg-blue-600">
                Explore 
            </button>
         </div>
    </div>
  )
}

export default Hero