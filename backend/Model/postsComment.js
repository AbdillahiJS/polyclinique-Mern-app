
let mongoose=require('mongoose')
let {Schema }=mongoose
let Register=require('./register')

let PostsSchema = new Schema({
    userName:String,
    comment:[],
    rating:Number,
    timePosted: { type: Date, default: Date.now },
    name:String,
    belongedDoctorId:{ type: Schema.Types.ObjectId, ref:'Register' },
    
},{timestamps:true})




module.exports = mongoose.model('Comment', PostsSchema);