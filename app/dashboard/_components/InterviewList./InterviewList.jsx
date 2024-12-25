'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemcard from '../interviewItemcard';

function InterviewList() {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    console.log('Fetching interviews for:', user?.primaryEmailAddress?.emailAddress);

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    console.log('Interview list result:', result);
    setInterviewList(result);
  };

  return (
    InterviewList.length > 0 && (
      <div>
        <h2 className='font-medium text-lg'>Previous Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 my-3'>
          {InterviewList.map((interview, idx) => (
            <InterviewItemcard key={idx} interview={interview} />
          ))}
        </div>
      </div>
    )
  );
}

export default InterviewList;
