const jwt =require('jsonwebtoken');

module.exports = async function(req,res,next){
     const token = req.header('Authorization');
     if(!token) return res.status(401).send('access Denied');
     try{
        const bearer = token.split(' ');
        const bearertoken = bearer[1];         
        const verified = jwt.verify(bearertoken, process.env.TOKEN_SECRET)
        console.log("tokenverify",verified._id);
        // req.user = verified._id;
        // req.users= await User.findById(verified._id).select
        // ('-password')
        // console.log(req.users);
        next();
     }catch(err){
           res.status(400).send('Invalid Token'); 
     }
}