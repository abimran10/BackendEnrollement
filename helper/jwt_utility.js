const jwt= require('jsonwebtoken');
const generatetoken =async (userid)=>{
    console.log("Token_Id",userid);
    try{
        //   console.log(userid._id);
          const token = await jwt.sign({_id:userid.toString()},process.env.TOKEN_SECRET,{
// expires in 24 hours
}); 
          console.log("checkToken:",token);  
        //   UserRegister.tokens = UserRegister.tokens.concat({token});
              return token;
          }catch(err){  
                 console.log("err",err);
          } 
}  

module.exports = generatetoken; 
