import React from 'react'

import {
    Card,
    CardContent,
  } from "@/components/ui/card"
 
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  import { FaStethoscope } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import Rating from './Rating';
import ScheduleUser from '@/pages/doctors/schedule/scheduleUser';
import { Link } from 'react-router-dom';

import {  useQuery,useQueryClient } from '@tanstack/react-query';
import RatingDoctor from './doctorRating';


const DoctorCard = ({_id,doctorName,doctorSpecialty,doctorDescriptionSpecialized,doctorLocation,profile,fees,totalRating}) => {
  let names =doctorName?.split(' ')
  let slug=doctorName?.trimEnd().split(' ').map(name=>name).join('-')

 

 

  
  return (
    <>
    
    
     <Card className="w-[95%]  lg:w-[80%] ml-2 mb-4 p-4  rounded-t-lg rounded-b-lg ">
        <CardContent className='h-52 flex flex-col md:justify-between md:flex-row '>
    <Link to={`/${doctorSpecialty}/${slug}`} className='flex items-center md:items-start'>
          <div className="size-24  mr-2 p-1  ">
                 <Avatar className='size-full s ring ring-slate-300'>
                    <AvatarImage src={profile} alt="@shadcn" />
                    <AvatarFallback>{names?.map(name=>name.at(0)).join('').toUpperCase()}</AvatarFallback>
                 </Avatar>
          </div>
          <div className="md:hidden"> 
                 <Link to={`/${doctorSpecialty}/${slug}`}>
                <p className="text-blue-600 md:text-xl font-semibold">Doctor {doctorName}</p>
            </Link>
            <span className="text-gray-400 font-semibold">{doctorSpecialty}</span>
            <RatingDoctor totalRating={totalRating}/>
        

            </div>
    </Link>

          <div className=" mt-4 md:mt-0 lg:px-4  md:w-[50%] lg:w-[50%] p-1 h-1/2 md:h-full  w-full">
          
          <div className=" md:h-1/2 hidden  md:block">
            <Link to={`/${doctorSpecialty}/${slug}`}>
                <p className="text-blue-600 text-xl font-semibold">Doctor {doctorName}</p>
            </Link>
             <span className="text-gray-400 font-semibold">{doctorSpecialty}</span>
          <div className=""> 
         
            <RatingDoctor totalRating={totalRating}/>
            </div>

            </div>

            <div className=" h-full md:h-1/2 flex flex-col justify-around">
          
              <div className="flex items-center ">
                <FaStethoscope className='mr-4 text-blue-700 text-2xl border-b-2 border-b-red-500 pb-1'/>
                <p className="font-semibold text-slate-500 text-md">{doctorDescriptionSpecialized}</p> 
              </div>
                
              <div className="flex items-center ">
                <GiPositionMarker className='mr-4 text-blue-700 text-2xl border-b-2 border-b-red-500 pb-1'/>
               <p className="font-semibold text-slate-500 text-md">{doctorLocation}</p> 
              </div>

              <div className="flex items-center">
                <FaMoneyBill1Wave className='mr-4 text-blue-700 text-2xl border-b-2 border-b-red-500 pb-1'/> 
               <p className="font-semibold text-slate-500 text-md">consultation : {fees?fees:'??'}</p> 
              </div>
             
             
            </div>

          </div>
       
          <div className="hidden  md:w-[50%] h-[100%] md:flex ">
          <ScheduleUser id={_id}/>
          </div>
        </CardContent>
       </Card>
       
    </>
  )
}

export default DoctorCard