const jwt=require('jsonwebtoken')


const authToken=(req,res,next)=>{

const token=req.header('Authorization')
// console.log('tokenLogin >',token)
if (!token) return res.status(401).send('Access Denied');

try {

    const verified = jwt.verify(token, 'mysecretlogin');
    
    req.doctor = verified;
    next();

} catch (error) {
   
    res.status(400).send('Invalid Token');
}


}

module.exports=authToken