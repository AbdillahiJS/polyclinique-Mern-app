import React from 'react'
import ProfileDescription from '../doctor/profile/profileDescription'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Fees from './fees'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getLocalStorage } from '../../../util/localStorage'


// import { Description, listDescription } from './description'




const index = () => {



 



  return (
    <>
    <div className="ring-1 ring-red-700 flex flex-col items-center ">
    <Tabs defaultValue="profile" className="w-[60%]  ring-1 ring-blue-500">
  <TabsList className='ring-1 ring-black flex justify-start p-2 '>
    <TabsTrigger value="profile" className='text-lg font-semibold '>Profile</TabsTrigger>
    <TabsTrigger value="fees" className='text-lg font-semibold '>Fees</TabsTrigger>
    <TabsTrigger value="info" className='text-lg font-semibold '>Info</TabsTrigger>
  </TabsList>
  <TabsContent value="profile" className=''>
   <ProfileDescription/>
  </TabsContent>
  <TabsContent value="fees"><Fees/></TabsContent>
</Tabs>
</div>
    </>
  )
}

export default index