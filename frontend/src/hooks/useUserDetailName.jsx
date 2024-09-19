import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getLocalStorage } from "@/util/localStorage"


const useUserDetailName = (name) => {

    const {data} = useQuery({
        queryKey:[name],
        queryFn:async()=>{
            try {
                let detailPerson =await axios.get(`http://localhost:8000/users/detail/${name}`)
                  return detailPerson?.data
                  
                } catch (error) {
                    console.log('userDetailError >',error);
                }
            },
       
      })

  return data
}

export default useUserDetailName