'use client';

import React, { useEffect, useState } from 'react';

import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { db } from '../../../../../utils/db';
import MockInterview from '../../../../../utils/schema';
import QuestionSection from '../start/_component/QuestionSection'
import RecordAns from './_component/RecordAns'

function StartInterview({ params }) {
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [mockinterviewquestion , setmockinterviewquestion]=useState('');
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [activeQuestion , setActiveQuestion] = useState(1);

  useEffect(() => {
    
    getInterviewDetails(); // Call the async function
  }, [params]);

  const getInterviewDetails =async()=>{
    const result =await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,unwrappedParams.interviewId))
    // console.log(result[0].jsonMockResp);
    const jsonMockResp=JSON.parse(result[0].jsonMockResp)
    // setmockinterviewquestion(jsonMockResp.interviewQuestions);
    if (Array.isArray(jsonMockResp)) {
      setmockinterviewquestion(jsonMockResp);
      console.log(mockinterviewquestion);
  } else if (typeof jsonMockResp === 'object' && jsonMockResp !== null) {
    setmockinterviewquestion(jsonMockResp.interviewQuestions);
    console.log(mockinterviewquestion);
  }
  
 

  }
return mockinterviewquestion &&(
        <div>
          {console.log(mockinterviewquestion)}
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <QuestionSection mockinterviewquestion={mockinterviewquestion}  activeQuestion={activeQuestion}/>
                <RecordAns mockinterviewquestion={mockinterviewquestion} activeQuestion={activeQuestion} />
                

            </div>
        </div>
  );
}

export default StartInterview;
