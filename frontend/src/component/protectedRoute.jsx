
import { Navigate } from "react-router-dom"
import { getLocalStorage } from "@/util/localStorage"





const ProtectedRoute = ({children}) => {

     if (!!getLocalStorage('token')) {
         return children
        }

       return  <Navigate to='/doctor/doctorLogin'/>

}

export default ProtectedRoute