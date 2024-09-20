import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useMutation,useQuery } from '@tanstack/react-query'
import axios from "axios"
import { getLocalStorage, setLocalStorage } from "@/util/localStorage"
import { useState } from "react"
import ReservationLayout from "../../../component/ReservationLayout"



const doctorLoginSchema = yup.object().shape({
  doctorLoginEmail: yup.string().email().required('Email is required'),
  doctorLoginPassword:yup.string().min(6,"length must not less than 6").required()
})



function DoctorLogin() {
  let navigate = useNavigate()
  const [confirmedAlert, setConfirmedAlert] = useState('')


  const {mutate,isError,isSuccess} =useMutation({
    mutationFn:async(LoginData)=>{


        let loginPost =await axios.post('http://localhost:8000/doctor/login',LoginData)
         return loginPost?.data
         
        },
         onSuccess:(data)=>{
     
        setConfirmedAlert(data.msg)
        !!data?.Logintoken && setLocalStorage('token',data?.Logintoken)
        !!data?.Logintoken && navigate('/doctor/profile')
         }
        
      })


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({resolver: yupResolver(doctorLoginSchema)})


const submit =(data)=>{
  mutate(data)

}



  return (
<>
<ReservationLayout/>

<div className=" flex flex-col items-center mt-[10vh]  h-screen">


    <form onSubmit={handleSubmit(submit)} className="bg-white w-[90%] md:w-[90%] lg:w-[40%] p-1 rounded flex flex-col items-center  ">
<div className="m-2 text-lg tracking-wide text-red-500 font-semibold">{confirmedAlert}</div>
  <div className="font-semibold tracking-wide text-blue-600 text-xl border-b-2 border-blue-500 w-[70%] mt-3 mb-7"> Login As Doctor</div>

<div className="my-2 flex flex-col w-[70%]">
<label className='font-semibold lg:text-lg tracking-wide'>Email</label>
  <input type="email" {...register('doctorLoginEmail')} className="bg-slate-100 ring-1 ring-slate-400 p-2 md:p-4 lg:p-3 rounded" />
  {errors?.doctorLoginEmail && <span className="text-red-500 mt-1 p-1 text-lg">{errors?.doctorLoginEmail?.message}</span>}

</div>
<div className="my-2 flex flex-col w-[70%]">
<label className='font-semibold lg:text-lg tracking-wide'>Password</label>
  <input type="password" {...register('doctorLoginPassword')} className="bg-slate-100 ring-1 ring-slate-400 p-2 md:p-4 lg:p-3 rounded" />
  {errors?.doctorLoginPassword && <span className="text-red-500 mt-1 p-1 text-lg">{errors?.doctorLoginPassword?.message}</span>}

</div>

<div className="my-2 flex flex-col w-[70%]">

  <input type="submit" className="ring-1 ring-slate-400 p-2 
  rounded bg-blue-600 text-white font-semibold text-lg focus:bg-blue-400" />
</div>

<div className="my-4 text-lg">
If you have already account  <Link to='/doctor' className='text-blue-600'>Register</Link>

</div>

</form>


</div>

</>
  )
}

export default DoctorLogin