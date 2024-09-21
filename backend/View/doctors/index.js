let express =require('express')
let doctor =express.Router()
let {registerPost,loginPost,schedulePost} =require('../../Controller/doctorController/posts')
let {getConfirmation,getLogin,getProfile,
    getScheduleDoctor,getRegister,getSingleSchedule,getSingleScheduleList,getAllPatient,getconsultationfee
} = require('../../Controller/doctorController/get')
const authToken = require('../../authToken')
const {putProfile,editSchedule,feesEdit} =require('../../Controller/doctorController/puts')
const {deletSchedule} =require('../../Controller/doctorController/deletes')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
  cloud_name: 'dhokshdip', 
  api_key: '438371693249867', 
  api_secret: 'Gl8vCCm22Jb68oOPvCgti1VkHTw' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ProfileTof',
    format: async (req, file) => 'png',
    public_id: (req, file) =>`${Date.now() + '-' + file.originalname}`,
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
    resource_type: "auto"
  }

});

const upload = multer({ storage: storage });

doctor.post('/register',registerPost)
doctor.post('/login',loginPost)
doctor.post('/schedule',authToken,schedulePost)
doctor.get('/confirmation/:token',getConfirmation)
doctor.get('/login',authToken,getLogin)
doctor.get('/profile',authToken,getProfile)
doctor.get('/register',authToken,getRegister)
doctor.get('/schedule',authToken,getScheduleDoctor)
doctor.get('/allPatient',authToken,getAllPatient)
doctor.get('/singleScheduleList/:id',getSingleScheduleList)
doctor.put('/profile',authToken,upload.single('profileImg'),putProfile)
doctor.put('/editSchedule/:id',authToken,editSchedule)
doctor.put('/register/fee',authToken,feesEdit)
doctor.delete('/schedule/:id',authToken,deletSchedule)
doctor.get('/schedule/:id',authToken,getSingleSchedule)
doctor.get('/fees',authToken,getconsultationfee)

module.exports=doctor