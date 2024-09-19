import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { DropdownMenuDemo } from '../component/dropDown';
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getLocalStorage } from "@/util/localStorage"





const DoctorAside = () => {

  const queryClient = useQueryClient()
  queryClient.invalidateQueries({ queryKey: ['login'], exact: true })

const {data} =useQuery({
  queryKey:['login'],
  queryFn:async()=>{
    try {
      let getLogin =await axios.get('http://localhost:8000/doctor/login',{
        headers:{
          "Authorization":getLocalStorage('token')
        }
      })
    
      return getLogin?.data
      
    } catch (error) {
      console.log('getLoginError :',error);
    }
  },

})

  return (
    <>
    <aside className='bg-white mb-2 mx-1  md:h-screen md:w-[20%] lg:flex md:flex-col-reverse flex justify-between md:p-2 rounded-lg shadow-md px-2'>
     <div className=" p-2 flex items-center rounded  ">
         <div className="flex flex-col ">
                       <DropdownMenuDemo name={data?.doctorLogedIn?.doctorName} profile={data?.doctorLogedIn?.profile}/>
          </div>
       
        <span className="text-lg ml-2 font-semibold p-1  hidden md:flex">{data?.doctorLogedIn?.doctorName}</span>
      
      </div> 
       
  
       
       <div className="mt-4  w-full">
        <ul className='p-2 flex justify-around md:flex-col'>
        <Link to='profile'>
            <li className='font-semibold lg:text-lg  hover:bg-blue-500  hover:text-white 
            mb-2 p-1 rounded flex items-center 
            flex-col lg:flex-row md:border-b-2 text-sm'>

          <CgProfile className='lg:text-2xl mr-2  text-4xl '/>
          <span className="">Profile</span>  
          
              </li>

              </Link>
              <Link to='schedule'>
            <li className='font-semibold lg:text-lg hover:bg-blue-500 hover:text-white 
            mb-2 p-1 rounded flex items-center flex-col
            lg:flex-row md:border-b-2 text-sm'>
              <RiCalendarScheduleLine className='lg:text-2xl mr-2  text-4xl'/>
            <span className="">Schedule</span>  

              </li>
              </Link>
              <Link to='patient'>

            <li className='font-semibold lg:text-lg hover:bg-blue-500 hover:text-white 
            mb-2 p-1 rounded flex items-center flex-col 
            lg:flex-row  md:border-b-2 text-sm'>

              <FaRegUser className='lg:text-2xl mr-2  text-4xl'/>
            <span className="">patient</span>  

              </li>
              </Link>
              
             
        </ul>
       </div>
       
    </aside>
    
    </>
  )
}

export default DoctorAside