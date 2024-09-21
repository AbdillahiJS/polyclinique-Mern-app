const Register =require('../../Model/register')
const Schedule =require('../../Model/schedule')
const User =require('../../Model/userRegister')
const Comment=require('../../Model/postsComment')
const Booking =require('../../Model/booking')
const jwt =require('jsonwebtoken')

const getSpecialtyList=async(req,res)=>{
    try {

         let specialtyList= await Register.find({doctorSpecialty:req.params.specialty})
    
        res.send(specialtyList)

    } catch (error) {
        res.send('get-specialty-Error')
    }

}

const getScheduleUsers=async(req,res)=>{
    try {
        let scheduleListUsers= await Schedule.find()  

        res.send(scheduleListUsers)

    } catch (error) {
        
        res.send('getScheduleErrorUsers')
    }

}
const getDetail=async(req,res)=>{
    
    try {
        
        let detailOne= await Register.findOne({doctorName:req.params.doctorName})
      
        let findAllCommentforDoctor = await Comment.find({belongedDoctorId:detailOne._id })
        
        await Register.findOneAndUpdate({doctorName:req.params.doctorName},
            {
                $inc: { views: 1 } 
            }
            )
  
        res.json({detailOne,findAllCommentforDoctor})

    } catch (error) {
        res.json(error)
    }

}

const getUserConfirmation=async(req,res)=>{
    
    try {
        let {token} =req.params
        const decoded = jwt.verify(token, 'mysecret');
    await User.findByIdAndUpdate(decoded.userId,{isUserConfirmed:true});
    res.send('User confirmation succesfully')

    } catch (error) {
    
        res.send('confirmation Server error')
        
        
    }
    
    }


const getUserLogin=async(req,res)=>{
    try {
          let userOne = await User.findById(req.decoded.userId)
          res.send(userOne)
    } catch (error) {
        res.send('Login User Server error',error) 
    }
    
}

const getReservertion=async(req,res)=>{
       
    try {
       let getAppointmentTime = await Schedule.findById(req.params.reservationId)
       let findDoctor=await Register.findOne({_id:getAppointmentTime.doctorRegisteredId}).select('doctorName profile doctorDescriptionSpecialized doctorLocation');
       res.json({findDoctor,getAppointmentTime})
    } catch (error) {
        res.json({'Reservation error ':error})
    }
}

const getBookingDetail=async(req,res)=>{
    
    
    try {
             let findBooked = await Booking.findById(req.params.bookingId)
             res.json(findBooked)
             
    } catch (error) {
        res.json(error)
    }
}
    


module.exports={getSpecialtyList,getScheduleUsers,getDetail,getUserConfirmation,getUserLogin,getReservertion,getBookingDetail}