let mongoose=require('mongoose')
let {Schema }=mongoose
const Register =require('../Model/register.js')



let counterSchema= new Schema({
    doctorId:{
        type:Schema.Types.ObjectId,
        ref:Register
    },
count:{
    type:Number,
    default:0
   }
})


module.exports = mongoose.model('DayCounter', counterSchema);