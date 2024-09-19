import Hero from "./heroSection"

import { useEffect } from "react";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Footer from "@/component/Footer";

function App() {
 

  return (
    <> 
    <div className="flex flex-col">
    <Hero/>
    
    <Footer/>
    </div>

    </>

  )
}

export default App
