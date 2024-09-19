import React from 'react'
import { useParams } from 'react-router-dom'
import SearchSpecialty from '../../../component/SearchSpecialty'
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { getLocalStorage } from "@/util/localStorage"
import DoctorCard from '../../../component/DoctorCard';
import DorctorDetailCard from './dorctorDetailCard';
// import useRatingDoctor from '../../../hooks/useRatingDoctor';


const DetailPage = () => {
  
  



  return (
    <>
    <div className="mx-2 lg:container flex flex-col items-center ">
  <SearchSpecialty/>

  <DorctorDetailCard />


    </div>
    </>
  )
}

export default DetailPage