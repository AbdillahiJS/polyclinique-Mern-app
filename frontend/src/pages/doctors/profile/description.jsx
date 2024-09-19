

import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";


export const Description = ({email,specialty}) => {
  const details = [
    { icon: <IoPersonOutline className='font-semibold text-xl' />, role: 'Role', title: specialty },
    { icon: <MdOutlineMailOutline className='font-semibold text-xl' />, role: 'Email', title: email }
  ];

  return (
    <>
      {details.map((detail, index) => (
        <DescriptionDetail
          key={index}
          icon={detail.icon}
          role={detail.role}
          title={detail.title}
        />
      ))}
    </>
  )
}

export const DescriptionDetail=({icon,role,title})=>{
  return (
    <>
    <div  className="w-1/2 flex justify-between mb-2 p-1">
      <div className="flex items-center font-semibold text-slate-600 ">
      {icon}
      <span className="font-semibold text-md ml-1">{role}</span>
      
      </div>
      <div className=" w-1/2 text-slate-600 font-semibold capitalize">{title}</div>
      </div>  
    </>
  )
}