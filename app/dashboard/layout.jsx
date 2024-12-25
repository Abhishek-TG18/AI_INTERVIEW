import React from 'react'
import Headder from './_components/Header'
import MockInterview from '../../utils/schema'
import {Toaster} from '../../@/components/ui/sonner'


function Dashboardlayout({children}) {
  return (
    <div>
        <Headder/>
        <div className='mx-5 md:mx-20 lg:mx-36'>
         <Toaster />
        {children}
        </div>
    </div>
  )
}
const id = MockInterview

export default Dashboardlayout