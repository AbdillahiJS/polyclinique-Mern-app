
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



import { IoMdArrowDropdown } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";
import { removeLocalStorage } from "../util/localStorage";

export function DropdownMenuDemo({name,profile}) {
 let names =name?.split(' ')
     
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        
          <Avatar className='h-12 w-12 p-1  ring-1 ring-black'>
<AvatarImage src={profile} />
  <AvatarFallback className='font-semibold'>{names?.map(name=>name.at(0)).join('').toUpperCase()}</AvatarFallback>
</Avatar>
          
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-2 shadow-md">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <Link to='/doctor/doctorLogin'> 
         <DropdownMenuItem>
          <button onClick={()=>removeLocalStorage('token')}>
            Log out
            </button>
         
        </DropdownMenuItem>
        </Link>
          
        <DropdownMenuSeparator />
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
