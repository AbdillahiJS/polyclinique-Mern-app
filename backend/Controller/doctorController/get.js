const Register = require('../../Model/register.js')
const jwt =require('jsonwebtoken')

const Schedule =require('../../Model/schedule')

const Booking=require('../../Model/booking')
const Comment=require('../../Model/postsComment')
const User =require('../../Model/userRegister')

const getRegister=async(req,res)=>{
    
    try {
       

   let getRegisterOne=await Register.findOne({_id:req.doctor.doctorLoginId,isConfirmed:true});

        res.send(getRegisterOne)
    } catch (error) {
    
        res.send('Register Server error')
        
    }
    
    }



const getConfirmation=async(req,res)=>{
    
try {
    let {token} =req.params
    
    const decoded = jwt.verify(token, 'mysecret');

await Register.findByIdAndUpdate(decoded.registerId,{isConfirmed:true});

    res.send('confirmation succesful')
} catch (error) {

    res.send('confirmation Server error')
    
}

}


const getLogin =async(req,res)=>{

    try {

       let doctor = await Register.findById(req.doctor.doctorLoginId)
       res.json({"doctorLogedIn":doctor})
        
    } catch (error) {
        res.json(error)
    }


}

const getProfile =async(req,res)=>{

    try {
       let doctorProfile = await Register.findById(req.doctor.doctorLoginId);
       res.send(doctorProfile)
        
    } catch (error) {
        res.send('doctorProfileError')
       
        
    }

}

const getScheduleDoctor=async(req,res)=>{
    try {
        let scheduleList= await Schedule.find({doctorRegisteredId:req.doctor.doctorLoginId})  

        res.send(scheduleList)

    } catch (error) {
        
        res.send('getScheduleError')
    }

}
const getSingleSchedule=async(req,res)=>{
    try {

        let singleSchedule= await Schedule.findById(req.params.id)
        res.send(singleSchedule)

    } catch (error) {
        res.send('get Single Schedule-Error',error)
    }

}
const getSingleScheduleList=async(req,res)=>{
    try {
        
        let singleScheduleList= await Schedule.find({doctorRegisteredId:req.params.id})
        res.send(singleScheduleList)

    } catch (error) {
        res.send(error)
    }

}

const getAllPatient=async(req,res)=>{
    try {
        
        let allBooking= await Booking.find({isBookingDone:true})
        let countBooking= await Booking.find({isBookingDone:true}).count()
         let countComment =await Comment.find({belongedDoctorId:req.doctor.doctorLoginId}).countDocuments()
         let countUser =await User.find().count()
        // console.log(countBooking)
        
        res.json({allBooking,countBooking,countComment,countUser})

    } catch (error) {
        res.json(error)
    }

}
const getconsultationfee=async(req,res)=>{

    try {
       let getFees = await Register.findOne({_id:req.doctor.doctorLoginId}).select('fees')
        res.json(getFees)

    } catch (error) {
        res.json(error)
    }

}





module.exports={getConfirmation,getLogin,getProfile,getScheduleDoctor,getRegister,
                getSingleSchedule,getSingleScheduleList,getAllPatient,getconsultationfee
            }