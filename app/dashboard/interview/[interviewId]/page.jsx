'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../../utils/db';
import {MockInterview} from '../../../../utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

function Interview({ params }) {
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [webcamp, setWebcamp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const resolvedParams = await params; // Unwrap the params promise
        const { interviewId } = resolvedParams; // Extract the interviewId
        console.log('Interview ID:', interviewId);

        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));
        console.log('Result:', result);
        setInterviewDetails(result[0]); // Store the details in state
      } catch (error) {
        console.error('Error fetching interview details:', error);
      }
    };

    getInterviewDetails(); // Call the async function
  }, [params]);

  const handleWebcamToggle = () => {
    setWebcamp(true);
  };
  const unwrappedParams = React.use(params);
  const startInt = ()=> router.push('/dashboard/interview/'+unwrappedParams.interviewId+'/start');

  return (
    <div className="my-10 flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl">Let's Get Started</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          {interviewDetails ? (
            <div className="flex flex-col my-5 gap-5 p-5 rounded-lg border">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong> {interviewDetails.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech Stack:</strong> {interviewDetails.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong> {interviewDetails.jobExperience}
              </h2>
            </div>
          ) : (
            <p>Loading interview details...</p>
          )}
          <div className='p-5 border rounded-lg border-yellow-400 bg-yellow-200 text-yellow-700'>
            <div className='flex gap-5 mb-5'>
            <Lightbulb />
            <h2>
              <strong>Information</strong>
            </h2>
            </div>
            <h2>{process.env.NEXT_PUBLIC_INFO}</h2>
          </div>
        </div>

        <div className="self-center">
          {webcamp ? (
            <Webcam
              mirrored={true}
              onUserMedia={() => console.log('Webcam access granted')}
              onUserMediaError={(error) => {
                console.error('Webcam access denied:', error);
                setWebcamp(false);
              }}
              style={{
                height: 500,
                width: 400,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 rounded-lg bg-secondary border" />
              <div className="self-center ">
                <Button onClick={handleWebcamToggle}
                variant="gost"
                >
                  Enable Camera and Microphone
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
     <div className='flex justify-end items-end'>
         <Button onClick={startInt}>Start Interview</Button>
     </div>
    </div>
  );
}

export default Interview;
