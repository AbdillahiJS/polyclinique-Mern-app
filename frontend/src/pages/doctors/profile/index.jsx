import React from 'react' 
import ProfileDescription from '../../doctors/profile/profileDescription'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Fees from './fees'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getLocalStorage } from "@/util/localStorage"


const index = () => {
  const {data} =useQuery({
    queryKey:['profile'],
    queryFn:async()=>{
   
          let doctorProfileRes = await axios.get('http://localhost:8000/doctor/profile',{
            headers:{
              "Authorization":getLocalStorage('token')
            }
          })
          return doctorProfileRes?.data
        }
  
    })

  return (
    <>
{!data?.isInformationComplet && 
<div className='bg-green-500 rounded mr-4 font-semibold text-red-600 w-full h-10 mb-2 flex items-center justify-center text-md visible'>
     Your Profile Information is not Complet so your Schedule and Your profile it won't appear In The Users Interface.? Please complet it Now
</div>
}

    <div className="md:flex flex-col items-center  lg:mt-2 mx-2 mt-2 ">
    <Tabs defaultValue="profile" className="md:w-[98%] lg:w-[60%] ">
  <TabsList className='ring-1 ring-black flex justify-start p-2 '>
    <TabsTrigger value="profile" className='text-lg font-semibold '>Profile</TabsTrigger>
    <TabsTrigger value="fees" className='text-lg font-semibold '>Fees</TabsTrigger>
  
  </TabsList>
  <TabsContent value="profile" className='w-[100%]'>
   <ProfileDescription/>
  </TabsContent>
  <TabsContent value="fees"><Fees/></TabsContent>
</Tabs>
</div>
    </>
  )
}

export default index