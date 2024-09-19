import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LeftReservationCard from './LeftReservationCard'
import RightInfoReservation from './RightInfoReservation'
 import { ring2 } from 'ldrs'

const Reservation = () => {
  const {reservationId}=useParams()
 let {data,isLoading} = useQuery({
    queryKey:[reservationId],
    queryFn:async()=>{
      try {
        let reservationRes = await axios.get(`http://localhost:8000/users/reservation/${reservationId}`)
           return reservationRes?.data

      } catch (error) {
        console.log(error);
      }
    },
    onSuccess:(data)=>{
    }
  })

  ring2.register()

  if(isLoading){

   return  <div className="text-lg flex justify-center items-center mt-20 font-medium">
  <l-ring-2 size="50" stroke="5" stroke-length="0.3" bg-opacity="0.1" speed="0.8" color="blue" 
     className='flex justify-center items-center'
   ></l-ring-2>
   </div>

 }
    
  return (
    <div className="lg:container  mt-2 pt-4 h-screen flex flex-col lg:justify-between lg:flex-row">

 <LeftReservationCard  {...data?.findDoctor} {...data?.getAppointmentTime} />
 <RightInfoReservation {...data?.findDoctor} {...data?.getAppointmentTime}/>
    </div>
  )
}

export default Reservation