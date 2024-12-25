'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../../@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import Link from 'next/link'


function Feedback({ params }) {

  useEffect(() => {
    Getfeedback();
  }, [])

  const [feedbacklist, setfeedbacklist] = useState()
  const unwrapped = React.use(params);

  const Getfeedback = async () => {
    console.log(UserAnswer.mockIdRef, unwrapped.interviewId)
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, unwrapped.interviewId)).orderBy(UserAnswer.id);
    console.log(result);
    setfeedbacklist(result);
  }

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulation</h2>
      <h2 className='font-bold text-3xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg vmy-3'>Here is Your Overall rating</h2>

      <h2 className='text-gray-500'>Find below interview question with Correct answer , your answer and feedback to improve your knowledge</h2>

      {console.log(feedbacklist)}

      {feedbacklist && feedbacklist.map((item, idx) => {
        // Explicitly return JSX inside the map function
        return (
          <Collapsible key={idx}>
            <CollapsibleTrigger className=' m-2 mt-7  text-left p-2 bg-secondary flex justify-between rounded-lg'>{item.question}  <ChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger> 
            <CollapsibleContent>
             <div className='flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: {item.rating}</strong></h2>
              <h2 className='bg-red-50 text-red-950 p-2 border rounded-lg'><strong>Your Answer: </strong>{item.UserAns}</h2>
              <h2 className='bg-green-50 text-green-950 p-2 border rounded-lg'><strong>Correct Answer: </strong>{item.correctAns}</h2>
              <h2 className='bg-blue-50 text-primary p-2 border rounded-lg'><strong> Feedback: </strong>{item.feedback}</h2>
             </div>
            </CollapsibleContent>
          </Collapsible>
        )
      })}

   <Link href={'/dashboard'}><Button className="p-5 mt-4 flex justify-end" >Go to home</Button></Link>
    </div>
  )
}

export default Feedback
