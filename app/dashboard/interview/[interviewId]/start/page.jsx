'use client';

import React, { useEffect, useState } from 'react';

import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { db } from '../../../../../utils/db';
import {MockInterview} from '../../../../../utils/schema';
import QuestionSection from '../start/_component/QuestionSection'
import RecordAns from './_component/RecordAns'
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [mockinterviewquestion , setmockinterviewquestion]=useState('');
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [activeQuestion , setActiveQuestion] = useState(0);

  useEffect(() => {
    
    getInterviewDetails(); // Call the async function
  }, [params]);

  const getInterviewDetails =async()=>{
    const result =await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId,unwrappedParams.interviewId))
    // console.log(result[0].jsonMockResp);
    setInterviewDetails(result[0]);
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
          {console.log(interviewDetails)}
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <QuestionSection mockinterviewquestion={mockinterviewquestion}  activeQuestion={activeQuestion}/>
                <RecordAns mockinterviewquestion={mockinterviewquestion} activeQuestion={activeQuestion} interviewDetails={interviewDetails} />
                

            </div>
            <div className='flex justify-end gap-6 mt-0'>
             {activeQuestion >0 && <Button 
             onClick={()=>setActiveQuestion(activeQuestion-1)}
             > Previous Question</Button>}
              {activeQuestion!=mockinterviewquestion.length-1 && <Button 
              onClick={()=>setActiveQuestion(activeQuestion+1)}
              > Next Question</Button>}
              {activeQuestion==mockinterviewquestion?.length-1 &&
              <Link href={'/dashboard/interview/'+interviewDetails?.mockId+'/feedback'}>
              <Button > End Interview</Button>
              </Link> }
            </div>
        </div>
  );
}

export default StartInterview;
