import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


const UserConfirmation = () => {


    const {token} = useParams()
     
    const {data,isError,isLoading} = useQuery({
     queryKey:['userConfirmation'],
     queryFn:async()=>{
       try {
         let confirmationRes = await axios.get(`http://localhost:8000/users/confirmation/${token}`)
         return confirmationRes.data
       
       } catch (error) {
         console.log(error)
       }
     }
    })
 
    
    if(isError){
     return <div className="text-2xl text-red-600">Error</div>
    }

  return (
    <>
    <div className='flex justify-center items-center flex-col mt-10'>
      <div className='text-xl text-green-600'>{data}</div>
    
    <Link to='/login' className='text-blue-500 text-2xl underline mt-6'>Login</Link>
    
    </div>
    
    </>
  )
}

export default UserConfirmation