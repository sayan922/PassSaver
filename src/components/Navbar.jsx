// import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-20 text-white bg-slate-800 min-h-20">
        <h1 className="font-bold">
            <span className="text-green-500">&lt;</span>
            Pass<span className="text-green-500">Saver</span>
            <span className="text-green-500">&gt;</span>
        </h1>
        <ul className="flex gap -20 Nav ">
            <li className="hover:text-green-500"><a href="/">Contact Us</a></li>
            
        </ul>
    </nav>
  )
}

export default Navbar
