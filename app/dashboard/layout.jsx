import React from 'react'
import Headder from './_components/Header'

function Dashboardlayout({children}) {
  return (
    <div>
        <Headder/>
        <div className='mx-5 md:mx-20 lg:mx-36'>
        {children}
        </div>
    </div>
  )
}

export default Dashboardlayout