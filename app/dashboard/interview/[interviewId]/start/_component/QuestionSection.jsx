import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockinterviewquestion ,activeQuestion}) {
  console.log(mockinterviewquestion);
  const textToSpeech=(text)=>{

    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }else{
      alert("Sppech not available");
    }
  }
  // const textToSpeech = (text) => {
  //   if ('speechSynthesis' in window) {
  //     const synth = window.speechSynthesis;
  
  //     // Get the list of voices
  //     const voices = synth.getVoices();
  
  //     // Find a female voice (you can refine this based on language or specific voice name)
  //     const femaleVoice = voices.find(
  //       (voice) => voice.name.includes('Google UK English Female') || voice.gender === 'female'
  //     );
  
  //     // Create a new utterance
  //     const speech = new SpeechSynthesisUtterance(text);
  
  //     // Set the voice (if a female voice is found)
  //     if (femaleVoice) {
  //       speech.voice = femaleVoice;
  //     } else {
  //       console.warn('Female voice not found, using default voice.');
  //     }
  
  //     // Speak the text
  //     window.speechSynthesis.speak(speech);
  //   } else {
  //     alert("Speech synthesis is not supported in this browser.");
  //   }
  // };
  
  return mockinterviewquestion &&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockinterviewquestion && mockinterviewquestion.map((question, index) => {
          // Make sure to return the element
          return mockinterviewquestion &&(
            <h2 key={index} className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
                ${activeQuestion ==index&& 'bg-blue-800   text-white'}
            `}>
              Question: {index + 1}
            </h2>
          );
        })} 

    
      </div >
      <h2 className='my-5 font-bold test-md  md:text-lg '>{mockinterviewquestion[activeQuestion]?.question}</h2>
      <Volume2  className="hover:cursor-pointer" onClick={()=>textToSpeech(mockinterviewquestion[activeQuestion]?.question)} />

      <div className='border rounded-lg p-5 bg-blue-100 my-20'>
        <h2 className='flex gap-2 items-center text-primary'>
            <Lightbulb />
            <strong> Note: </strong>
        </h2>
        <h1 className='flex gap-2 items-center text-primary'>{process.env.NEXT_PUBLIC_INFO}</h1>
      </div>
    </div>
  );
}

export default QuestionSection;
