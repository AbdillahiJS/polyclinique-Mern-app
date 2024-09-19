import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Card,CardContent,CardHeader} from "@/components/ui/card"
import { AiTwotoneMail } from "react-icons/ai";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';
import DisableBackButton from '../../../component/BackButton';

const ThankYou = () => {

   let {bookingId} = useParams()

const {data}=useQuery({
    queryKey:[bookingId],
    queryFn:async()=>{
         try {
           let bookingDetailRes = await axios.get(`http://localhost:8000/users/reservation/${bookingId}/thankyou`)
           return bookingDetailRes?.data
         } catch (error) {
            console.log('booking Error client');
         }
    },
})


 
 const {mutate} =useMutation({
   mutationFn:async(appointmentData)=>{
    try {
      let sendingAppointment= await axios.post(`http://localhost:8000/users/appointmentEmail/${bookingId}`,appointmentData)
      return sendingAppointment?.data
    } catch (error) {
      console.log('appointment client Err ',error);
    }
  
   },
   onSuccess:(data)=>{
     console.log('appointment is sent >',data)
     toast.success(data)
     
    }
    
  })
  

console.log('booking data >',data);
const submitAppointment=()=>{
  mutate(data)

}

  return (
    <>
{/* <DisableBackButton/> */}
    <div className="container  mt-2 pt-4  flex justify-center flex-col items-center">
      {/* <div className="bg-white w-[45%] mb-2 p-2 rounded text-red-500 text-[1.2em]">fff</div> */}
      <Toaster/>
        <Card className='w-[45%] '>
            <CardHeader className=" flex justify-center items-center h-28 bg-gray-400 mb-2">
            <AiOutlineCheck className='text-green-300 font-bold ring-2 ring-green-300 h-10 w-10 rounded-full text-md p-1 mb-2'/>
                <p className="text-lg text-white">Your booking was successfully submitted</p> 
            </CardHeader>

            <CardContent>
                <div className="">
                    <div className="flex items-center p-2">
                    <AiTwotoneMail className='text-3xl text-blue-500'/>
                    <p className='ml-4 text-md  text-slate-600  text-[1.1em]'>Doctor is notified through the email</p>
                    </div>
                    <div className="flex items-center p-2">
                    <FaMoneyBill1Wave className='text-3xl text-blue-500'/>
                    <p className='ml-4 text-md  text-slate-500 text-[1.1em]'>Examination fees : 600fdj</p>
                    </div>

                </div>
              <h2 className='text-slate-400 mt-2 p-2 text-lg font-semibold underline underline-offset-4'>
                Booking details
                </h2>
              
           <div className=" flex flex-col mb-2">
    
              <div className=" flex  text-slate-600 text-[1.1em] underline underline-offset-4">
              <span className='p-2'>Patient name</span>
              <p className="p-2">{data?.patientName}</p>
              </div>
              <div className=" flex  text-slate-600 text-[1.1em] underline underline-offset-4">
              <span className='p-2'>Patient Mobile</span>
              <p className="p-2">{data?.patientMobile}</p>
              </div>

              <div className=" w-full flex text-slate-600 text-[1.1em] underline underline-offset-4">
              <span className='p-2'>Booking date</span>
              <p className="p-2">{data?.bookingDate}</p>
              </div>

              <div className=" flex text-slate-600 text-[1.1em] underline underline-offset-4">
              <span className='p-2'>Doctor Name</span>
              <p className="p-2">{data?.bookedDoctor}</p>
              </div>

              
              <div className=" w-full flex text-slate-600 text-[1.1em] underline underline-offset-8">
                <span className='p-2'>Clinic address</span>
                <p className="p-2">{data?.clinicBooked}</p>

              </div>
                
               
            </div>
            
           <div className="p-2 flex justify-center">
            <button className='bg-blue-500 text-white px-2 p-2 text-lg font-semibold rounded w-1/2 hover:bg-red-600'
            onClick={()=>submitAppointment()}
            >My Appointment</button>
           </div>

            </CardContent>

        </Card>

    </div>
    </>
  )
}

export default ThankYou