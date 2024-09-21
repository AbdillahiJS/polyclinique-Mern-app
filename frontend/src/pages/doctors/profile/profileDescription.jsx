
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"



  import { useState } from 'react'
 
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
       
            let doctorProfileRes = await axios.get('http://localhost:8000/doctor/profile',{
              headers:{
                "Authorization":getLocalStorage('token')
              }
            })
            return doctorProfileRes.data
          }
    
      })
   
  
      let names =data?.doctorName?.split(' ')
   
  
 

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

    </>
  )
}

export default ProfileDescription