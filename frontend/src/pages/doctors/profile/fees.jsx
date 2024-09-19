import React from 'react'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useQuery,useMutation,useQueryClient,MutationCache } from "@tanstack/react-query"
import axios from "axios"
import { getLocalStorage } from "@/util/localStorage"
import toast, { Toaster } from 'react-hot-toast';

const feesSchema = yup.object().shape({
    fee:yup.string().required(),
  })

const Fees = () => {

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn:async(postFeesData)=>{
      try {
        let setFees = await axios.put('http://localhost:8000/doctor/register/fee',postFeesData,{
           headers:{
             "Authorization":getLocalStorage('token')
           }
         })
         return setFees?.data
         
        } catch (error) {
          console.log('postClientsfees >',error);
        }
      },
      
    onSuccess:(data)=>{
      queryClient.invalidateQueries({ queryKey: ['fees',data?._id]})
      

    } 
  })






    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({resolver: yupResolver(feesSchema)})
      
      const onSubmit =(data)=> {
        mutate(data); 
        toast.success('you successfully added your your fee')
      }



  return (
    <>
    <Toaster/>
    <form onSubmit={handleSubmit(onSubmit)} className=' lg:w-[60%] bg-white'>
    <div className=" flex flex-col  justify-around  py-2 px-2 ">
            <span  className=" text-lg font-semibold w-full flex mb-1 px-1">
            Fee
            </span>
            <input type="number" className='w-full p-2 rounded outline-none ring-1 ring-gray-400 focus:ring-1
            focus:ring-blue-700 placeholder:p-1 text-lg '
            placeholder='your fee' 
            {...register('fee')}
            // defaultValue={data.fees}
            />
      </div>
      <div className="flex flex-col mx-2 mb-1 p-1">
      {
        errors?.fee && <span className=' w-full  text-red-400 text-lg font-semibold'>{errors.fee?.message}</span>
      }
    </div>

      <div className=" flex justify-center p-2 ">
      <input type='submit' variant='outline' value='Add your fee'
      className="w-full rounded bg-red-600 font-semibold
         text-lg text-white p-2 
       hover:text-white hover:cursor-pointer hover:bg-blue-400"
      /> 
       
    </div>
    </form>
    </>
  )
}

export default Fees