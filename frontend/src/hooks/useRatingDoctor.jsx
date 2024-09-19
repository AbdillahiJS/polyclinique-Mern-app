
// import React from 'react'
// import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';

// const useRatingDoctor = (id) => {

//     const {data} = useQuery({
//         queryKey:['ratingDoctor'],
//         queryFn:async()=>{
//         let rating =await axios.get(`http://localhost:8000/users/ratingforDoctor/${id}`)
//           return  rating?.data
//         },
//         // staleTime: 10
       
//       })

//   return data
// }

// export default useRatingDoctor