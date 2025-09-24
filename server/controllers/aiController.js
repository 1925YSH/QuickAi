
// Creating function for generate Article

import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
//import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import { error } from "console";
import {cloudinary} from "../config/cloudinary.js";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// API for generating Article 

export const generateArticle = async(req,resp)=>{

    try {
       // console.log("Request body:", req.body);  // debug log
        const {userId }= req.auth();

        const {prompt ,length} = req.body;

        const plan =req.plan;

        const free_usage = req.free_usage;

        //if user does not have premium plan
        if ( plan !== 'premium' && free_usage >=10) {
            
            //Agar plan premium nhi hai or 10 bar free m use kr liya hai toh 11 baar vo article generate nhi krr skta

            return resp.json({success:false ,message:"Limit reaches . Upgrade to continue"})
        }

        //if user have premium pkan and have available limits
        
        const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature:0.7,
    max_tokens:Number(length),
});

const content = response.choices[0].message.content

await sql`INSERT INTO creations (userid,prompt,content,type) VALUES (${userId},${prompt},${content},'article') `;

if ( plan!== 'premium') {
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage + 1 
        }
    })
}

resp.json({success:true,content,message:"Article generated"})

    } catch (error) {
        console.log(error.message);
        resp.json({success:false,message:error.message})
        
    }
}


// API for generating Blog titles 

    export const generateBlogTitle = async(req,resp)=>{

    try {
        
        const {userId }= req.auth();

        const {prompt} = req.body;

        const plan =req.plan;

        const free_usage = req.free_usage;

        //if user does not have premium plan
        if ( plan !== 'premium' && free_usage >=10) {
            
            //Agar plan premium nhi hai or 10 bar free m use kr liya hai toh 11 baar vo article generate nhi krr skta

            return resp.json({success:false ,message:"Limit reaches . Upgrade to continue"})
        }

        //if user have premium pkan and have available limits
        
        const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [{ role: "user",content: prompt,},], 
    temperature:0.7,
    max_tokens:100,
});

const content = response.choices[0].message.content

await sql`INSERT INTO creations (userid,prompt,content,type) VALUES (${userId},${prompt},${content},'blog-title') `;

if ( plan!== 'premium') {
    await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:{
            free_usage:free_usage + 1 
        }
    })
}

    resp.json({success:true,content,message:"Blog title generated"})

    } catch (error) {
        console.log(error.message);
        resp.json({success:false,message:error.message})
        
    }
}

// API for generating Image


export const generateImage = async (req, resp) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    console.log("Plan:", plan, "Free Usage:", free_usage);

    if (plan !== "premium" && free_usage >= 10) {
      return resp.json({
        success: false,
        message: "Upgrade to premium subscription for more image generation",
      });
    }

    // ClipDrop API
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer", // <-- binary buffer
      }
    );

    // ✅ Upload raw buffer to Cloudinary
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer(data);

    await sql`
      INSERT INTO creations (userid, prompt, content, type, publish) 
      VALUES (${userId}, ${prompt}, ${result.secure_url}, 'image', ${publish ?? false})
    `;


     // ✅ Update Clerk free_usage only for free users
    if (plan !== "premium") {
  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      free_usage: free_usage + 1,
    },
  });
}
     console.log("Plan:", plan, "Free Usage:", free_usage);

    resp.json({ success: true, content: result.secure_url ,message:"Image generated"});
  } catch (error) {
    console.error(error);
    resp.json({ success: false, message: error.message || "Error occurred" });
  }
};

// API to remove background of image

export const removeImageBackground = async(req,resp)=>{

    try {
        
        const {userId  }= req.auth();

        const image = req.file;

        const plan =req.plan;

        const free_usage = req.free_usage;

         if (!image) {
      return resp.status(400).json({ success:false, message:error.message });
    }

        //if user does not have premium plan
        if ( plan !== 'premium' && free_usage >=10) {
            
            //Agar plan premium nhi hai or 10 bar free m use kr liya hai toh 11 baar vo article generate nhi krr skta

            return resp.json({success:false,message:"This feature is only available for premium subscription"})
        }

        //if user have premium plan and have available limits
        
        // we will use cloudinary to remove background of images 
      
    // ✅ changed upload method: using buffer + stream
    const { secure_url } = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          transformation: [
            {
              effect: "background_removal",
              background_removal: "remove_the_background",
            },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(image.buffer).pipe(stream); // ✅ use buffer
    });

    await sql`
      INSERT INTO creations (userid, prompt, content, type) 
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;


    resp.json({success:true,content:secure_url,message:"Background removed"})

    } catch (error) {
        console.log(error);
        resp.json({success:false,message:error.message})
        
    }
}

// API to remove object from image

export const removeImageObject = async(req,resp)=>{

    try {
        
        const {userId}= req.auth();
        const {object}= req.body ;

        const image = req.file;

        const plan =req.plan;

        const free_usage = req.free_usage;

        //if user does not have premium plan
        if ( plan !== 'premium' && free_usage >=10) {
            
            //Agar plan premium nhi hai or 10 bar free m use kr liya hai toh 11 baar vo article generate nhi krr skta

            return resp.json({success:false,message:"This feature is only available for premium subscription"})
        }

         if (!req.file) {
       return resp.json({ success: false, message: "No file uploaded" });
    }

        //if user have premium plan and have available limits
        
        // we will use cloudinary to remove background of images 

        //Storing image in cloud using cloudinary
    // ✅ Upload to cloudinary using buffer
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          transformation: [{ effect: `gen_remove:${object}` }],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    await sql`
      INSERT INTO creations (userid, prompt, content, type) 
      VALUES (${userId}, ${`Remove ${object} from image`}, ${result.secure_url}, 'image') 
    `;

    resp.json({success:true,content:result.secure_url,message:"Object removed"})

    } catch (error) {
        console.log(error.message);
        resp.json({success:false,message:error.message})
        
    }
}

// API to review resume

export const resumeReview = async(req,resp)=>{

    try {
        
        const {userId}= req.auth();
        const resume = req.file;

        const plan =req.plan;

       const free_usage = req.free_usage;

        //if user does not have premium plan
        if ( plan !== 'premium' && free_usage >=10) {
            
            //Agar plan premium nhi hai or 10 bar free m use kr liya hai toh 11 baar vo article generate nhi krr skta

            return resp.json({success:false,message:"This feature is only available for premium subscription"})
        }

          if (!req.file) {
       return resp.json({ success: false, message: "No file uploaded" });
    }
        //if user have premium plan and have available limits
        
        // Now we will check the size of the resume
        if (resume.size > 5*1024*1024) {
            return resp.json({success:false,message:"Resume file size exceeds allowed size (5MB)."})
        }
        // If resume file size is less than 5 mb we will convert the resume into data buffer for that we will use the file system

      // Use buffer directly
const dataBuffer = resume.buffer;

// Parse the PDF
const pdfData = await pdf(dataBuffer);

const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

const response = await AI.chat.completions.create({
  model: "gemini-2.0-flash",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.7,
  max_tokens: 1000,
});

const content = response.choices[0].message.content;

await sql`
  INSERT INTO creations (userid, prompt, content, type)
  VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')
`;

    resp.json({success:true,content,message:"Resume review"})

    } catch (error) {
        console.log(error.message);
        resp.json({success:false,message:error.message})
        
    }
}