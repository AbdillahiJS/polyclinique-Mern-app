import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../../component/Footer'
import Hero from '../home/heroSection'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Link } from 'react-router-dom';
import { specialtylist } from '../../../data/specialtylist'
import { useState } from 'react';
import DoctorCard from '../../../component/DoctorCard'
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { getLocalStorage } from "@/util/localStorage"
import SearchSpecialty from '../../../component/SearchSpecialty'





const SpecialtyPage = () => {
  const [specialUrl, setSpecialUrl] = useState('')
  const {specialty}=useParams()

 


  const {data,isLoading} = useQuery({
    queryKey:[specialty],
    queryFn:async()=>{
    let specialtyList =await axios.get(`http://localhost:8000/users/specialty/${specialty}`,{
        headers:{
          "Authorization":getLocalStorage('token')
        }
      })
      return  specialtyList.data
    },
    // staleTime: 10
   
  })



  
  return (
    <>

    <div className=" lg:w-[90%] lg:mt-4 ">
    
    <div className=" lg:container  w-full flex flex-col ">
      <SearchSpecialty/>
   <div className=" ">
      <div className="mb-2 font-semibold text-lg ml-2 text-slate-700 flex justify-start ">{specialty}</div>
 
      {
        isLoading && <div className="text-2xl text-center mt-4 h-screen">Loading ...</div>
      }
    

      {
        data?.map(specialty=>{
          if(specialty.isInformationComplet){
            
            return <DoctorCard key={specialty._id} {...specialty} specialty={specialty} />
          }
          else{
            return null
          }

        })
      }

     
 { 
      data?.length<=3 && ( <div className="h-screen flex justify-center mt-[5vh]"> 
      </div> )
     }  


       

    </div>

    
   </div>
      
       
     
        
   
    <Footer/>
    </div>


    
    </>
  )
}

export default SpecialtyPage