import React from 'react'
import { useState } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { specialtylist } from '../data/specialtylist';
import { Link } from 'react-router-dom';


const SearchSpecialty = () => {
  const [specialUrl, setSpecialUrl] = useState('')

  return (
    <div className=" mb-2  p-1 w-[100%] lg:w-full ">

    <Card className="lg:w-[80%] p-2 mt-2 ">
      <CardContent className=" flex flex-col md:flex-row md:justify-center md:items-center p-1">
        <Select className="" onValueChange={(value)=>{setSpecialUrl(value)}}>
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
            <Button variant="outline"  className="bg-red-500 hover:bg-red-400 hover:text-white md:ml-2 mt-3
                                        text-white font-bold tracking-wider text-xl" > 
                                          <Link to={`/${specialUrl}`}>
                                          Recherche
                                          </Link>
            </Button>
    </CardContent>
    </Card>   
    
       </div>
  )
}

export default SearchSpecialty