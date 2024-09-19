let mongoose=require('mongoose')
let {Schema }=mongoose


let bookingSchema = new Schema({
    patientName:{
        type:String
    },

    patientMobile:{
        type:String
    },
    
    patientEmail:{
        type:String
    },

    bookingDate:{
        type:String
    },

    bookedDoctor:{
        type:String
    },

    clinicBooked:{
        type:String
    },
    bookingFees:{
        type:String
    },
    isBookingDone:{
        type:Boolean,
        default:false
    }
    
    
},{timestamps:true})




module.exports = mongoose.model('Booking',bookingSchema);