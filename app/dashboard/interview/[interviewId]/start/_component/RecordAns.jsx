'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../../../../components/ui/button';
import { Mic } from 'lucide-react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import { chatSession } from '../../../../../../utils/geminiAi';

// Dynamically import the component to disable SSR
const RecordAns = ({ mockinterviewquestion, activeQuestion }) => {
  console.log("Mock Interview Questions:", mockinterviewquestion);
  console.log("Active Question Index:", activeQuestion);

  const useSpeechToText = require('react-hook-speech-to-text').default;
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");

  const SaverUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 10) {
        toast("Error while saving your answer. Please record it again.");
        return;
      }

      // Extract the question correctly
      let questionText;
      if (Array.isArray(mockinterviewquestion.mockinterviewquestion)) {
        // If it's an array, access the question using the activeQuestion index
        questionText = mockinterviewquestion.mockinterviewquestion[activeQuestion]?.question || "Question not found";
      } else {
        questionText =mockinterviewquestion[activeQuestion].question;
      }

      const feedbackPrompt = `Question: ${questionText}, User Answer: ${userAnswer}. Provide a rating for the user's answer and feedback (areas of improvement) in JSON format with fields 'rating' and 'feedback' in 3 to 5 lines.`;

      console.log("Feedback Prompt:", feedbackPrompt);

      try {
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (await result.response.text())
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        console.log("Feedback Response:", mockJsonResp);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prevAns) => (prevAns || "") + (result?.transcript || ""));
    });
  }, [results]);

  return (
    <div className="flex flex-col items-center justify-center gap-0">
      <div className="flex flex-col justify-center items-center gap-10 rounded-lg p-10 relative">
        <Image src={'/webcam.png'} width={200} height={200} alt="hi" className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <Button
        className="my-4 mt-0 bg-gray-200 text-blue-800 hover:bg-gray-200 hover:text-black"
        onClick={SaverUserAnswer}
      >
        {isRecording ? (
          <h2 className='text-rose-600 animate-pulse flex gap-2 items-center'>
            <Mic /> Stop Recording....
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>
      <Button onClick={() => console.log("User Answer:", userAnswer)}>Show Answer</Button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(RecordAns), { ssr: false });
