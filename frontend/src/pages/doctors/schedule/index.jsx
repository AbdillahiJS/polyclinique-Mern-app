import React from 'react'
import { useState } from 'react'
import moment from 'moment';
import 'moment/locale/fr'
import { useSchedule } from '../../../reduce/schedule';
import { v4 as uuidv4 } from 'uuid';
import EditDialog from './EditSchedule';
import ScheduleUser from './scheduleUser';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ScheduleForm from './ScheduleForm';
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getLocalStorage } from "@/util/localStorage"
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const index = () => { 


  const {data} = useQuery({
     queryKey:['scheduleList'],
     queryFn:async()=>{
     let ScheduleList =await axios.get('http://localhost:8000/doctor/schedule',{
         headers:{
           "Authorization":getLocalStorage('token')
         }
       })
       return  ScheduleList.data
     },
    
   })

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn:async(id)=>{
     let scheduleDeletedRes = await axios.delete(`http://localhost:8000/doctor/schedule/${id}`,{
      headers:{
        "Authorization":getLocalStorage('token')
      }
     })
     return scheduleDeletedRes.data
    },
    onSuccess:(data)=>{
    
      queryClient.invalidateQueries({ queryKey: ['scheduleList'] })
    }
      
     
   })



  return (
    <>
    <Toaster/>

<div className="p-4 flex flex-col h-screen w-[98%] ">
    <ScheduleForm/>

 

   

 <div className="mt-4    h-[50%] overflow-auto"> 



  
     <Table className=' w-full text-center over bg-white'>
      <Thead className='bg-blue-500 text-white '>
        <Tr className=''>
          <Th>Date</Th>
          <Th>Available</Th>
          <Th>From</Th>
          <Th>To</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
        <Tbody >
        {data?.map((item) => (
          
          <Tr key={item._id} className='border-b-2 border-slate-300 '>
            <Td className='border-x-2  border-slate-300 '>{item.date}</Td>
            <Td className='border-r-2 border-slate-300'>{item.isAvailable?"Not Available":"Available"}</Td>
            <Td className='border-r-2 border-slate-300'>
              {item.from}</Td>
            <Td className='border-r-2 border-slate-300'>
              {item.to}</Td>
            <Td className='border-r-2 border-slate-300 p-1'>
            
            <EditDialog  id={item._id} />
            </Td>
            <Td className='border-r-2 border-slate-300 p-1'>
            <button className="bg-red-500 text-xl rounded text-white p-1 w-[80%]"
            onClick={()=>{
              mutate(item?._id)
              toast.error('Item deleted')
            }}
            >Delete</button>
            </Td>
          </Tr>
        ))}
        </Tbody>

      </Table> 

    </div>


</div>
    </>
  )
}

export default index