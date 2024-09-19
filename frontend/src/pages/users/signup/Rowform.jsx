import  React  from 'react'

const Rowform = React.forwardRef(({ register,children },ref) => {
  return (
    <>
     <div className=" flex flex-col md:flex-row justify-around mb-2 py-2 px-2">
        <span 
                className=" text-gray-500 w-full
                md:w-1/3 flex  md:items-center 
                md:justify-center font-medium"
        >
            {children}
        </span>

          <input type="text" {...register}

            className='w-full md:w-1/2 p-1 rounded outline-none ring-1 ring-gray-400 focus:ring-1
            focus:ring-blue-700 placeholder:px-1'
            
/>


      </div>
    </>
  )
})

export default Rowform