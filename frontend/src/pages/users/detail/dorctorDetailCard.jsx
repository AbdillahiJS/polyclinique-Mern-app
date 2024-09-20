import {useState} from 'react'

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import moment from 'moment';
import Rating from '../../../component/Rating'
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { getLocalStorageUser } from '../../../util/localStorage'
import RightBookingInfo from './rightBookingInfo'
import { useNavigate, useParams } from 'react-router-dom'
import useUserDetailName from '../../../hooks/useUserDetailName'
import toast, { Toaster } from 'react-hot-toast';




const DorctorDetailsCard = () => {
  const {doctorName} = useParams()
  
  let name = doctorName?.split('-').map(name=>name).join(' ')

 const  data = useUserDetailName(name)



  
  return (
    <>
    <div className="flex justify-between w-full ">  
   <div className="w-full md:w-[50%] mb-2 rounded flex flex-col  ">
      <Card className="  md:p-4">
     
        <CardContent className=' flex flex-col lg:flex-row p-2'>
        <div className="flex     p-1">
                 <Avatar className='w-20 h-20 md:w-22 md:h-22 ring-2 ring-slate-300'>
                    <AvatarImage src={data?.detailOne?.profile} alt="@shadcn" />
                    <AvatarFallback>{doctorName?.split('-').map(name=>name.at(0)).join('').toUpperCase()}</AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col p-1  c font-semibold text-slate-500 ml-2 md:ml-0 lg:hidden">
              <div className="text-lg capitalize"> Doctor {doctorName?.split('-').map(name=>name).join(' ')}</div>
              <div className=" mt-2 ">{data?.detailOne?.views} view(s)</div>
             
            </div>
          </div>
        
          <div className=" w-full  flex flex-col">
            <div className="lg:flex justify-between p-1   font-semibold text-slate-500 hidden ">
              <div className="text-xl capitalize"> Doctor {doctorName?.split('-').map(name=>name).join(' ')}</div>
              <div className="text-lg ">{data?.detailOne?.views} view(s)</div>
            </div>
          <div className="flex flex-col ">
            <span className=" font-semibold text-gray-500 text-md p-1">{data?.detailOne?.doctorDescriptionSpecialized}</span>
            <div className="">
            <span className=" font-semibold text-gray-500 text-md p-1">specialized </span>
            <span className=" font-semibold text-blue-500 text-md p-1">{data?.detailOne?.doctorSpecialty}</span>
            </div>

          </div>
          </div>
          
        </CardContent>
       </Card>
       <div className="md:w-[40%] mt-2 md:mt-0 h-1/2 mr-2 md:hidden md:flex">
       <RightBookingInfo id={data?.detailOne?._id}/> 
       </div> 
        <PostComments doctorName={doctorName} listComments={data?.findAllCommentforDoctor} doctorId={data?.detailOne?._id}/>
    </div>
        <div className="w-[40%] h-1/2 mr-2 hidden md:flex">
       <RightBookingInfo id={data?.detailOne?._id} fees={data?.detailOne?.fees}/> 
       </div> 
     
    </div>
    </>
  )
}

export default DorctorDetailsCard


const commentSchema = yup.object().shape({

  commentInput:yup.string().required().defined('Comment is required'),
 
})


 const PostComments=({doctorName,listComments,doctorId})=>{
  const [rating, setRating] = useState(0);
  let name = doctorName.split('-').map(name=>name).join(' ')
  let navigate = useNavigate()

  const {data} =useQuery({
    queryKey:['userLogin'],
    queryFn:async()=>{
      try {
       let userLoginRes  =await axios.get('http://localhost:8000/users/userLogin',{
          headers:{
            "Authorization":getLocalStorageUser('userToken')
          }
        })
        return userLoginRes.data
      } catch (error) {
        console.log('login client error');
      }
    }
  })

let userName=data?.name
const queryClient = useQueryClient()

const {mutate}=useMutation({
  mutationFn:async(commentData)=>{
    try {
      let commentRes = await axios.post('http://localhost:8000/users/comment',commentData,{
        headers:{
          "Authorization":getLocalStorageUser('userToken')
        }
      })
      return commentRes.data
      
    } catch (error) {
      console.log('clientComment >',error);
    }
  },
  onSuccess:(data)=>{
   
    toast.success(data)
    queryClient.invalidateQueries({ queryKey:[name]})
    // queryClient.refetchQueries(name)
  }
})

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({resolver: yupResolver(commentSchema)})

  const onSubmit =(data)=> {  
    if(!!getLocalStorageUser('userToken')){
      mutate({...data,userName,time:new Date(),name,doctorId})
      setRating('')
      reset()
    }else{
      navigate('/login')
    }

  }


  return (
    <>
<Toaster />
    <div className="w-full mt-4">
     
    <Card className=" flex flex-col p-4 mb-4 w-full">
   
        <CardContent className='p-2'>
          
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col  w-full '>
          <div className="flex flex-col justify-center items-center w-[100%] ">
          <Rating rating={rating} setRating={setRating} setValue={setValue}/>
         <textarea {...register('commentInput')} className='ring-1 ring-slate-400 outline-none md:w-[70%] w-[90%]'></textarea>
         <button type='submit' className='bg-blue-500 p-2 text-lg rounded text-white my-2 md:w-[70%] w-[90%] capitalize'>post</button>

          </div>

        <div className=" flex justify-center ">
           { errors.commentInput && <span className='w-full text-red-500 font-semibold p-1 '>{errors?.commentInput?.message}</span>}
        
        </div>
        </form>   
        </CardContent>
        </Card>
        {
        listComments?.map(comment=>{
         
          return <Posts doctorName={doctorName} key={comment._id} {...comment}/>
        })
      }
        
    </div>
    
    </>
  )

}


const Posts=({userName,comment,rating,timePosted})=>{

  return (
    <>
    <Card className=" mt-2">
    

    <CardContent className='my-2'>
          <div className=" p-2 flex">
          
                 <div className="flex justify-between w-full">
                 <span className=" ml-2 p-2 flex items-center text-lg">{userName}</span>
                 <span className=" ml-2 p-2 flex items-center">{moment(timePosted).fromNow()}</span>

                 </div>
          </div>
          <div className=" w-full p-2">
          <div className="text-3xl w-[70%] my-1">
      {[1, 2, 3, 4, 5].map((value) => (
    <span key={value} style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}>★</span>
      ))}
    </div>
           
             {
             comment.map(singleComment=>{
              return <p key={singleComment} className="text-lg">{singleComment}</p>
             })
              
              
              
              }
            
                
            
            
          </div>
         
        </CardContent>
        </Card>

    </>
  )
}