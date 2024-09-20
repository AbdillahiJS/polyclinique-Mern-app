
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"


const SignupSchema = yup.object().shape({
    name:yup.string().min(3,"length must not less than 3").required().defined(),
    carer:yup.string().required().defined(),
    specialized: yup.string().required().defined(),
    location: yup.string().required(),
   
  })
  import { useState } from 'react'
  // import imgAvatar from '../assets/bg-cover.png'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BiSolidEditAlt } from "react-icons/bi";
import { Description } from "./description"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getLocalStorage } from "@/util/localStorage"
import EditProfile from "./editProfile"
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';


const ProfileDescription = () => {

    const [preview,setPreview]=useState(null)
    const [lists,setLists]=useState([])

    let dateNow = moment().format()

    const {data} =useQuery({
      queryKey:['profile'],
      queryFn:async()=>{
        // toast(<span>Custom and <b>bold</b></span>);
            let doctorProfileRes = await axios.get('http://localhost:8000/doctor/profile',{
              headers:{
                "Authorization":getLocalStorage('token')
              }
            })
            return doctorProfileRes.data
          }
    
      })
   
      console.log(data);
      let names =data?.doctorName?.split(' ')
   
  
 
     const {
       register,
       handleSubmit,
       watch,
       formState: { errors },
     } = useForm({resolver: yupResolver(SignupSchema)})
     
     const onSubmit =(data)=> {
       console.log(data); 
      
     }

  return (
    <>
 
<div className="bg-white  ">
      <div className="relative h-[140px]">
    <header className="bg-blue-500 h-[120px] rounded z-2"></header>
<div className="ring-1 ring-white w-20 h-20  rounded-full  ring-offset-4 bg-black bottom-12 left-10 relative z-10">
<Avatar className='w-full h-full ring ring-slate-300'>
  <AvatarImage src={data?.profile} />
<AvatarFallback >{names?.map(name=>name.at(0)).join('').toUpperCase()}</AvatarFallback>
</Avatar>
</div>
   </div>

    <div className="flex justify-between mt-4 p-2">
      <div className="flex flex-col ">
        <p className="font-semibold text-md text-slate-600 mb-1 capitalize">{data?.doctorName} </p>
        <p className="font-semibold text-md text-slate-600 mb-1">{data?.doctorLocation}</p>
        <div className="flex">
          <p className="font-semibold text-md text-slate-600 mr-1">Age : {data?.doctorBirthDay?parseInt(dateNow)-parseInt(data?.doctorBirthDay):'?'}
       
          </p>

          <p className="font-semibold text-md text-slate-600 ml-1 mr-1">Gender : {data?.doctorSexe?data.doctorSexe :'?'}
         
          </p>

          <p className="font-semibold text-m text-slate-600 mr-1 ml-1">Status :
          <span className="text-green-500 ml-1">Active</span>
          </p>

        </div>
      </div>
      <div className=" bg-blue-500 flex items-center h-8  rounded-md  ring-1 ring-black">
        <BiSolidEditAlt className='md:text-xl mr-1 text-white font-bold ml-1'/>
        
        <EditProfile {...data}/>
     
      </div>
    </div>

<div className="mt-2 p-1">

 
       <Description email={data?.doctorEmail} specialty={data?.doctorSpecialty}  />
   
  
     

 

</div>      
    </div>










    {/* <div className="w-full bg-white">
  
  <div className=" w-full p-1 ">
  <form onSubmit={handleSubmit(onSubmit)} className="mb-2"> 
   <div className="ring-1 ring-blue-400 flex justify-center items-center mb-2">
     <div className="w-32 h-32  ring-1 ring-black p-1">
            <img src={preview ?preview:''} alt={""}
            className='ring-1 ring-red-400 rounded-full w-full h-full p-1 bg-fill'
            />
     </div>
      <input type="file" {...register('img')} accept='image/*' onChange={(e)=>{
       if (e.target.files[0].name != 0) {
         console.log(e.target.files[0])
         setPreview(URL.createObjectURL(e.target.files[0]))
         
       }
     }}
               
      className=' file:mr-4 file:py-2 file:px-4 ml-2
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-violet-700
                         hover:file:bg-violet-100' />
   </div>

    
    <div className="flex flex-col">
     <div className=" flex flex-col md:flex-row justify-around  py-2 px-2 ">
            <span  className=" text-gray-500 text-lg font-semibold w-full md:w-1/3 flex  md:items-center md:justify-center ">
            Your Name
            </span>
            <input type="text" className='w-full md:w-1/2 p-2 rounded outline-none ring-1 ring-gray-400 focus:ring-1
            focus:ring-blue-700 placeholder:px-1'
            // placeholder='First name and Last name' 
            {...register('name')}
            />
      </div>
       <div className="flex justify-around ">
      <span className=' md:w-1/3 hidden md:flex'></span>
      {
        errors.name && <span className=' w-full md:w-1/2 text-red-600 '>{errors.name?.message}</span>
      }
    </div>
    </div>
     
     
      
    

    <div className="flex flex-col">
     <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
            <span  className="text-lg font-semibold text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center ">
            You are what 
            </span>
      <input type="text" className='w-full md:w-1/2 p-2 rounded outline-none
       ring-1 ring-gray-400 focus:ring-1
      focus:ring-blue-700 placeholder:text-lg '
    //   placeholder='a doctor or consulat or what' 
      {...register('carer')} />
    </div>
    <div className="flex justify-around">
      <span className='md:w-1/3 hidden md:flex'></span>
      {
        errors.carer && <span className='w-full md:w-1/2 text-red-600 '>{errors.carer?.message}</span>
      }
      </div>
    </div>

      

    <div className="flex flex-col">
     <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
            <span  className="text-lg font-semibold text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center font-medium">
            Specialized description
            </span>
      <textarea  className='w-full md:w-1/2 p-2 rounded outline-none
       ring-1 ring-gray-400 focus:ring-1
      focus:ring-blue-700 placeholder:px-1 input'
    //   placeholder='Your specialized' 
      {...register('specialized')} />
    </div>
    <div className="flex justify-around">
      <span className='md:w-1/3 hidden md:flex'></span>
      {
        errors.specialized && <span className='w-full md:w-1/2 text-red-600 '>{errors.specialized?.message}</span>
      }

      
      </div>
    </div>

    <div className="flex flex-col">
     <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
            <span  className="text-lg font-semibold text-gray-500 w-full md:w-1/3 flex  md:items-center md:justify-center ">
           Clinique Location
            </span>
      <input type='text' className='w-full md:w-1/2 p-2 rounded outline-none
       ring-1 ring-gray-400 focus:ring-1
      focus:ring-blue-700 placeholder:px-1 input'
    //   placeholder='Location' 
      {...register('location')} />
    </div>
    <div className="flex justify-around">
      <span className='md:w-1/3 hidden md:flex'></span>
      {
        errors.location && <span className='w-full md:w-1/2 text-red-600 '>{errors.location?.message}</span>
      }

      
      </div>
    </div>





    <div className=" flex justify-center p-2">
      <Button  type='submit' variant='outline'
      className="w-full  bg-red-600 font-semibold
         text-xl text-white p-2 
       hover:text-white hover:bg-red-500"
      >Sign up </Button>
       
    </div>

  </form>

  </div>



</div> */}

    </>
  )
}

export default ProfileDescription