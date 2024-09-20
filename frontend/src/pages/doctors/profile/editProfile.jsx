
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { useForm } from "react-hook-form"
  import { yupResolver } from "@hookform/resolvers/yup"
  import * as yup from "yup"
  import { Button } from "@/components/ui/button"
  import { useState } from 'react'
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { getLocalStorage } from "@/util/localStorage"


  const editProfileSchema = yup.object().shape({

      editProfileName:yup.string().min(3,"length must not less than 3").required().defined('Name is required'),
      editProfileSpecialty:yup.string().required('Specialty is required').defined('Specialty must be defined'),
      editProfileSpecialized: yup.string().required('Specialized is required').defined(),
      editProfileLocation: yup.string().required('Location is required'),
      editProfileSex: yup.string().required('Gender is required'),
      editProfileDateNaissance:yup.string().required('Date de Naissance is required'),
      profileImg:yup.mixed().test("profileImg", "You need to provide a file", (value) => {
        return value && value.length > 0;
        }),
    })


const EditProfile = ({doctorName,doctorSpecialty,doctorBirthDay,doctorLocation,
  doctorDescriptionSpecialized,doctorSexe,profile  }) => {
    const [preview,setPreview]=useState(null)
    const [lists,setLists]=useState([])
    
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
      mutationFn:async(updateData)=>{
        try {
          let updateProfileClient = await axios.put('http://localhost:8000/doctor/profile',updateData,{
             headers:{
               "Authorization":getLocalStorage('token')
             }
           })
           return updateProfileClient?.data
           
          } catch (error) {
            console.log('putClients >',error);
          }
        },
        
      onSuccess:(data)=>{
        queryClient.invalidateQueries({ queryKey: ['profile'] })
      } 
    })
      


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm({resolver: yupResolver(editProfileSchema)})
      
      const onSubmit =(data)=> {
        const formData = new FormData();
    formData.append('profileImg', data.profileImg[0]);
    formData.append('editProfileName', data.editProfileName);
    formData.append('editProfileSpecialty', data.editProfileSpecialty);
    formData.append('editProfileSpecialized', data.editProfileSpecialized);
    formData.append('editProfileLocation', data.editProfileLocation);
    formData.append('editProfileSex', data.editProfileSex);
    formData.append('editProfileDateNaissance', data.editProfileDateNaissance);
       
          mutate(formData)
  }




  return (
    <>
    <Dialog>
    <DialogTrigger className="rounded text-white font-semibold text-md mr-1 ">
        Edit Profile
    </DialogTrigger>
  <DialogContent>
    <DialogHeader >
      
    </DialogHeader>
    <div className="w-full bg-white">
  
  <div className=" w-full ">
     
  <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"   className="mb-2 flex flex-row-reverse"> 
   <div className=" flex flex-col items-center p-1 w-1/3 mb-2 ">
     <div className="w-24 h-24  ">
            <img src={preview ?preview:profile} alt={""}
            className='ring-2  rounded-full w-full h-full p-1 bg-cover '
            />
     </div>
      <input type="file" 
      {...register('profileImg')} 
     
      accept='image/*'  
      onChange={(e)=>{
       if (e.target.files[0]) {
         console.log(e.target.files[0])
         setPreview(URL.createObjectURL(e.target.files[0]))
        
         console.log(e.target.files[0]);
       }
     }}
               
      className=' file:mr-4 file:py-2 file:px-4 ml-2 mt-2 
                           w-full h-full
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-violet-700
                         hover:file:bg-violet-100' />
   </div>

  <div className="w-full">

    <div className="flex flex-col">
     <div className=" flex flex-col mb-2">
            <span  className=" text-gray-500 text-lg font-semibold w-full ">
            Your Name
            </span>
            <input type="text" className='w-full p-2 rounded outline-none ring-1 ring-gray-400 focus:ring-1
            focus:ring-blue-700 placeholder:px-1' 
            defaultValue={doctorName}
            {...register('editProfileName')}
            />
      {
        errors.editProfileName && <span className=' w-full md:w-1/2 text-red-600 '>{errors?.editProfileName?.message}</span>
      }
      </div>
    </div>


     
    <div className="flex flex-col">
     <div className=" flex flex-col mb-2">
        <span  className=" text-gray-500 text-lg font-semibold w-full ">Date de naissance</span>
        <input type="date" className='w-full  p-2 rounded outline-none ring-1 ring-gray-400 focus:ring-1
            focus:ring-blue-700 placeholder:px-1' 
            defaultValue={doctorBirthDay}

            {...register('editProfileDateNaissance')}
            />
      {
        errors.editProfileDateNaissance && <span className=' w-full  text-red-600 '>{errors?.editProfileDateNaissance?.message}</span>
      }
      </div>
      
    </div>



    <div className="flex flex-col">
                            <div className=" flex flex-col mb-2">
                              <span 
                              className=" w-full  text-gray-500 font-semibold text-lg "
                              >Gender</span>
                              <div className="w-1/2  flex  px-1">
                                <label htmlFor="Male" className='mr-2 flex items-center font-semibold'>
                                  <span className="mr-2">Male</span>
                               <input type="radio" name="sex" value='male' {...register('editProfileSex')}
                               className='size-5'
                               defaultChecked={doctorSexe==='male'}
                               />
                                </label>
                               <label htmlFor="Female" className='ml-2 flex items-center font-semibold'>
                                <span className="mr-2">Female</span>
                               <input type="radio" name="sex" value='female' {...register('editProfileSex')}
                               className='size-5'
                               defaultChecked={doctorSexe==='female'}
                               />
                               </label>
                              </div>
                            {errors.editProfileSex && <span className=' w-full md:w-1/2 text-red-600 '>{errors?.editProfileSex?.message}</span>}
                            </div>
                  </div>
                              
                              
                              
                      
     
     
      
    

    <div className="flex flex-col ">
     <div className=" flex flex-col mb-2">
            <span  className="text-lg font-semibold text-gray-500 w-full ">
            You Specialty 
            </span>
      <input type="text" className='w-full p-2 rounded outline-none
       ring-1 ring-gray-400 focus:ring-1
      focus:ring-blue-700 placeholder:text-lg '
    defaultValue={doctorSpecialty}
    {...register('editProfileSpecialty')} />
      {
        errors?.editProfileSpecialty && <span className='w-full md:w-1/2 text-red-600 '>{errors?.editProfileSpecialty?.message}</span>
      }
    </div>
    
      
    </div>

    

    <div className="flex flex-col ">
     <div className=" flex flex-col mb-2">
            <span  className="text-lg font-semibold text-gray-500 w-full">
            Specialized description
            </span>
      <textarea  className='w-full p-2 rounded outline-none
       ring-1 ring-gray-400 focus:ring-1
      focus:ring-blue-700 placeholder:px-1 input'
    defaultValue={doctorDescriptionSpecialized}
      {...register('editProfileSpecialized')} />
      {
        errors.editProfileSpecialized && <span className='w-full md:w-1/2 text-red-600 '>{errors?.editProfileSpecialized?.message}</span>
      }
    </div>
  </div>
    

    <div className="flex flex-col ">
     <div className=" flex flex-col mb-2">
            <span  className="text-lg font-semibold text-gray-500 w-full   ">
           Clinique Location
            </span>
      <input type='text' className='w-full  p-2 rounded outline-none
       ring-1 ring-gray-400 focus:ring-1
      focus:ring-blue-700 placeholder:px-1 input'
   defaultValue={doctorLocation}
      {...register('editProfileLocation')} />
      {
        errors.editProfileLocation && <span className='w-full md:w-1/2 text-red-600 '>{errors.editProfileLocation?.message}</span>
      }
    </div>
  </div>





    <div className=" flex justify-center mt-2">
      <Button  type='submit' variant='outline'
      className="w-full  bg-blue-600 font-semibold
         text-xl text-white
       hover:text-white hover:bg-red-500"
      >Edit Profile </Button>
       
    </div>
</div>
  </form>

  </div>



</div>
   
  </DialogContent>



</Dialog>

    
    </>
  )
}

export default EditProfile