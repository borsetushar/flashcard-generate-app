import React from 'react'
import AlmaBetter from './Images/AlmaBetter.png'

function Header() {
  return (
    <div>
       <header className="flex items-center justify-between px-4 py-4 bg-white shadow-md sm:px-6">
         <img src={AlmaBetter} alt="Logo" className="w-32 h-auto sm:w-40 sm:h-auto p-0"></img>
      </header>
    </div>
  )
}

export default Header;
