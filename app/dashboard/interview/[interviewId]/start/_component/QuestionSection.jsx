import { Lightbulb } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockinterviewquestion ,activeQuestion}) {
  return mockinterviewquestion &&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockinterviewquestion && mockinterviewquestion.map((question, index) => {
          // Make sure to return the element
          return (
            <h2 key={index} className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
                ${activeQuestion ==index&& 'bg-black text-white'}
            `}>
              Question: {index + 1}
            </h2>
          );
        })}

    
      </div >
      <h2 className='my-5 font-bold test-md  md:text-lg '>{mockinterviewquestion[activeQuestion]?.question}</h2>

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
