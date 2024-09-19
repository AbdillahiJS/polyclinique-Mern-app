const jwt=require('jsonwebtoken')


const userAuthToken=(req,res,next)=>{

const token=req.header('Authorization')
// console.log('tokenLogin >',token)
if (!token) return res.status(401).send('Access Denied');

try {

    const verified = jwt.verify(token, 'mysecretlogin');
    
    req.decoded= verified;
    next();

} catch (error) {
   
    res.status(400).send('Invalid Token');
}


}

module.exports=userAuthToken