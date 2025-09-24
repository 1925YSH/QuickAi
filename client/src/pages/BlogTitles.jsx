import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown'

axios.defaults.baseURL= import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {

  const blogCategories =[ 'General' , 'Technology' , 'Business' , 'Health' ,'Lifestyle','Travel' , 'Food' ,'Education' ]
  
      const [selectedCategory,setSelectedCategory] = useState('General');
      const [loading,setLoading]=useState(false);
      const [input , setInput] =useState('');
      const [content,setContent]=useState('');
    
      const {getToken} =useAuth()

      const onSubmitHandler = async (e)=> {
        e.preventDefault();

        try {
           setLoading(true);
        const prompt =`Write a blog title for the keyword ${input} in the category ${selectedCategory}`

        const {data} = await axios.post('/api/ai/generate-blog-title',{prompt},{
          
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
            <Sparkles className='w-6 text-[#8E37EB] ' />
            <h1 className=' text-xl font-semibold '>AI Title Generator</h1>
          </div>
          <p className=' mt-6 text-sm font-medium '>Keyword</p>
       
        <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md
         border border-gray-300' required  placeholder='The future of AI is...'/>
       
        <p className=' mt-4 text-sm font-medium '>Category</p>

      <div className=' mt-3 flex gap-3 flex-wrap sm:max-w-9/11 '>
      {blogCategories.map((item)=>(
        <span key={item} className= {`text-xs px-4 py-1 border rounded-full cursor-pointer  ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300' }`} 
        onClick={()=> setSelectedCategory(item)}>{item}</span>
      ) )}
      </div>
       <br />

       <button disabled={loading}  className=' w-full flex justify-center items-center gap-2
        bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6
        text-sm rounded-1g cursor-pointer ' >
       
       {loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> :<Hash className=' w-5 ' />}
       Generate title
       </button>
        </form>

   {/* Right column */}
<div className='w-full max-w-lg p-4 bg-white rounded-1g flex flex-col border border-gray-200 min-h-96'>

  {/* Header with Copy Button */}
  <div className='flex items-center justify-between mb-2'>
    <div className='flex items-center gap-3'>
      <Hash className='w-5 h-5 text-[#8E37EB]' />
      <h1 className='text-xl font-semibold'>Generated Title</h1>
    </div>

    {/* Copy Button - only show if content exists */}
    {content && (
      <button
        onClick={() => {
          navigator.clipboard.writeText(content);
          toast.success("Title copied to clipboard!");
        }}
        className='text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-200 transition'
      >
        Copy
      </button>
    )}
  </div>

  {/* Content */}
  {!content ? (
    <div className='flex-1 flex justify-center items-center'>
      <div className='text-sm flex flex-col items-center gap-5 text-gray-400'> 
        <Hash className='w-9 h-9' />
        <p>Enter a topic and click "Generate title" to get started</p>
      </div>
    </div>
  ) : (
    <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
      <div className='reset-tw'>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )}

</div>


    </div>
  )
}

export default BlogTitles
