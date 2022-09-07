const mysql = require('mysql');
const MySQL =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Admin125", 
    database:"StudentCourse"
});
    MySQL.connect((err)=>{
        if(err){
         throw err;
        }
        console.log("mysql connected");
   })

module.exports = MySQL; 