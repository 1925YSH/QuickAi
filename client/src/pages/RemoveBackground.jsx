import { Eraser, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';


axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {

        const [input , setInput] =useState('');

        const [loading,setLoading]=useState(false);
               
        const [content,setContent]=useState('');
                    
        const {getToken} =useAuth();
    
        const onSubmitHandler = async (e)=> {
          e.preventDefault();

          setLoading(true);
          try {
            
            const formData = new FormData();
            formData.append('image',input);

        const {data} = await axios.post('/api/ai/remove-image-background',formData,{
          
          headers:{ Authorization:`Bearer ${await getToken()}`,
                  'Content-Type': 'multipart/form-data',  
        }
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
            <Sparkles className='w-6 text-[#FF4938] ' />
            <h1 className=' text-xl font-semibold '>Background Remover</h1>
          </div>
          <p className=' mt-6 text-sm font-medium '>Upload image</p>
       
        <input onChange={(e)=> setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md
         border border-gray-300 text-gray-600' required />
       
      <p className=' text-sm text-gray-500 font-light mt-1 '>Supports JPG, PNG, and other image formats</p>

       <button disabled={loading} className=' w-full flex justify-center items-center gap-2
        bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6
        text-sm rounded-1g cursor-pointer ' >
        { loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> :  <Eraser className=' w-5 ' /> }
       
        Remove background
       </button>
        </form>

 {/* Right column */}
<div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>

  {/* Header with Download Button */}
  <div className='flex items-center justify-between mb-2'>
    <div className='flex items-center gap-3'>
      <Eraser className='w-5 h-5 text-[#FF4938]' />
      <h1 className='text-xl font-semibold'>Processed Image</h1>
    </div>

    {/* Download Button - only show if content exists */}
    {content && (
      <button
        onClick={async () => {
          try {
            // Fetch the processed image
            const response = await fetch(content);
            const blob = await response.blob();

            // Create a temporary link to download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'processed-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Image downloaded!");
          } catch (error) {
            toast.error("Failed to download image!");
            console.error(error);
          }
        }}
        className='text-sm bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition'
      >
        Download
      </button>
    )}
  </div>

  {/* Content */}
  {!content ? (
    <div className='flex-1 flex justify-center items-center'>
      <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
        <Eraser className='w-9 h-9' />
        <p>Upload an image and click "Remove background" to get started</p>
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

export default RemoveBackground
