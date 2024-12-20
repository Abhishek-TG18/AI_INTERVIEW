'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../../components/ui/dialogh';
import { Button } from "/components/ui/button";
import {Input} from '/@/components/ui/input.jsx';
import { Textarea } from '/@/components/ui/textarea.jsx';
import { chatSession } from '../../../utils/geminiAi';


function AddNewInterview() {
  const [openstate, setstate] = useState(false);

  const [jobPosition , setJobPosition] = useState();
  const [jobDesc , setJobDesc] = useState();
  const [jobExp , setJobExp] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!jobPosition || !jobDesc || !jobExp) {
      console.error("Please fill out all fields before submitting.");
      return;
    }

    const inputPrompt = `
      JOB POSITION: ${jobPosition}
      Job Description/Tech Stack: ${jobDesc}
      Job Experience: ${jobExp}
      Based on this field, generate 7 real-time interview questions and answers in JSON format.
    `.trim();

    try {
      const result = await chatSession.sendMessage(inputPrompt); // Ensure chatSession is properly initialized
      // console.log(result);
      const data = result.response.candidates[0]?.content?.parts[0]?.text;
      console.log("Generated Interview Questions:", data);
    } catch (error) {
      console.error("An error occurred while generating interview questions:", error);
    }
  };
  
  

  return (
    <div>
     
      <div
        className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setstate(true)}
      >
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>

      <Dialog open={openstate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the job you are interviewing for
            </DialogTitle>
            <DialogDescription>
              Add details about the job position/role, job description, and years of experience.
            </DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={onsubmit}>
          <div className='  mb-0'>
            <label > Job Role/Job Position</label>
            <Input  placeholder=' Ex. Full Stack Developer' required
              onChange={(e)=>setJobPosition(e.target.value)}
            />
            
          </div>
          <div className=' mt-0'>
            <label > Job description / Tech Stack</label>
            <Textarea  placeholder=' Ex. React NodeJS ExpressJS' required 
            onChange={(e)=>setJobDesc(e.target.value)}
            />
            
          </div>
          <div className='  mb-0'>
            <label > Number of years of Experience</label>
            <Input  placeholder=' 3'  type="number" max="50" required
            onChange={(e)=>setJobExp(e.target.value)}
            />
            
          </div>

          <div className='flex gap-5 justify-end mt-4'>
            <Button type="button" variant="ghost" onClick={() => setstate(false)}>Cancel</Button>
            <Button type="submit" onClick={onSubmit} >Start Interview</Button>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview;
