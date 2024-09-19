const Joi = require('joi');
const nodemailer =require('nodemailer');
const jwt =require('jsonwebtoken')
const {emailTemplate} = require('../../utile.js')

const Register =require('../../Model/register.js')
const Schedule =require('../../Model/schedule')
const moment =require('moment')
const DayCounter =require('../../Model/schedule')


const registerSchema =Joi.object({
    doctorName:Joi.string().min(3).trim().required(),
    doctorSpecialty:Joi.string().required(),
    doctorEmail:Joi.string().email().required(),
    doctorPassword:Joi.string().min(6).required(),
});
const loginSchema =Joi.object({
    doctorLoginEmail:Joi.string().email().required(),
    doctorLoginPassword:Joi.string().min(6).required(),
});

const options = {
    abortEarly: false, // Include all errors
    allowUnknown: true, // Allow unknown keys that are not defined in the schema
    stripUnknown: true // Remove unknown keys from the validated data
};


const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email service
    auth: {
      user: 'bs141.19109906.1@gmail.com',
      pass:'glbd rkic amzw csut',
    },
  });


  const sendConfirmationEmail = async (email, token) => {
    try{
        const url = `http://localhost:5173/doctor/confirmation/${token}`;
        await transporter.sendMail({
          from:'Polyclinique', 
          to: email,
          subject: 'Confirm Email',
          html: emailTemplate(url),
        });
      


    }catch(err){
console.log('SendEmailError >',err);
    }

  };

const registerPost=async(req,res)=>{

try {

    let value = await registerSchema.validateAsync(req.body)
    let {doctorEmail} = value
    let Registration = new Register(value)
    await Registration.save()
    
    let user = await Register.findOne({doctorEmail})
    
    const token = jwt.sign({ registerId:user._id }, process.env.SECRETKEY);
   
    await sendConfirmationEmail(doctorEmail, token);
  
    res.send('Registration successful, please check your email to confirm');

} catch (err) {

    err.details?.forEach(element => {
        res.send(element.message)
    });

}

}

const loginPost=async(req,res)=>{
  try {
    let doctorConfirmed = await Register.findOne({doctorEmail:req.body.doctorLoginEmail})
    console.log('doctorConfirmed.isConfirmed',doctorConfirmed)

    if(!doctorConfirmed.isConfirmed) return res.json({msg:'Confirmed your email Adress' , Logintoken:''})
 
      let value = await loginSchema.validateAsync(req.body)
      let {doctorLoginEmail,doctorLoginPassword}=value
     
      let doctor = await Register.findOne({doctorEmail:doctorLoginEmail,doctorPassword:doctorLoginPassword})
      
      if(!doctor) return res.status(400).send(`User Not Found`)
    
      const Logintoken = jwt.sign({ doctorLoginId:doctor._id }, 'mysecretlogin');
  
      res.status(200).json({doctor,Logintoken})
      
    


    

  } catch (error) {
    res.send(error)
  }

}




const schedulePost=async(req,res)=>{

  try {
    
    let scheduleCreate =await Schedule({
      from:req.body.from,
      to:req.body.to,
      isAvailable:req.body.isAvailable,
      doctorRegisteredId:req.doctor.doctorLoginId,
      date:req.body.select
    })
    

    await scheduleCreate.save()

    res.send(scheduleCreate)

   
  } catch (error) {

   console.log(error);
    res.send(error)
  }

}


module.exports={registerPost,loginPost,schedulePost}
