require('dotenv').config();
let express =require('express')
let app =express()
let mongoose =require('mongoose')
let cors =require('cors')
let path=require('path')



app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors({ origin: '*' }))


app.use('/doctor',require('./View/doctors/index.js'))
app.use('/users',require('./View/users/index.js'))

if(process.env.NODE_ENV ==="production"){
app.use(express.static(path.join(__dirname,'../frontend/dist')))
app.get('*',(req,res)=>{
  
  res.sendFile(path.resolve("frontend","dist","index.html"))
})

}




    mongoose.connect(process.env.URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));




 



    app.listen(process.env.PORT || 9800,()=>'listening server in port 8000')



