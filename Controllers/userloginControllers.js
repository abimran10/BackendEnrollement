const loginregister = require('../model/loginregistermodel')
var md5 = require('md5');
const generatetoken = require('../helper/jwt_utility');
const concat = require('concat');
const MySQL = require('../Database/db');


// const LOGOUT = async (req, res) => {
//     try{
//      console.log(req.user);
     
//      req.user.tokens = req.user.tokens.filter((Currenttoken)=>{
//             return  Currenttoken.token !== req.token;
//      })
//     //  req.user.tokens = [];
  
//      res.clearCookie("jwt");
//      console.log("logout");
//      await req.user.save();
//      res.render('userlogin');
//     }catch(err){
//       res.status(500).send(err);
//     }
//   }

const registerpost = async (req,res) => {
    console.log("RegisterPost");
    // const validation =joi.validate(req.body, schema)
    // res.send(validation);
    console.log(req.body.email);
    const sql1 = "SELECT * FROM register WHERE email ='"+req.body.email+"'";
    console.log("sql1,",sql1);
    MySQL.query(sql1,(err,emailExist)=>{
      if(err){
      throw err;}
      if(emailExist && emailExist.length>0){
        console.log(emailExist);
        res.status(200).send('email already exist');
      }   
      else{
        const user = {
          first_name:req.body.first_name,
          last_name:req.body.last_name,
          email:req.body.email,
          password:req.body.password
      }
      console.log("registerdetail",user);
      let sql = 'INSERT INTO register SET ?'
      MySQL.query(sql,user,(err)=>{
           if(err){
           throw err;}
           console.log("Add Register");
           res.status(200).send("Add Register");
         })
      
      }
    })
    // console.log(emailExist);
    // if(emailExist){
    //      console.log("exit");
    //     return res.status(400).send('email already exit')
    // } 
    // // Hash the password
    // const salt = await bcrypt.gentSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt)
 
   
  }
  
const  loginpost = async (req,res) => {
    // let validate before we a user
    console.log("userPostlogin");
    // const validation =joi.validate(req.body, schema)
    // res.send(validation);
    const sql =" SELECT * FROM register WHERE email ='"+req.body.email+"' AND password ='"+req.body.password+"'";
    await MySQL.query(sql,(err,login)=>{
      if(err){
      throw err;}
      if(login.length==0){
        res.status(200).send("email and password is wrong");
      }   
      else{
        
         console.log("login id check",login);
         console.log(process.env.TOKEN_SECRET);
         async function start() {
         
         const token = await generatetoken(login[0].register_id);
         console.log("return",token);
           
         res.status(201).json({
          message:"login Successfully",
          _id: login[0].register_id,
          name: login[0].first_name,
          email: login[0].email,
          auth_token: token
        })
        //  res.header('auth-token',token).send("login successfully")  
         }
         start();
      }})
    // const login = await loginregister.findOne({email:req.body.email,password:req.body.password});
    // console.log(login);

    
    // if(!login){
    //      console.log("Not Found User");
    //     return res.status(400).send('email or password is wrong');
    // }
    // else{
    // console.log(login._id);
    // console.log(process.env.TOKEN_SECRET);
    // const token = await generatetoken(login._id);
    // console.log("return",token);
    // res.header('auth-token',token).send(token)  
    // login.tokens = login.tokens.concat({token});
    // login.save();  
    }

  // }
    



module.exports = {registerpost,loginpost}; 