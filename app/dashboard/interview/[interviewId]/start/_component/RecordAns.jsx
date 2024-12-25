'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../../../../components/ui/button';
import { Mic } from 'lucide-react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import { chatSession } from '../../../../../../utils/geminiAi';
import { db } from '../../../../../../utils/db';
import { UserAnswer } from '../../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

const RecordAns = ({ mockinterviewquestion, activeQuestion, interviewDetails }) => {
  const { user } = useUser();
  const useSpeechToText = require('react-hook-speech-to-text').default;

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswerr, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Accumulate transcript results in a buffer during recording
  useEffect(() => {
    if (isRecording) {
      results.forEach((result) => {
        setUserAnswer((prevAns) => prevAns + (result?.transcript || ""));
      });
    }
  }, [results, isRecording]);

  const handleStartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswerr.length < 10) {
        toast("Answer too short. Please record again.");
        setUserAnswer(""); // Reset state
        return;
      }
    } else {
      setUserAnswer(""); // Clear previous answer
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    if (userAnswerr.trim().length < 10) {
      toast("Answer too short to save.");
      return;
    }

    setLoading(true);

    const questionText = Array.isArray(mockinterviewquestion.mockinterviewquestion)
      ? mockinterviewquestion.mockinterviewquestion[activeQuestion]?.question || "Question not found"
      : mockinterviewquestion[activeQuestion]?.question;

    const correctAnswer = Array.isArray(mockinterviewquestion.mockinterviewquestion)
      ? mockinterviewquestion.mockinterviewquestion[activeQuestion]?.answerExample || "No answer available"
      : mockinterviewquestion[activeQuestion]?.answerExample;

    const feedbackPrompt = `Question: ${questionText}, User Answer: ${userAnswerr}. Provide a rating for the user's answer and feedback (areas of improvement) in JSON format with fields 'rating' and 'feedback' in 3 to 5 lines.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const feedbackResponse = (await result.response.text())
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      const jsonFeedback = JSON.parse(feedbackResponse);

      const dbResponse = await db.insert(UserAnswer).values({
        mockIdRef: interviewDetails?.mockId,
        question: questionText,
        correctAns: correctAnswer,
        UserAns: userAnswerr,
        feedback: jsonFeedback?.feedback,
        rating: jsonFeedback?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      });

      if (dbResponse) {
        toast("Answer recorded successfully!");
        setResults([]);
      }
      setResults([]);
    } catch (error) {
      console.error("Error updating user answer:", error);
      toast("Failed to save the answer. Try again.");
    }

    setLoading(false);
    setUserAnswer(""); // Reset state after saving
  };

  useEffect(() => {
    if (!isRecording && userAnswerr.length > 10) {
      updateUserAnswer();
    }
  }, [isRecording, userAnswerr]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col justify-center items-center gap-10 rounded-lg p-0 relative">
        <Image src={'/webcam.png'} width={200} height={200} alt="Webcam" className="absolute" />
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
        disabled={loading}
        className="mt-4 bg-gray-200 text-blue-800 hover:bg-gray-300 hover:text-black"
        onClick={handleStartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-rose-600 animate-pulse flex gap-2 items-center">
            <Mic /> Stop Recording...
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>
      {/* <Button onClick={() => console.log("User Answer:", userAnswerr)}>Show Answer</Button> */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(RecordAns), { ssr: false });
