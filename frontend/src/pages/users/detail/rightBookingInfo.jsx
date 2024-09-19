
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
  import { GiPositionMarker } from "react-icons/gi";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import ScheduleUser from "../../doctors/schedule/scheduleUser";
import useSchedule from "../../../hooks/useScheduleHook";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/assets/style.css';
import useFetchFeesHook from "../../../hooks/useFetchFeesHook";


const RightBookingInfo = ({id,fees}) => {

  const data =useSchedule(id) 



  if (!Array.isArray(data)) {
    return <div className="text-lg tracking-widest">Laoding ...</div>; // or some fallback UI
  }

  return (
    <Card className="w-[100%] ">
        <CardHeader className='bg-blue-500 text-center text-white font-semibold p-1 tracking-widest text-lg rounded-t'>
    Booking Information
        </CardHeader>
        <CardContent className='flex flex-col justify-around p-2'>
            <div className="flex mt-4 ">
<div className=" w-1/2 flex justify-center items-center flex-col p-1">
<GiPositionMarker className="mr-4 text-blue-700 text-3xl border-b-2 border-b-red-500 mb-2"/>

<span className="text-slate-600 text-lg">fees: ${fees}</span>
</div>
<div className=" w-1/2 flex justify-center items-center flex-col p-1">
<FaMoneyBill1Wave className="mr-4 text-blue-700 text-3xl flex justify-center items-center flex-col mb-2 border-b-2 border-b-red-500"/>
<span className="text-slate-600 text-lg" >hayableh</span>

</div>

            </div>
<div className="border-b border-slate-300 border-1"></div>
 <div className="flex justify-center items-center">

<div className=" w-[90%]  mt-5 mb-4 ">
  <ScheduleUser id={id}/>
 </div>
</div>
<div className="text-slate-500 text-lg tracking-wider mt-2  mb-5  flex items-center justify-center">
  Appointment Reservation
</div>

        </CardContent>
    </Card>
  )
}

export default RightBookingInfo