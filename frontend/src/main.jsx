import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/users/home'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AppLayout from './component/AppLayout.jsx'
import Signup from './pages/users/signup'
import Login from './pages/users/login'
import Contact from './pages/users/contact'
import SpecialtyPage from './pages/users/specialty'
import DetailPage from './pages/users/detail'
import Reservation from './pages/users/reservation'
import UserConfirmation from './pages/users/userConfirmation'
import ThankYou from './pages/users/thankYou'


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { lazy } from 'react'
import { Suspense } from 'react'
import ReservationLayout from './component/ReservationLayout'


const queryClient= new QueryClient()

let Doctor =lazy(()=> import('./pages/doctors/doc'))
let Profile =lazy(()=> import('./pages/doctors/profile'))
let Schedule =lazy(()=> import('./pages/doctors/schedule'))
let Patient =lazy(()=> import('./pages/doctors/patient'))
let DoctorLogin =lazy(()=> import('./pages/doctors/doc/doctorLogin'))
// let Logout =lazy(()=> import('./pages/doctors/logout'))
let ConfirmationEmail =lazy(()=> import('./pages/doctors/confirmationEmail'))
let DoctorLayout =lazy(()=> import('./component/DoctorLayout'))
let ProtectedRoute =lazy(()=> import('./component/protectedRoute'))





let router =createBrowserRouter([
{
path:'/',
element:<AppLayout/>,
errorElement:<div className=''>error hello</div>,
children:[
  {
    index :true,
    element:<App/>
  },
  {
    path:'signup',
    element:<Signup/>
  },
  {
    path:'login',
    element:<Login/>
  },
  
  {
    path:'contact',
    element:<Contact/>,
    
  },
  {
    path:':specialty',
    element:<SpecialtyPage/>,
    
  },
  {
    path:':specialty/:doctorName',
    element:<DetailPage/>,
    
  },
  {
    path:'users/confirmation/:token',
    element:<UserConfirmation/>,
    
  },
]
},
{
  path:'reservation',
  element:<ReservationLayout/>,
  children:[
    {
      path:':reservationId',
      element:<Reservation/>,
    },
    {
      path:':bookingId/thankyou',
      element:<ThankYou/>,
      
    },

  ]
  
},

  
   { 
    path:'doctor',
    element:<Doctor/>,
  },
  {
    path:'doctor/doctorLogin',
    element:<DoctorLogin/>,
  },
  {

    path:'doctor',
    element:<DoctorLayout/>,
    children:[
      {
        path:'profile',
        element:<ProtectedRoute><Profile/></ProtectedRoute>   ,
      },
      {
        path:'schedule',
        element:<ProtectedRoute><Schedule/></ProtectedRoute>,
      },
      {
        path:'patient',
        element:<ProtectedRoute><Patient/></ProtectedRoute>
      },
      {
        path:'confirmation/:token',
        element:<ConfirmationEmail/>,
      },
     
    ]
      
  }

])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className=''>Loading .....</div>}>
<RouterProvider router={router}/>
</Suspense>
</QueryClientProvider>
  </React.StrictMode>,
)
