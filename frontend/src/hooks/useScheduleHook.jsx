import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getLocalStorage } from "@/util/localStorage"


const useSchedule = (id) => {

    const {data} = useQuery({
        queryKey:[id],
        queryFn:async()=>{
          try {
            let singleScheduleList =await axios.get(`http://localhost:8000/doctor/singleScheduleList/${id}`)
              return singleScheduleList?.data
              
            } catch (error) {
              console.log('ce quoi l erreur >',error);
            }
          },
       
      })

  return data
}

export default useSchedule