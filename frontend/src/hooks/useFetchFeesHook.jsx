import React from 'react'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getLocalStorage } from "@/util/localStorage"


const useFetchFeesHook = () => {

    const {data} = useQuery({
        queryKey:['fees'],
        queryFn:async()=>{
          try {
            let getFees =await axios.get(`http://localhost:8000/doctor/fees`)
              return getFees?.data
              
            } catch (error) {
              console.log('ce quoi l erreur > ',error);
            }
          },
       
      })

  return data


 
}

export default useFetchFeesHook