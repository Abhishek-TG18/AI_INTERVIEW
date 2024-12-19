"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Headder() {

    const path = usePathname();

    useEffect(()=>{
        console.log(path);
    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm min-h-16'>
        <Image src={'/Logo.svg'} height={100} width={160} alt='logo'/>

        <ul className='hidden md:flex gap-6 '>
            <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
                ${path=='/dashboard' && 'text-primary font-bold'}
                `}>Dashboard</li>

            <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
                ${path=='/questions' && 'text-primary font-bold'}
                `}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
                ${path=='/upgrade' && 'text-primary font-bold'}
                `}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all hover:cursor-pointer
                ${path=='/aboutUs' && 'text-primary font-bold'}
                `}>How it works?</li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Headder