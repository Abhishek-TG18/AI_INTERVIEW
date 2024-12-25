'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../../components/ui/dialogh';
import { Button } from '/components/ui/button';
import { Input } from '/@/components/ui/input.jsx';
import { Textarea } from '/@/components/ui/textarea.jsx';
import { chatSession } from '../../../utils/geminiAi';
import { LoaderPinwheelIcon } from 'lucide-react';
// import MockInterview from '../../../utils/schema.js';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

import {db} from '../../../utils/db';
import {MockInterview} from '../../../utils/schema'
import { useRouter } from 'next/navigation';



function AddNewInterview() {
  const [openState, setOpenState] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExp, setJobExp] = useState('');
  const [loading , setloading]=useState(false);
  const [jsonResponse , setJsonResponse] = useState([]);
  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    // Validate inputs
    if (!jobPosition.trim() || !jobDesc.trim() || !jobExp.trim()) {
      console.error('Please fill out all fields before submitting.');
      return;
    }
   

    const inputPrompt = `
      JOB POSITION: ${jobPosition}
      Job Description/Tech Stack: ${jobDesc}
      Job Experience: ${jobExp}
      Based on this field, generate 7 real-time interview questions(has highest probabilty of asking in MAANG companies) and answers in JSON format(try to ask easy medium and hard question mix it well and also ask 1 or 2 question on genral like tell me about urself(dont always ask this only change according) or other genral questions that has probabilty of askig in).
    `.trim();

    // try {
      const result = await chatSession.sendMessage(inputPrompt);
      // const data = result.response?.candidates[0]?.content?.parts[0]?.text;
      // console.log('Generated Interview Questions:', data);
      const mockJsonResp=(result.response.text())
      .replace(/```json/g, '')  
      .replace(/```/g, '').trim();
      // console.log(JSON.parse(mockJsonResp));
      // console.log( db.select().from(MockInterview).limit(10));
      setJsonResponse(mockJsonResp);
      if(mockJsonResp){
        
          // Log the data before insertion
          // console.log("Inserting into MockInterview:", {
          //   mockId: uuidv4(),
          //   jsonMockResp: mockJsonResp,
          //   jobPosition: jobPosition,
          //   jobDesc: jobDesc,
          //   jobExperience: jobExp,
          //   createdBy: user?.primaryEmailAddress?.emailAddress,
          //   createdAt: moment().format('DD-MM-YYYY')
          // });
      const resp = await db.insert(MockInterview).values({
        
        mockId:uuidv4(),
        jsonMockResp:mockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesc,
        jobExperience:jobExp,
        createdBy:user?.primaryEmailAddress?.emailAddress,
         createdAt: moment().format('DD-MM-YYYY')
        

      }).returning({mockId:MockInterview.mockId});

      console.log('Inserted ID ',resp)
      if(resp){
        setOpenState(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }else{
      console.log("ERROR");
    }

    




      setloading(false);
    // } catch (error) {
    //   console.error('An error occurred while generating interview questions:', error);
    // }
  };
   async function getServerSideProps() {
    try {
      // Fetch all rows from MockInterview table on the server
      const rows = await db.select().from(schema.MockInterview);
      return {
        props: { interviews: rows },  // Pass the fetched rows as props
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: { interviews: [] },  // Return an empty array in case of error
      };
    }
  }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenState(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openState}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the job you are interviewing for
            </DialogTitle>
            <DialogDescription>
              Add details about the job position/role, job description, and years of experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label>Job Role/Job Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Job Description / Tech Stack</label>
              <Textarea
                placeholder="Ex. React NodeJS ExpressJS"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label>Number of Years of Experience</label>
              <Input
                placeholder="3"
                type="number"
                max="50"
                value={jobExp}
                onChange={(e) => setJobExp(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-5 justify-end mt-4">
              <Button type="button" variant="ghost" onClick={() => setOpenState(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading?
                <>
                <LoaderPinwheelIcon className='animate-spin' /> 'Geenerating from AI'
                </>: 'Start Interview' 
              }
                </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
