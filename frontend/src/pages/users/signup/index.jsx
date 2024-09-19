import {useState} from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
// import Rowform from './Rowform'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Footer from '@/component/Footer'
import { useQuery,useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const SignupSchema = yup.object().shape({
    name:yup.string().min(3,"length must not less than 3").required().defined(),
    mobile:yup.number().required().min(8,"length must not less than 8").positive().integer().defined(),
    email: yup.string().nullable().email("email doit etre valide").required().defined(),
    gender: yup.string().required(),
    birthday: yup.date().required('Birth date is required'),
    password:yup.string().min(6,"length must not less than 3").defined()
  })
 


function Signup() {
  const [checked,setChecked]=useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({resolver: yupResolver(SignupSchema)})

 

 const {mutate} = useMutation({
       mutationFn:async(userData)=>{
        let signup =await axios.post('http://localhost:8000/users/registerUser',userData)
        return signup.data
      },
       onSuccess:(data)=>{
        setChecked(data)
        toast.success('Successfully created!')
       }

      })

  
  const onSubmit =(data)=> {
    console.log(data);
    mutate(data)
  
  }

  
  return (
    <>
    <Toaster />
    <div>
    <div className=" h-screen  mb-4 overflow-auto md:container  py-2 mt-2 flex justify-center mt-5 ">
      <div className="w-[95%] lg:w-1/2 md:w-[90%]">
        {
          checked && <div className="w-full mb-2  bg-white text-red-500 font-semibold text-lg p-2 px-1 rounded">
          {checked}
        </div>
        }
      
     
    <Card className=" rounded  ">
                          <div className="bg-blue-600 rounded-t-lg flex 
                          justify-center text-white text-md font-bold py-1 "
                          >Sign Up</div>
                        <CardHeader className='border-solid border-slate-300 border-b-4 p-4 flex justify-center items-center'>
                          <Button variant='outline' className='text-white font-bold  
                          text-xl w-full md:w-1/2
                          bg-gradient-to-r from-red-500 to-purple-500'>Google</Button>
                        </CardHeader>
                        <CardContent className="">
                          <div className=" w-full p-1">
                          <form onSubmit={handleSubmit(onSubmit)} className="mb-2"> 
                         
                            
                            <div className="flex flex-col">
                             <div className=" flex flex-col md:flex-row justify-around  py-2 px-2 ">
                                    <span  className=" text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center font-medium">
                                    Your Name
                                    </span>
                                    <input type="text" className='w-full md:w-1/2 p-1 rounded outline-none ring-1 ring-gray-400 focus:ring-1
                                    focus:ring-blue-700 placeholder:px-1'
                                    placeholder='First name and Last name' 
                                    {...register('name')}
                                    />
                              </div>
                               <div className="flex justify-around ">
                              <span className=' md:w-1/3 hidden md:flex'></span>
                              {
                                errors.name && <span className=' flex justify-center md:justify-start w-full md:w-1/2 text-red-600 '>{errors.name?.message}</span>
                              }
                             
                             
                              
                            </div>
                            </div>
                            

                            <div className="flex flex-col">
                             <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
                                    <span  className=" text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center font-medium">
                                    Mobile Number
                                    </span>
                              <input type="number" className='w-full md:w-1/2 p-1 rounded outline-none
                               ring-1 ring-gray-400 focus:ring-1
                              focus:ring-blue-700 placeholder:px-1 input'
                              placeholder='Mobile Number' 
                              {...register('mobile')} />
                            </div>
                            <div className="flex justify-around">
                              <span className='md:w-1/3 hidden md:flex'></span>
                              {
                                errors.mobile && <span className=' flex justify-center md:justify-start w-full md:w-1/2 text-red-600 '>{errors.mobile?.message}</span>
                              }

                              
                              </div>
                            </div>


                            <div className="flex flex-col">
                             <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
                                    <span  className=" text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center font-medium">
                                    Email Address
                                    </span>
                              <input type="text" className=' w-full md:w-1/2 p-1 rounded outline-none ring-1 ring-gray-400 focus:ring-1
                              focus:ring-blue-700 placeholder:px-1'
                               placeholder='Email address' {...register('email')}/>
                            </div>
                            <div className="flex justify-around">
                              <span className='md:w-1/3 hidden md:flex'></span>
                              {
                                errors.email && <span className=' flex justify-center md:justify-start w-full md:w-1/2 text-red-600 '>{errors.email?.message}</span>
                              }
                              
                              </div>
                            </div>

                            <div className="flex flex-col">
                            <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
                              <span 
                              className=" 
                              w-full md:w-1/3 flex items-center text-gray-500
                              md:justify-center font-medium"
                              >Gender</span>
                              <div className="w-1/2  flex  px-1">
                                <label htmlFor="Male" className='mr-2 flex items-center'>
                                  <span className="mr-2">Male</span>
                               <input type="radio" name="gender" value='male' {...register('gender')}
                               className='size-5'
                               />
                                </label>
                               <label htmlFor="Female" className='ml-2 flex items-center'>
                                <span className="mr-2">Female</span>
                               <input type="radio" name="gender" value='female' {...register('gender')}
                               className='size-5'
                               />
                               </label>
                              </div>
                            </div>
                              <div className="flex justify-around ">
                              <span className='md:w-1/3 hidden md:flex'></span>
                              {errors.gender && <span className=' flex justify-center md:justify-start w-full md:w-1/2 text-red-600 '>{errors.gender?.message}</span>}
                              
                              </div>
                            </div>

                        <div className="flex flex-col ">
                            <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
                                    <span  className=" text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center font-medium">
                                    Birth day
                                    </span>
                              <input type="date" className='w-full md:w-1/2 p-1 rounded outline-none ring-1 ring-gray-400 focus:ring-1
                              focus:ring-blue-700 placeholder:px-1'
                               placeholder='First name and Last name' {...register('birthday')} />
                            </div>
                            <div className="flex justify-around">
                              <span className='md:w-1/3 hidden md:flex'></span>
                              {
                                errors.birthday && <span className=' flex justify-center md:justify-start w-full md:w-1/2 text-red-600 '>{errors.birthday?.message}</span>
                              }
                            
                              </div>
                            </div>

                        <div className="flex flex-col ">
                            <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
                                    <span  className=" text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center font-medium">
                                    Password
                                    </span>
                              <input type="text" className='w-full md:w-1/2 p-1 rounded outline-none ring-1 ring-gray-400 focus:ring-1
                              focus:ring-blue-700 placeholder:px-1'
                               placeholder='password' {...register('password')}/>
                            </div>
                            <div className="flex justify-around ">
                              <span className='md:w-1/3 hidden md:flex'></span>
                              {
                                errors.password && <span className=' flex justify-center md:justify-start w-full md:w-1/2 text-red-600  '>{errors.password?.message}</span>
                              }
                              
                              </div>
                            </div>
                            

                            <div className=" flex justify-center p-2 ">
                              <Button  type='submit' variant='outline'
                              className="w-full md:md:w-1/2 bg-red-600 font-medium 
                                 text-xl text-white p-2 md:w-full
                               hover:text-white hover:bg-red-500"
                              >Sign up </Button>
                               
                            </div>

                          </form>

                          </div>
                        </CardContent>
                        <CardFooter className=" flex justify-center md:items-center">
                          <div className="mb-2">Already Registered in Polyclinique ?</div> 
                          <Link to='/login' className='border-solid border-b-2
                           border-red-600 text-blue-600 font-semibold ml-2 mb-2'
                           >login</Link>
                          
                        </CardFooter>
                      </Card>

      </div>


    </div>
    
    </div>
 












     
      
      
    <Footer/>
    </>
  )
}

export default Signup