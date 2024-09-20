import React from 'react'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import {specialtylist} from '@/data/specialtylist'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ReservationLayout from '../../../component/ReservationLayout'


const doctorRegistrationSchema = yup.object().shape({
  doctorName :yup.string().min(3,'Name must be at least 3 characters').required('Name is a required field'),
  doctorSpecialty:yup.string().required('specialty is a required field'),
  doctorEmail: yup.string().email().required('Email is a required field'),
  doctorPassword:yup.string().min(6,"length must not less than 6").required('Password is a required field')
})


function Doctor() {
  const [data,setData]=useState(null)
  
  const [specialUrl, setSpecialUrl] = useState('')


  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({resolver: yupResolver(doctorRegistrationSchema)})

  const {mutate,isError,isSuccess} =useMutation({
    mutationFn:async(registerData)=>{
 let registerPost =await axios.post('http://localhost:8000/doctor/register',registerData)
 return registerPost.data
    },
  
    onSuccess:(data)=>{
setData(data)


    }
  })


const submit =(data)=>{

  mutate(data)
  reset()
}


  return (
<>

<ReservationLayout/>

<div className=" flex   w-[90%]  mx-4 md:w-[95%] md:mx-4   md:items-center md:justify-center mt-[5vh] mb-6">


    <form onSubmit={handleSubmit(submit)} className="bg-white  w-[100%] lg:w-1/3 md:w-[100%] p-1 rounded flex flex-col items-center justify-center md:items-center md:justify-center ">
  <div className="font-semibold tracking-wide text-blue-600 text-xl border-b-2 border-blue-600 w-[70%] mt-3 mb-7"> Doctor Registration</div>
<div className={data? "text-red-500 w-[70%] my-4 p-1 visible":"hidden"}>{data}</div>


<div className="my-2 flex flex-col w-[90%] md:w-[70%]">
  <label className='font-semibold  md:text-lg tracking-wide '>Doctor Name</label>
  <input type="text" {...register('doctorName')} className="bg-slate-100 ring-1 ring-slate-300 p-2 md:p-4 lg:p-3 rounded" />
  {errors?.doctorName && <span className="text-red-500 mt-1 p-1">{errors?.doctorName?.message}</span>}
</div>
<div className="my-1 flex flex-col w-[90%] md:w-[70%]">
<label className='font-semibold md:text-lg tracking-wide '>what is your specialty</label>
<Select className="" onValueChange={(value)=>{
setValue('doctorSpecialty',value)
    }}>
  <SelectTrigger  className="text-md tracking-wider font-bold mt-2 bg-slate-100 ring-slate-300  ">
     <SelectValue placeholder="Choose Specialty"  className=" text-md "/>
  </SelectTrigger>
  <SelectContent  className=" " >
  {
    specialtylist.map((specialty)=>{
      return  <SelectItem key={specialty.id} value={specialty.valeur} >{specialty.specialty}</SelectItem>
  })
}
  </SelectContent>
</Select> 
 
  {errors?.doctorSpecialty && <span className="text-red-500  p-1">{errors?.doctorSpecialty?.message}</span>} 
  </div>

<div className="my-1 flex flex-col w-[90%] md:w-[70%]">
<label className='font-semibold md:text-lg tracking-wide '>Email</label>
  <input type="email" {...register('doctorEmail')} className="bg-slate-100 ring-1 ring-slate-300 p-2 md:p-4 lg:p-3 rounded" />
  {errors?.doctorEmail && <span className="text-red-500  p-1">{errors?.doctorEmail?.message}</span>}

</div>
<div className="my-1 flex flex-col w-[90%] md:w-[70%]">
<label className='font-semibold md:text-lg tracking-wide '>Password</label>
  <input type="password" {...register('doctorPassword')} className="bg-slate-100 ring-1 ring-slate-300 p-2 md:p-4 lg:p-3 rounded" />
  {errors?.doctorPassword && <span className="text-red-500  p-1">{errors?.doctorPassword?.message}</span>}

</div>

<div className="my-2 flex flex-col w-[90%] md:w-[70%]">

  <input type="submit" className="ring-1 ring-slate-400 p-2 
  rounded bg-blue-500 text-white font-semibold text-lg focus:bg-blue-400" />
</div>

<div className="my-5 text-lg">
If you have already account  <Link to='doctorLogin' className='text-blue-600'>Login</Link>

</div>

</form>


</div>


</>
  )
}

export default Doctor