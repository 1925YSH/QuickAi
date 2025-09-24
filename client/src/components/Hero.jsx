import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { X } from 'lucide-react'

const Hero = () => {
  const navigate = useNavigate()
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

      {/* Hero Content */}
      <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
          Create amazing content <br /> with <span className='text-primary'>AI tools</span>
        </h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button
          onClick={() => navigate('/ai')}
          className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'
        >
          Start creating now
        </button>

        {/* Watch Demo Button */}
        <button
          onClick={() => setShowDemo(true)}
          className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 transition cursor-pointer'
        >
          Watch demo
        </button>
      </div>

      {/* Trust Badge */}
      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600 '>
        <img src={assets.user_group} alt="usergroup" className='h-8' /> Trusted by 10k+ people
      </div>

      {/* Demo Video Popup */}
      {showDemo && (
  <div 
    className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
    onClick={() => setShowDemo(false)} // closes when clicking outside video
  >
    <div 
      className="relative bg-white rounded-2xl shadow-lg w-[90%] md:w-[70%] lg:w-[60%] max-w-3xl overflow-hidden"
      onClick={(e) => e.stopPropagation()} // prevent close when clicking video
    >
      {/* Close Button */}
      <button
        onClick={() => setShowDemo(false)}
        className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
      >
        <X className="w-5 h-5 text-gray-700 cursor-pointer" />
      </button>

      {/* Video */}
      {/* <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Demo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}

      <div className="aspect-video">
  <video
    className="w-full h-full rounded-xl"
    src="/videos/demo.mp4"   // 👈 put your file in /public/videos/demo.mp4
    controls
    autoPlay
  />
</div>
    </div>
  </div>
)}

    </div>
  )
}

export default Hero
