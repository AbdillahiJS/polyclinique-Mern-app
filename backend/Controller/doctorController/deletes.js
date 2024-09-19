
const schedule=require('../../Model/schedule')


let deletSchedule =async(req,res)=>{
  
    try {
       let scheduleDelete =await schedule.findOneAndDelete({_id:req.params.id})
       res.send(scheduleDelete)
    } catch (error) {
        console.log('error in delete Schedule ',error)
    }
}





module.exports={deletSchedule}