let express =require('express')
let users =express.Router()

let {getSpecialtyList,getScheduleUsers,getDetail,getUserConfirmation
    ,getUserLogin,getReservertion,getBookingDetail
}=require('../../Controller/usersController/get.js')
let {userRegisterPost,userloginPost,commentPost,bookingPost,appointmentPost}=require('../../Controller/usersController/posts.js')
let userAuthToken=require('../../userAuth')


users.get('/scheduleUser',getScheduleUsers)
users.get('/detail/:doctorName',getDetail)
users.get('/userLogin',userAuthToken,getUserLogin)
users.get('/confirmation/:token',getUserConfirmation)
users.get('/specialty/:specialty',getSpecialtyList)
users.get('/reservation/:reservationId',getReservertion)
users.get('/reservation/:bookingId/thankyou',getBookingDetail)
// users.get('/ratingforDoctor/:ratingId',countRatingForDoctor)
users.post('/registerUser',userRegisterPost)
users.post('/userLogin',userloginPost)
users.post('/comment',userAuthToken,commentPost)
users.post('/booking',bookingPost)
users.post('/appointmentEmail/:appointmentId',appointmentPost)














module.exports=users