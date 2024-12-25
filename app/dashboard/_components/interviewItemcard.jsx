'use client'
import React from 'react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Correct router hook for the `app` directory

function InterviewItemcard({ interview }) {
    const router = useRouter();

    const onStart = () => {
        router.push(`/dashboard/interview/${interview.mockId}`);
    }

    return (
        <div>
            <div className="border shadow-sm rounded-lg p-3">
                <h1 className='font-bold text-primary'><strong>{interview?.jobPosition}</strong></h1>
                <h2 className='text-sm text-gray-900'>{interview.jobExperience} years of experience</h2>
                <h2 className='text-sm text-gray-500'>Created At: {interview.createdAt}</h2>
                <div className='flex justify-between gap-5 mt-2'>
                    <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>
                        <Button size="sm" variant='outline' className="w-full">Feedback</Button>
                    </Link>
                    <Button size="sm" onClick={onStart} className="w-full">Start Again</Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewItemcard;
