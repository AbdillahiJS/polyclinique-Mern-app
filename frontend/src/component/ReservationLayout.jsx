import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import poly  from '../assets/logoPoly.png' 
import {Link} from 'react-router-dom'
import {
    Menubar,
    MenubarMenu,
   MenubarTrigger,
  } from "@/components/ui/menubar"
  import { FaClinicMedical } from "react-icons/fa";

const ReservationLayout = () =>{

  
  return (
    <>
<div className="">
    <div className="p-2 bg-blue-500 w-[100vw]"> 
    
    <div className=" flex    md:justify-end  md:w-[20%] h-full p-1 md:p-2">
    <div className="ml-5">
       <Menubar className="">
         <MenubarMenu className="">
         <Link to='/'>
        <MenubarTrigger className="md:text-xl text-lg px-1 font-medium ">
         <FaClinicMedical className='text-red-500 mr-1 md:mr-2 md:text-3xl text-2xl'/>
             Polyclinique
        </MenubarTrigger>
         </Link>
       </MenubarMenu>
      </Menubar>
       
    </div>
    </div>
    </div>
   

    <Outlet/>

    </div>
    </>
  )
}

export default ReservationLayout