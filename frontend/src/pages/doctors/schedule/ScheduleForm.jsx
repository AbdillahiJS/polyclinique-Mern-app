import React from 'react'
import moment from 'moment';
import 'moment/locale/fr'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSchedule } from '../../../reduce/schedule'
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { getLocalStorage } from "@/util/localStorage"
import {useState,useRef} from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import toast, { Toaster } from 'react-hot-toast';


const scheduleSchema = yup.object().shape({
  isAvailable:yup.boolean(),
   from:yup.string().when('isAvailable',{
    is:false,
    then:(schema)=>schema.required(),
    otherwise:(schema)=>schema.notRequired()
   }),
   to:yup.string().when('isAvailable',{
    is:false,
    then:(schema)=>schema.required(),
    otherwise:(schema)=>schema.notRequired()
   }),

   select:yup.string()

 })

 let days=[0,1,2,3,4,5,6]
 console.log(new Date());

const ScheduleForm = () => {
  const [jour, setJour] = useState('')

    const addSchedule =useSchedule((state)=>state.addSchedule)
    const day =useSchedule((state)=>state.day)

    const {data} =useQuery({
  queryKey:['register'],
  queryFn:async()=>{
   let RegisterData = await axios.get('http://localhost:8000/doctor/register',{
    headers:{
      "Authorization":getLocalStorage('token')
    }
   })
   return RegisterData.data
  }
})


const queryClient = useQueryClient()

    const {mutate} = useMutation({
         mutationFn:async(scheduleData)=>{
             let scheduleRes =await axios.post('http://localhost:8000/doctor/schedule',scheduleData,{
              headers:{
                "Authorization":getLocalStorage('token')
              }
             })
             return scheduleRes.data
         },
         onSuccess:(data)=>{
            //  console.log('Schedule >',data);
        
             queryClient.invalidateQueries({ queryKey: ['scheduleList'] })
            
         }
    })
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
      } = useForm({resolver: yupResolver(scheduleSchema)})


      let isAvailable =watch('isAvailable')
      
  

      const onSubmit =(data)=> {
        console.log({...data});
        
        if (isAvailable) {
           
            mutate({...data})
            toast.success('Schedule Added.')
            reset()
            
        }else{
          
          mutate({...data})
          toast.success('Schedule Added.')

          reset()
          
        }
        
      }

      const { ref, name, onBlur } = register('select');
   

  return (
   <>  
  <Toaster />
   <form  onSubmit={handleSubmit(onSubmit)}  className='w-[100%] mt-[15vh] md:mt-2 md:w-1/2 flex flex-col items-center bg-white rounded'>


<div className="flex w-full">

<div className="p-2  mt-2 flex flex-col w-[50%] visible" >
        <span className="font-medium text-lg">From</span>
          <input type="text" {...register('from')}  disabled={isAvailable} className='outline-none ring-2 ring-slate-300 p-2 rounded disabled:bg-slate-300' />
        <div className={isAvailable?'hidden':'visible'}>
         {errors?.from  && <span className="mt-1 text-red-500 text-lg">{errors?.from?.message}</span>}
          </div>
      
    </div>
  
 

    <div className="p-2  mt-2 mb-2 flex flex-col w-[50%]">
        <span className="font-medium text-lg">To</span>
          <input type="text"  {...register('to')} disabled={isAvailable} className='outline-none ring-2 ring-slate-300 p-2 rounded disabled:bg-slate-300' />
          <div className={isAvailable?'hidden':'visible'}>
          {errors?.to && <span className="mt-1 text-red-500 text-lg">{errors?.to?.message}</span>}
          </div>

    </div>

</div> 

<div className="w-full p-1 flex">
<Select className="ml-2 ring-1 ring-blue-500"    onValueChange={(value)=>{
 setValue('select',value)
    }}>
  <SelectTrigger  className=" text-blue-500 text-xl tracking-wider font-bold ring-2 ring-slate-200 w-[80%] ml-1" >
     <SelectValue placeholder="What days"  className=" text-lg"  />
  </SelectTrigger>
  <SelectContent  className="text-blue-600 ">
  {
    days.map((day)=>{
      // let journee = moment().add(day, 'days').calendar().split(' ')[0]
      let weekDays = moment().add(day, 'days').format()
      let allDate =moment().add(day, 'days').format('dddd,MM Do YYYY')
      console.log(moment().add(day, 'days').format());
     
      return  <SelectItem key={day} value={allDate} className='flex justify-between'>{moment().add(day, 'days').format('dddd , MM Do YYYY')} </SelectItem>
  })
}
  </SelectContent>
    
</Select>


</div>



    
   


   
  <div className=" mt-1 p-1 px-2 flex  mb-1  w-[100%] ">
        <input type="checkbox" {...register('isAvailable')} className=' p-1 size-6 mr-2' />
           <span className="font-medium text-lg">Not Available</span>
 </div>

        <div className=" w-[100%] flex items-end p-2">
            <input type="submit" value="Add" className='bg-blue-500 text-white w-full p-2 text-xl font-semibold rounded tracking-wide'/>
        </div>


   </form>
    
   </>
  )
}

export default ScheduleForm