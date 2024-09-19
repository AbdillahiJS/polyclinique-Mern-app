

import sideImage2 from '@/assets/sideImage2.png'
import { LuCalendarPlus } from "react-icons/lu";
import {specialtylist} from '@/data/specialtylist'


import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {
  const [specialUrl, setSpecialUrl] = useState('')

 
  
  return (
    <>
 <div className="h-screen  md:h-screen w-screen flex flex-col "  >


    <div className=" w-screen flex    lg:pt-5  h-[100%]  "   >

      <div className=" md:w-[50%] ml-4 h-[99%]  hidden md:flex">
        <img src={sideImage2} alt="sideImage1" className='w-full h-full objectif-cover mix-blend-darken'/> 
     </div> 
     
<div className="w-[95%] h-[90%] px-4 ml-2 lg:mr-4 lg:w-[50%] mb-2 md:mr-4 mt-20 md:mt-0 flex flex-col items-center  ">

<div className="w-full md:w-[100%] hidden md:flex h-[10%] items-center mt-10 justify-center   mb-2">

<p className='text-4xl font-bold text-slate-600 text-center md:w-[100%] '>
  Better Healthcare for Better Life Book for your favorite Doctor
</p>
</div>

<Card className="w-full mt-10 shadow-none bg-white lg:mr-10">
  <CardHeader className="">
  <div className="flex items-center text-blue-600"> 
      <div className="">
         <LuCalendarPlus className="text-5xl mr-4"/>
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-xl">Book a doctor</p>
        <span className="">Examination or procedure</span>
      </div>
  </div>
<div className=" w-full mt-2 ring-1 ring-blue-600"></div>
</CardHeader>

  <CardContent className=" flex flex-col md:flex-row md:justify-center md:items-center  md:p-4">
    <Select className="" onValueChange={(value)=>{
setSpecialUrl(value)
    }}>
  <SelectTrigger  className=" text-blue-500 text-xl tracking-wider font-bold mt-2 ">
     <SelectValue placeholder="Choose Specialty"  className=" text-xl"/>
  </SelectTrigger>
  <SelectContent  className="text-blue-600 " >
  {
    specialtylist.map((specialty)=>{
      return  <SelectItem key={specialty.id} value={specialty.valeur} >
      
        {specialty.specialty}

    
     
        
        </SelectItem>
  })
}
  </SelectContent>
    
      
      


</Select> 

     <Button variant="outline"  className="bg-red-500 hover:bg-red-400
                    hover:text-white md:ml-2 mt-3
                      text-white font-bold tracking-wider 
                      text-xl"
                      // onClick={()=>console.log('try: ',specialUrl)}
                      > 
                      <Link to={`${specialUrl}`}>
                      Recherche
                      </Link>

      </Button>
       
     
        
   
</CardContent>
</Card> 
</div>
   </div>
   </div>
    </>
    
  )
}

export default Hero