'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../../../../../components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'

function RecordAns() {
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      const [userAnswer , setUserAnswer] = useState();

      useEffect(()=>{
        results.map((results)=>{
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        })

      },[results])
   
  return (
    <div className='flex flex-col items-center justify-center gap-0'>
    <div className='flex flex-col justify-centre items-center gap-10 rounded-lg  p-10'>
        <Image src={'/webcam.png'} width={200} height={200} alt='hi' className='absolute'/>
        <Webcam 
        
        mirrored={true}
        style={{
            height:300,
            width:'100%',
            zIndex:10,
        }}
        
        />

    </div>
    <Button className="my-10" onClick={isRecording?stopSpeechToText:startSpeechToText}>
  {isRecording ? (
    <h2>
      <Mic /> Recording....
    </h2>
  ) : (
    'Record Answer'
  )}
</Button>

    </div>
  )
}

export default RecordAns