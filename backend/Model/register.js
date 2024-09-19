let mongoose=require('mongoose')
let {Schema }=mongoose
let Comment =require('./postsComment')

let RegisterSchema = new Schema({
    doctorName:{
        type:String,
        required:true
    },
    doctorSpecialty:{
        type:String,
        required:true
    },
    doctorEmail:{
        type:String,
        required:true
    },
    doctorPassword:{
        type:String,
        required:true
    },
    doctorSexe:{
        type:String,
    },
    doctorDescriptionSpecialized:{
        type:String,   
    },
    doctorLocation:{
        type:String, 
    },
    doctorBirthDay:{
        type:String,  
    },
    fees:{
        type:Number,
        default:''
    },
        
    isConfirmed:{
        type:Boolean,
        default:false,
    },
    isInformationComplet:{
        type:Boolean,
        default:false
    },
    profile:{
        type:String,
        default:''
    },
    totalRating:{
        type:Number,
        default:0
    },
    views:{
        type:Number,
        default:0
    }
   

},{timestamps:true})


module.exports = mongoose.model('Register', RegisterSchema);