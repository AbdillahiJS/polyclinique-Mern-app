let mongoose=require('mongoose')
let {Schema }=mongoose




let UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    birthday:{
        type:String,
    },
    password:{
        type:String,   
    },
    isUserConfirmed:{
        type:Boolean,
        default:false
    }
   

},{timestamps:true})



module.exports = mongoose.model('User',UserSchema);