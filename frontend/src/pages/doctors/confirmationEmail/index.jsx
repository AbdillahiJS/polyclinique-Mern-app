import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


const ConfirmationEmail = () => {
   const {token} = useParams()
     
   const {data,isError,isLoading} = useQuery({
    queryKey:['emailConfirmation'],
    queryFn:async()=>{
      try {
        let confirmationRes = await axios.get(`http://localhost:8000/doctor/confirmation/${token}`)
        return confirmationRes?.data
      
      } catch (error) {
        console.log(error)
      }
    }
   })

   console.log(data);
   if(isError){
    return <div className="text-2xl text-red-600">Error</div>
   }

  return (
<>
{/*  */}
<div className="flex justify-center items-center flex-col mt-[10vh]">

   <div className="text-green-500 text-3xl font-semibold tracking-wide">{data}</div>

   {data === 'confirmation Server error'?  <Link to='/doctor' className='text-blue-500 text-xl underline mt-6'>Register</Link>:
   
   <Link to='/doctor/doctorLogin' className='text-blue-500 text-xl underline mt-6  s'>Login</Link>
   
   }

</div>
</>
  )
}

export default ConfirmationEmail