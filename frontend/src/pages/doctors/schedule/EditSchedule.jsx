import {useState,useEffect} from 'react'

import { useSchedule } from '@/reduce/schedule'   
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { getLocalStorage } from "@/util/localStorage"
import toast, { Toaster } from 'react-hot-toast';

const schemaEdit = yup.object().shape({
  updateIsAvailable:yup.boolean(),
  updateFrom: yup.string().when('updateIsAvailable',{
    is:false,
    then:(schema)=>schema.required(),
    otherwise:(schema)=>schema.notRequired()
   }),
  updateTo: yup.string().when('updateIsAvailable',{
    is:false,
    then:(schema)=>schema.required(),
    otherwise:(schema)=>schema.notRequired()
   }),
})

const EditDialog = ({id}) => {
  
  

  const queryClient = useQueryClient()

  const {data} = useQuery({
    queryKey:[id],
    queryFn:async()=>{
      try {
        let singleScheduleRes =await axios.get(`http://localhost:8000/doctor/schedule/${id}`,{
            headers:{
              "Authorization":getLocalStorage('token')
            }
          })
          return  singleScheduleRes?.data
          
        } catch (error) {
          console.log('client-singleScheduleError',error);
        }
        
      },
  })
  

  const {mutate} =useMutation({
    mutationFn:async(editScheduleData)=>{
      try {
      let editScheduleRes =await axios.put(`http://localhost:8000/doctor/editSchedule/${id}`,editScheduleData,{
        headers:{
          "Authorization":getLocalStorage('token')
        }
      })
      
      return editScheduleRes.data
        
      } catch (error) {
        console.log('Client-editSchedule-Error >',error);
      }
    },
    onSuccess:(data)=>{
      queryClient.invalidateQueries({ queryKey: ['scheduleList'] })
    }
  })


  
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useForm({resolver: yupResolver(schemaEdit)})

  let updateIsAvailable =watch('updateIsAvailable')
  

useEffect(() => {
  if (updateIsAvailable) {
    setValue('updateFrom','')
    setValue('updateTo','')
  }else{
    resetField('updateFrom')
    resetField('updateTo')
  }
  
}, [updateIsAvailable])



  const onSubmit=(data)=>{
    console.log('EditSchedule >',data);
    if (updateIsAvailable) {
     
  
      mutate({...data})
      toast.success('Successfully Edit the Schedule.')
    }else{
      
     
      mutate({...data})
      toast.success('Successfully Edit the Schedule.')

    }
    
  }
    

  return (
    <>
    <Toaster />
    <Dialog>
    <DialogTrigger className="bg-green-500 text-xl rounded text-white p-1 w-[80%]">
        Edit
    </DialogTrigger>
  <DialogContent>
    <DialogHeader >
      <DialogTitle className="flex justify-center ">Edit Your Appointment</DialogTitle>
    </DialogHeader>
    <form  onSubmit={handleSubmit(onSubmit)}  className=' p-2 w-full flex flex-col items-center bg-white '>

<div className=" p-1 flex flex-col justify-center w-full mb-2">
<input type="text"   
 {...register('updateFrom')} 
 disabled={updateIsAvailable}
defaultValue={data?.from}
className='ring-1 ring-slate-600 p-3 outline-none rounded w-full disabled:bg-slate-400'/>
<div className={updateIsAvailable?'hidden':'visible p-1  mt-1'}>
{errors?.updateFrom && <span className="text-red-500 text-lg">{errors?.updateFrom?.message}</span>}
</div>
</div>

<div className=" p-1 flex flex-col justify-center w-full mb-2">
    <input type="text"   
    {...register('updateTo')}
     disabled={updateIsAvailable}
defaultValue={data?.to}

    className='ring-1 ring-slate-600 p-3 outline-none rounded w-full disabled:bg-slate-400'/>
<div className={updateIsAvailable?'hidden':'visible p-1  mt-1'}>
{errors?.updateTo && <span className="text-red-500 text-lg">{errors?.updateTo?.message}</span>}
</div>
  

</div>


<div className=" ml-2 p-2 flex justify-start w-full mb-2">
          <input type="checkbox" 
          {...register('updateIsAvailable')}
          defaultChecked={data?.isAvailable}
           className=' p-1 size-6'  />
           
          <span className="font-medium text-lg ml-2">Not Available</span>
</div>
<div className="p-1 flex justify-center w-full"> 
 <DialogClose type='submit' className="bg-green-500 text-xl rounded text-white p-2 w-full">Save</DialogClose> 
</div>

    </form>
   
  </DialogContent>



</Dialog>

    
    </>
  )
}

export default EditDialog