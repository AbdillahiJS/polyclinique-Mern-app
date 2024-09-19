import React from 'react'
import {Card,CardContent,CardHeader} from "@/components/ui/card"
import { BsPerson } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const infoReservation = yup.object().shape({
    nameInfo: yup.string().trim().min(3,"length must not less than 3").required().defined(),
   numberInfo:yup.string()
   .matches(/^[0-9]+$/, 'Mobile must be Number')
   .required('Mobile number is required'),
   emailInfo: yup.string().nullable().email("Your email musb be valid").required('Email is required').defined("Email must be defined")
 })


const RightInfoReservation = ({doctorName,doctorLocation,date,from,to}) => {

    const {reservationId}=useParams()
    const navigate =useNavigate()


    const {
        register,
        handleSubmit,
        
        formState: { errors },
      } = useForm({
        resolver: yupResolver(infoReservation),
        criteriaMode: "all",
    mode: "onChange"
    })

   const {mutate} = useMutation({
       mutationFn:async(bookingData)=>{
        try {
            let bookingDataRes = await axios.post('http://localhost:8000/users/booking',
            {
            
            nameInfo:bookingData.nameInfo,
            numberInfo:bookingData.numberInfo,
            emailInfo:bookingData.emailInfo,
            bookingDate:date+" "+from+" "+to,
            bookingDoctor:doctorName,
            clinic:doctorLocation
        })

             return bookingDataRes?.data
             
            } catch (error) {
              console.log('putClients >',error);
            }
       }, 
       onSuccess:(data)=>{
         console.log('Booking >',data);
         navigate(`/reservation/${data._id}/thankyou`)
        }
    })
    
        
        

      
  const onSubmit =(data)=> {
    mutate(data)
  }

  return (
   <Card className='mx-2 lg:w-[50%] h-[60%] rounded'>
    <CardHeader className='bg-blue-500  text-lg text-white text-center rounded-tr-md rounded-tl-md font-semibold'>
        Enter Your Info.
    </CardHeader>
    <CardContent className='h-full  '>
    
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-around p-1 h-[80%] w-full mt-5'>
            <div className="border-b-2 border-b-blue-500 border-b-solid w-[80%] mb-2  h-10 flex flex-col items-center">
                <div className=" h-full w-full flex">
                <BsPerson className='text-3xl h-full'/>
                <input type="text" {...register('nameInfo')} placeholder='Name' 
                className='text-lg h-full px-1  w-full mb-4 outline-none flex items-center justify-center '
                />
                </div>
                {
                 errors.nameInfo && <span className=" w-full mt-2 text-red-500 font-semibold p-1">{errors.nameInfo?.message}</span>
                }
                
            </div>

         
            <div className="border-b-2 border-b-blue-500 border-b-solid  w-[80%] mb-2 h-10 flex flex-col items-center">
                <div className=" h-full w-full flex">
                <FiPhone className='text-2xl h-full '/>
                <input type="number" {...register('numberInfo')} placeholder='Mobile'
                className='h-full w-full mb-4 px-2 text-lg font-medium outline-none '
                />
                
                </div>
                {
                 errors.numberInfo&& <span className=" w-full mt-2 text-red-500 font-semibold p-1">{errors.numberInfo?.message}</span>
                }

            </div>
            <div className="border-b-2 border-b-blue-500 border-b-solid w-[80%] mt-2 mb-2 h-10 flex flex-col items-center">
                <div className=" h-full w-full flex">
                <MdOutlineMail className='text-2xl h-full'/>
                <input type="email" {...register('emailInfo')} placeholder='Email'
                className='h-full w-full mb-4 px-2 text-lg font-medium outline-none '
                />
                </div>
                {
                 errors.emailInfo&& <span className=" w-full mt-2 text-red-500 font-semibold p-1">{errors.emailInfo?.message}</span>
                }
            </div>
            <div className=" w-[80%] p-1">
                <button type='submit' className='bg-red-600 p-1 w-1/2  rounded text-white font-medium text-lg hover:bg-blue-500'>Book Now</button>
            </div>
        </form>
        
    </CardContent>
   </Card>
  )
}

export default RightInfoReservation