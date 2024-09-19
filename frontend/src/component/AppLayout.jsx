import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const AppLayout = () => {
  return (
    <>
    <div className="flex flex-col">
    <Header/>
    <Outlet/>
{/* <Footer/> */}
    </div>
    </>
     
  )
}

export default AppLayout