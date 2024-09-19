import React from 'react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { getLocalStorage } from '../util/localStorage'
import DoctorAside from './DoctorAside'
import DoctorNavbar from './DoctorNavbar'


const DoctorLayout = () => {
  return (
    <>

  
    <div className='flex flex-col-reverse justify-between h-screen md:flex-row'>
      <DoctorAside/>
      
      
  <div className= " w-full ">
       <Suspense fallback={<div className=''>Loading .....</div>}>
          <Outlet/>
       </Suspense>

    </div>
      
    

</div>
    </>
  )
}

export default DoctorLayout