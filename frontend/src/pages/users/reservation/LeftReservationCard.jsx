import React from 'react'

import {Card,CardContent,} from "@/components/ui/card"

import {
    Avatar,
    AvatarImage,
  } from "@/components/ui/avatar"

const LeftReservationCard = ({doctorName,doctorDescriptionSpecialized,profile,date,from,to}) => {
   
  return (
   <Card className='mx-2 mb-2 lg:w-[40%] h-[180px]'>
   
    <CardContent className='p-2 flex flex-col justify-around '>
      <div className=" flex p-2 ">
      <Avatar className='size-20 ring-slate-300 ring-1 p-1'>
        <AvatarImage src={profile} alt="@shadcn" />
      </Avatar>
      <div className="flex flex-col justify-center ml-3">
        <span className="text-lg text-gray-500 font-semibold">Doctor {doctorName}</span>
        <span className="text-lg text-gray-500 font-semibold">{doctorDescriptionSpecialized}</span>
      </div>
      </div>
      <div className="mt-4 rounded pt-1  lg:p-2 font-semibold text-lg bg-slate-200  ">
        <span className="">{date}</span>
        <span className="ml-4">{from} - {to}</span>
       
      </div>
    </CardContent>

   </Card>
  )
}

export default LeftReservationCard