require('dotenv').config();
const jwt =require('jsonwebtoken')
const User =require('../../Model/userRegister')
const nodemailer =require('nodemailer')
const {emailTemplate,appointmentEmailTemplate} = require('../../utile.js')

const Comment=require('../../Model/postsComment')
const Register =require('../../Model/register')
const Booking =require('../../Model/booking')

const transporter = nodemailer.createTransport({
   service: 'Gmail', // or another email service
   auth: {
     user: 'bs141.19109906.1@gmail.com',
     pass:'glbd rkic amzw csut',
   },
 });


 const sendConfirmationEmail = async (email, token) => {
   try{
       const url = `http://localhost:5173/users/confirmation/${token}`;
       await transporter.sendMail({
         from:'Polyclinique ', 
         to: email,
         subject: 'Confirm Email',
         html: emailTemplate(url),
       });

   }catch(err){
console.log('SendEmailError >',err);
   }

 };



const userRegisterPost=async(req,res)=>{

    try {
    
        let userRegistration = new User(req.body);

           await userRegistration.save()
        
         const {email} =userRegistration
        let user = await User.findOne({email})
        if(!user.email) return res.send('User is already Registered')
        const token = jwt.sign({ userId:user._id }, process.env.SECRETKEY);
       
        await sendConfirmationEmail(email, token);
      
        res.send('succesfully Registered Check your email to confirme it ');
    
    } catch (err) {
    
       res.send(err)
    
    }
    
    }

    const userloginPost=async(req,res)=>{
      try {
    
        let userOne = await User.findOne({email:req.body.email})

        if(!userOne.isUserConfirmed) return res.status(200).json({userMsg:'Confirm your email adresse',userToken:''})
        
        let user = await User.findOne({email:req.body.email})
        if(!user.email) return res.status(400).json({userMsg:`User Not Found`})
        const userToken = jwt.sign({ userId:user._id },'mysecretlogin');
    
        res.status(200).json({user,userToken})
        
    
      } catch (error) {
        res.send(error)
      }
    
    }

    const commentPost=async(req,res)=>{
     
      try {
          
        let userNameEdit = await Comment.findOne({userName:req.body.userName,name:req.body.name})

        if(userNameEdit?.userName){

          await Comment.findOneAndUpdate({userName:userNameEdit?.userName,name:userNameEdit?.name},
            {
              $push:{comment:req.body.commentInput}
            }
              
            )
            res.status(200).send('you added new comment successfully')

          

        }else{
          
                  let postComment =new Comment({
                    userName:req.body.userName,
                    comment:req.body.commentInput,
                    rating:req.body.rating,
                    timePosted:req.body.time,
                    name:req.body.name,
                    belongedDoctorId:req.body.doctorId
                  });
                  postComment.save() 

                 let findDoctor = await Register.findOne({_id:postComment.belongedDoctorId})
                 
                  const CountUsersComments =  await Comment.find({belongedDoctorId:findDoctor._id})
                  
                  
                let count =  CountUsersComments.reduce((acc,curr)=>{
                      
                     return acc+parseInt(curr.rating)
                  },0)
                 
                  
                  await Register.findOneAndUpdate({_id:postComment.belongedDoctorId},{
                    $set:{
                        totalRating:Math.ceil(count/parseInt(CountUsersComments.length))
                    }
                })
          
                  
                  res.status(200).send('you posted your comment successfully')
             

        }
     

      } catch (error) {
        
        res.status(400).send('commentServer error')
      }
    }


    const bookingPost=async(req,res)=>{
      try {
    
        

         let bookingPost =new Booking({
             patientName:req.body.nameInfo,
             patientMobile:req.body.numberInfo,
             patientEmail:req.body.emailInfo,
             bookingDate:req.body.bookingDate,
             bookedDoctor:req.body.bookingDoctor,
             clinicBooked:req.body.clinic
         });
           bookingPost.save()

           res.send(bookingPost)

      } catch (error) {

        res.send(error)

      }
    
    }

    const appointmentPost=async(req,res)=>{
      try {
    
         

           await transporter.sendMail({
            from:'Polyclinique <bs141.19109906.1@gmail.com>',  
            to: 'moussaabdillahi542@gmail.com',
            subject: 'Appointment',
            html: appointmentEmailTemplate(req.body),
          });
            
         await Booking.findByIdAndUpdate(req.params.appointmentId,{
          $set:{
            isBookingDone:true
          }
         })
          
       
           res.send('Notification email was sent to the Doctor')

      } catch (error) {

        res.send(error)

      }
    
    }




    module.exports ={userRegisterPost,userloginPost,commentPost,bookingPost,appointmentPost}
