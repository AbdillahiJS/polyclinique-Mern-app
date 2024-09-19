import React from 'react'
import {
    Menubar,
    MenubarMenu,
   MenubarTrigger,
  } from "@/components/ui/menubar"

  import {
    Sheet,
    SheetContent,
    SheetHeader,
   SheetTrigger,
  } from "@/components/ui/sheet"

import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import poly  from '../assets/logoPoly.png' 
import {Link} from 'react-router-dom'
import { FaClinicMedical } from "react-icons/fa";

let navLinkMobile=['signUp','logIn','doctor']
let navLinkMobileElement=['SignUp','LogIn','for Doctor']

const Header = ({hide}) => {
    const [hamtoggle,setHamtoggle]=useState(false)
  return (
    <>
    <div className="   p-2   bg-blue-500 w-[100vw]"> 
    
    <div className="flex justify-between items-center md:justify-around w-[100%] md:w-[100%] h-full p-1 md:p-2">
    <div className="ml-2">
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

<div className="hidden sm:hidden md:flex">
    <Menubar>
      <MenubarMenu>
      <Link to='signup'>
        <MenubarTrigger className='text-lg'>SignUp</MenubarTrigger>
        </Link>

      </MenubarMenu>
      <MenubarMenu>
        <Link to='login'>
        <MenubarTrigger className='text-lg'>LogIn</MenubarTrigger>
        </Link>

      </MenubarMenu>
      <MenubarMenu>
      <Link to='doctor'>
        <MenubarTrigger className='text-lg'>for Doctor</MenubarTrigger>
        </Link>

      </MenubarMenu>
      
    </Menubar>
</div>

<div className="md:hidden bg-blue-500">
    
    <GiHamburgerMenu className="text-4xl text-white"
    onClick={()=>{
      setHamtoggle(!hamtoggle)
    }}
    />
   
</div>
    </div>
      


{
  
       hamtoggle ?
       (
       <div className=" visible mt-4 md:hidden flex justify-center">
        <ul className="bg-white w-[90%] rounded p-1">
          {
            navLinkMobile.map((navLink,i)=>(
              <Link to={navLink}>
                <li className="hover:bg-slate-100 focus:bg-slate-100 text-md font-medium mx-2 rounded px-2 py-1 text-[1.2em] ">{navLinkMobileElement[i]}</li>
               </Link>

            ))

          }
         
        </ul>
    
        </div>
        )
        :null 
 }
    
    


 
    </div>
    
    </>
  )
}

export default Header