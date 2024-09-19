import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/assets/style.css';
import moment from 'moment';
import 'moment/locale/fr'

import { Pagination, Navigation } from 'swiper/modules';

import useSchedule from '../../../hooks/useScheduleHook';
import { Link } from 'react-router-dom';


export default function ScheduleUser({id}) {


  const data = useSchedule(id)
  // console.log('User-Swiper >',data);
  if (!Array.isArray(data)) {
    return <div className="text-lg">Laoding ...</div>; // or some fallback UI
  }




  return (
    <>
    {data.length===0 && <div className='w-full h-full flex
    items-center justify-center pl-1 text-xl font-bold'>
      No schedule yet
    </div>}
      <Swiper 
      
        slidesPerView={3}
        // centeredSlides={true}
        spaceBetween={10}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className=" w-full h-full bg-white "
        // cssMode={true}
        // onSwiper={(swiper) => console.log('swiper')}
        // onSlideChange={() => console.log('slide change')}
      >



        {
          data?.map((slideContent)=>(
            <SwiperSlide key={slideContent._id} className=' flex flex-col justify-between bg-white ring-1 ring-blue-400'>
            {/* <Link to={`/reservation/${slideContent._id}`} className='  w-full  hover:bg-gray-200'> */}
              
                 <div className="bg-blue-500  text-white text-lg font-medium w-full p-2">{slideContent.date}</div>
  
              <div className="flex flex-col  justify-between items-center   h-full">
                {
                  slideContent.isAvailable ? <span className="font-semibold text-lg flex items-center h-full p-6">
                    Not Available
                    </span>
                    :(
                    <>
                    <span className="font-semibold text-lg">{slideContent.from}</span> 
                   <span className="">jusqu'a</span>
                    <span className="font-semibold text-lg">{slideContent.to}</span>  
                    </>
                  )
                }
  
                </div>
                <Link to={`/reservation/${slideContent._id}`} className='  w-full  '>
                {
                  !slideContent.isAvailable &&
                <div  className="text-white text-xl font-medium w-full  bg-red-600 hover:bg-black flex items-center justify-center">
                    Book
                </div>
                }
                </Link>
               
                  
                    
                  
              
  
  {/* </Link>  */}
              </SwiperSlide>
  
            
            ))
      }
        
      </Swiper>

     
    </>
  );
}
