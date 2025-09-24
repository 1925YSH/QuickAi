import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';


axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

  const imageStyles =['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style'  ]
    
        const [selectedStyle,setSelectedStyle] = useState('Realistic');
    
        const [input , setInput] =useState('');

        const [publish ,setPublish] = useState(false);

        const [loading,setLoading]=useState(false);
        
        const [content,setContent]=useState('');
            
        const {getToken} =useAuth();
        
        const onSubmitHandler = async (e)=> {
          e.preventDefault();
          setLoading(true);

          try {
            
              const prompt =`Generate an image of ${input} in the style ${selectedStyle}`

        const {data} = await axios.post('/api/ai/generate-image',{prompt,publish},{
          
          headers:{ Authorization:`Bearer ${await getToken()}`}
        })

      // console.log("Full response from backend:", data);
        

        if (data.success) {
          setContent(data.content);
          toast.success(data.message);
        }else{
          toast.error(data.message)
           }


          } catch (error) {
            toast.error(error.message)
            console.log(error);
          }

          setLoading(false);
      }

  return (
     <div className='h-full  overflow-y-scroll p-6 flex items-start flex-wrap gap-4
    text-slate-700   '>

      {/* Column 1 */}

        <form  onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-1g border
          border-gray-200 '>

          <div className=' flex items-center gap-3 '>
            <Sparkles className='w-6 text-[#00AD25] ' />
            <h1 className=' text-xl font-semibold '>AI Image Generator</h1>
          </div>
          <p className=' mt-6 text-sm font-medium '>Describe Your Image</p>
       
        <textarea onChange={(e)=> setInput(e.target.value)} value={input}  className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md
         border border-gray-300' required  placeholder='Describe the image you want to generate' rows={4} />
       
        <p className=' mt-4 text-sm font-medium '>Style</p>

      <div className=' mt-3 flex gap-3 flex-wrap sm:max-w-9/11 '>
      {imageStyles.map((item)=>(
        <span key={item} className= {`text-xs px-4 py-1 border rounded-full cursor-pointer  ${selectedStyle=== item ? 'bg-green-50 text-green-700' : 'text-gray-500 border-gray-300' }`} 
        onClick={()=> setSelectedStyle(item)}>{item}</span>
      ) )}
      </div>

      <div className=' my-6 flex items-center gap-2 '> 
            <label className=' relative cursor-pointer '>
              <input type="checkbox" onChange={(e)=>{setPublish(e.target.checked)}}
              checked={publish} className=' sr-only peer ' />

              <div className='w-9 h-5 bg-slate-300 rounded-full
peer-checked:bg-green-500 transition'></div>

              <span className='absolute left-1 top-1 w-3 h-3 bg-white
rounded-full transition peer-checked:translate-x-4' ></span>
            </label>
            <p className='text-sm'>Make this image public</p>
      </div>



       <button disabled={loading} className=' w-full flex justify-center items-center gap-2
        bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6
        text-sm rounded-1g cursor-pointer ' >
          { loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <Image className=' w-5 ' /> }
        Generate image
       </button>

        </form>

{/* Right column */}
<div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>

  {/* Header with Download Button */}
  <div className='flex items-center justify-between mb-2'>
    <div className='flex items-center gap-3'>
      <Image className='w-5 h-5 text-[#00AD25]' />
      <h1 className='text-xl font-semibold'>Generated Image</h1>
    </div>

    {/* Download Button - only show if content exists */}
    {content && (
      <button
        onClick={async () => {
          try {
            // Fetch the image data (works for base64 URLs or external links)
            const response = await fetch(content);
            const blob = await response.blob();

            // Create a temporary link to trigger download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'generated-image.png'; // default file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Image downloaded!");
          } catch (error) {
            toast.error("Failed to download image!");
            console.error(error);
          }
        }}
        className='text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition'
      >
        Download
      </button>
    )}
  </div>

  {/* Content */}
  {!content ? (
    <div className='flex-1 flex justify-center items-center'>
      <div className='text-sm flex flex-col items-center gap-5 text-gray-400'> 
        <Image className='w-9 h-9' />
        <p>Enter a topic and click "Generate image" to get started</p>
      </div>
    </div>
  ) : (
    <div className='mt-3 h-full flex justify-center items-center'>
      <img src={content} alt="image" className='w-full h-full rounded-md' />
    </div>
  )}

</div>



    </div>
  )
}

export default GenerateImages
