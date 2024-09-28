import Link from 'next/link'
import React from 'react'


const Navbar = () => {
  return (
    <div>
      <nav className="bg-yellow-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/">MyLogo</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-white">Home</Link>
          <Link href="/about" className="text-white">About</Link>
          <Link href="/contact" className="text-white">Contact</Link>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar
