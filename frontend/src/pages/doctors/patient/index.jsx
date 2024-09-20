import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import SquareTab from './SquareTab'
import { getLocalStorage } from "@/util/localStorage"
import { BiCalendarEvent } from "react-icons/bi";
import { LiaCommentSolid } from "react-icons/lia";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const index = () => { 
  const {data,isLoading} = useQuery({
    queryKey:['allPatient'],
    queryFn:async()=>{
      try {
        let allPatientRes =await axios.get('http://localhost:8000/doctor/allPatient',{
          headers:{
            "Authorization":getLocalStorage('token')
          }
         })
         return allPatientRes?.data
      } catch (error) {
        console.log('allPatient client error >',error)
      }
    }
  })
  



  return (
    <>
    <div className="lg:container mt-1 flex flex-col ">
    <section className='grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-6 lg:mt-4  md:w-[90%]'>
     <SquareTab 
      className={'ml-1'}
     patient={data?.countBooking} 
     title={'Booking'} 
     icons={<BiCalendarEvent className='text-3xl text-blue-500 font-semibold'/>}
     />

   

     <SquareTab 
     className={''}
     patient={data?.countComment} 
     title={'Comments'} 
     icons={<LiaCommentSolid className='text-3xl text-blue-500 font-semibold'/>}
     />

    </section>

<section className='mt-10 mb-5 mx-1 h-[50%] overflow-auto'>
  <Table className=' w-full text-center'>
          <Thead className='bg-blue-500 '>
              <Tr className='text-white '>
                <Th className=''>Patient Name</Th>
                <Th className=''>Patient Mobile</Th>
                <Th className=''>Patient Email</Th>
                <Th className=''>Booking date</Th>
                <Th className=''>Patient Done</Th>
                <Th className=''>Booked</Th>
              </Tr>
        </Thead>
                
      
            <Tbody className='bg-white '>
          {data?.allBooking?.map((item) => (
          
          <Tr key={item._id} className='  font-semibold '>
            <Td className=' p-1 border-b-1 border-black border-solid md:text-lg'>{item.patientName}</Td>
            <Td className='p-1 border-b-1 border-black border-solid md:text-lg'>{item.patientMobile}</Td>
            <Td className=' p-1 border-b-1 border-black border-solid md:text-lg'>{item.patientEmail}</Td>
            <Td className=' p-1  border-b-1 border-black border-solid md:text-lg'> {item.bookingDate}</Td>
            <Td className=' p-1 border-b-1 border-black border-solid md:text-lg'> {item.isBookingDone && 'Yes'}</Td>
            <Td className='p-1 border-b-1 border-black border-solid md:text-lg'>
              <select id="cars" name="patient" className='w-full h-full  md:p-1 outline-none'>
                <option className=''>done</option>
                <option selected className=''>No</option>
              </select>
            </Td>
            
          </Tr>
        ))}
        </Tbody>
  </Table>
</section>

    </div>
    </>
  )
}

export default index