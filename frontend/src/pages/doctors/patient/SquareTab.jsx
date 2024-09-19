import React from 'react'



const SquareTab = ({patient,icons,title,className}) => {
  return (
    <>
    <div className={`rounded bg-white  lg:w-[70%] h-20 flex justify-around items-center  ${className}`}>
      <div className="">
       <h1 className='text-lg font-semibold'>{title}</h1>
       <p className="text-lg font-semibold"> {patient}</p>
       
      </div>
      {icons}
    </div>
    </>
  )
}

export default SquareTab