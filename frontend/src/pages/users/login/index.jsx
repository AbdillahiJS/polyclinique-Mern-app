import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { setLocalStorageUser } from '../../../util/localStorage'
import Footer from '../../../component/Footer'
import { useState } from 'react'


const LoginSchema = yup.object().shape({
   email: yup.string().nullable().email("email doit etre valide").required().defined(),
  password:yup.string().min(6,"password must not less than 3").defined()
})

function Login() {
 let [userEmailConfirmation,setUserEmailConfirmation] = useState('')



  const navigate = useNavigate()

const {mutate} =useMutation({
  mutationFn:async(loginData)=>{
    try {
     let userLoginRes = await axios.post('http://localhost:8000/users/userLogin',loginData)
     return userLoginRes.data
    } catch (error) {
      console.log(error)
    }
  },
  onSuccess:(data)=>{

setUserEmailConfirmation(data?.userMsg)
!!data?.userToken && setLocalStorageUser('userToken',data?.userToken)
!!data?.userToken && navigate('/')
  }
})

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({resolver: yupResolver(LoginSchema)})
  
  const onSubmit =(data)=> {
    console.log(data);
    mutate(data)
  }
  
  return (
    <>
    <div className="  flex justify-center items-center  md:container py-2 mt-2 mb-2  h-screen">
    <div className="w-[100%]  lg:w-[40%] lg:h-[80%] h-[90%]  mt-4  ">
    {
    !!userEmailConfirmation &&  <div className="mx-2 bg-white p-2 my-2 rounded-sm text-red-500 text-lg">{userEmailConfirmation}</div>

    }  
     
     <Card className=" rounded  mx-2 w-[95%]  " >
                           <div className="bg-blue-600 rounded-t-lg flex 
                           justify-center text-white text-md font-bold py-1 text-lg"
                           >Login</div>
                         <CardHeader className='border-solid border-slate-300 border-b-4 p-4 flex justify-center items-center'>
                           <Button variant='outline' className='text-white font-bold  
                           text-xl w-full 
                           bg-gradient-to-r from-red-500 to-purple-500'>Google</Button>
                         </CardHeader>
                         <CardContent className=" mt-4">
                           <div className="p-1  w-full ">
                           <form onSubmit={handleSubmit(onSubmit)} className="mb-2 w-full flex flex-col items-center"> 
                 
         <div className=" w-full flex justify-center ">
                 <div className=" flex flex-col w-full py-2 px-2  ">
                       <span  className=" mb-2 text-gray-500 text-lg w-full font-medium">
                                     Email Address
                       </span>
                      <input type="text" className={errors.email ?
                               'w-full p-2 rounded outline-none ring-1 ring-red-500 focus:ring-1 focus:ring-red-700 placeholder:px-2 ' :
                               'w-full p-2 rounded outline-none ring-1 ring-gray-400  focus:ring-blue-700 placeholder:px-2'
                                 }
                               placeholder='Email address' {...register('email')}
                       />
                   </div>
                             </div>
                   <div className=" mb-2 w-full p-1">
                               
                    {
                      errors.email && <span className=' w-full  text-red-600  text-md md:text-lg p-1'>{errors.email?.message}</span>
                     }
                               
                     </div>
 
 
               <div className="w-full flex justify-center ">
                             <div className=" py-2 px-2 w-full  flex flex-col justify-center ">
                                     <span  className=" mb-2 text-lg text-gray-500 w-full font-medium">
                                     Password
                                     </span>
                          <input type="text" className={errors.password?
                           'w-full p-2 rounded outline-none ring-1 ring-red-500 focus:ring-1 focus:ring-red-700 placeholder:px-2':
                           'w-full p-2 rounded outline-none ring-1 ring-gray-400 focus:ring-1 focus:ring-blue-700 placeholder:px-2'
                              }
                                placeholder='password' {...register('password')}/>
                             </div>
                             </div>
                             <div className=" w-full mb-3 p-1">
                             
                               {
                                errors.password && <span className=' w-full text-red-600  text-md md:text-lg p-1'>{errors.password?.message}</span>
                               }
                               
                               </div>
                             
 
                             <div className="w-full flex justify-center">
                               <Button  type='submit' variant='outline'
                               className=" w-full md:w-[80%] bg-red-600 font-medium 
                                  text-xl text-white p-2 
                                hover:text-white hover:bg-red-500"
                               >Sign up </Button>
                                
                             </div>
 
                           </form>
                           <div className="text-md md:text-md font-bold text-gray-400 my-4 flex justify-center">
                            New User?
                           <Link to='/signup' className='border-solid border-b-2
                            border-red-600 text-blue-600 font-semibold ml-2'
                            >Sign Up</Link>
                            </div> 
                           </div>
                         </CardContent>
                        
                       </Card>
 
       </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default Login