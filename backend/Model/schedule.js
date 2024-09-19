let mongoose=require('mongoose')
let {Schema }=mongoose
const Register =require('../Model/register.js')

let scheduleSchema = new Schema({
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
    },
    date:{
        type:String,
        // default:new Date()
    },
    doctorRegisteredId:{
        type:Schema.Types.ObjectId,
        ref:Register
    },
day:{
        type:Number,
        default:0
    }
   
   

},{timestamps:true})





module.exports = mongoose.model('Schedule', scheduleSchema);
