
const Register =require('../../Model/register.js')
const Schedule = require('../../Model/schedule.js')



const putProfile=async(req,res)=>{
    let {editProfileName,editProfileSex,editProfileSpecialty,editProfileSpecialized,editProfileLocation,
        editProfileDateNaissance } = req.body

try {
    
    let profileUpdate = await Register.findByIdAndUpdate(req.doctor.doctorLoginId,{
        $set:{
            doctorName:editProfileName,
            doctorSexe:editProfileSex,
            doctorSpecialty:editProfileSpecialty,
            doctorDescriptionSpecialized:editProfileSpecialized,
            doctorLocation:editProfileLocation,
            doctorBirthDay:editProfileDateNaissance,
            isInformationComplet:true,   
            profile:req.file.path

        }
    })
    
    res.send(profileUpdate)

} catch (error) {
    res.send(error)
}

}


const editSchedule=async(req,res)=>{
    
    
try {
    
    let putSchedule = await Schedule.findByIdAndUpdate(req.params.id,{
        $set:{
            from:req.body.updateFrom,
            to:req.body.updateTo,
            isAvailable:req.body.updateIsAvailable

        }
    })
    
    res.send(putSchedule)

} catch (error) {
    res.send(error)
}

}





const feesEdit=async(req,res)=>{
    // console.log(req.body)
    
try {
    
    let putfees = await Register.findByIdAndUpdate(req.doctor.doctorLoginId,{
        $set:{
            fees:req.body.fee
        }

    })
  
    res.send(putfees)

} catch (error) {
    res.send(error)
}

}


module.exports={putProfile,editSchedule,feesEdit}