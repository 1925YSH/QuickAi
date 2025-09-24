import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {useClerk ,UserButton ,useUser} from '@clerk/clerk-react'


const Navbar = () => {
  const navigate = useNavigate()

  const {user} = useUser()
  const {openSignIn} = useClerk()

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl 
      flex justify-between items-center py-3 px-6 sm:px-20 xl:px-32">

      {/* Logo Left */}
      <img 
        src={assets.logo} 
        onClick={() => navigate('/')} 
        alt="logo" 
        className="w-32 sm:w-44 cursor-pointer" 
      />

  

      {/* Button Right */}
    
    {/* by using ternary operator we doing - if the user is loggedin we are displaying userbutton and if user is not logged in we are displaying button tag to get started  */}
      
      {
        user ? <UserButton/> : (
                <button onClick={openSignIn}
        className="flex items-center gap-2 rounded-full 
        text-sm cursor-pointer bg-primary text-white px-6 sm:px-10 py-2.5"
      >
        Get Started 
        <ArrowRight className="w-4 h-4" />
      </button>

        )
      }
      
    </div>
  )
}

export default Navbar
