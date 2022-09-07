const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require('./middleware/verifytoken');
require('dotenv').config();
console.log(process.env.TOKEN_SECRET);
// const dotenv = require('dotenv');
// dotenv.config(); 
// const db = require('./Database/db')
const MySQL = require('./Database/db');

// const connectToMongo = require("./Database/db");
// connectToMongo();
// const multer = require("multer");
// const path = require("path");
const app = express()
const port = 3000
var fs = require('fs');
// const authRoute = require('./routes/auth');
// const authRoute = require('./routes/auth.js');
const loginregister = require('./routes/loginRegister');
const studentinformation = require('./routes/sudent');
const courseinformation = require('./routes/course');
const { join } = require('path');
const { param } = require('./routes/loginRegister');
// //middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)


app.use('/', loginregister);
app.use('/', studentinformation);
app.use('/', courseinformation);


app.get('/login_form', (req, res) => {

});

// app.get('/createdb',(req,res)=>{
//   let sql = "CREATE DATABASE StudentCourse3"
//   MySQL.query(sql, (err)=>{
//     if(err){
//     throw err;}
//     console.log("DB Created");
//     res.send("database Created");
//   });
// });


// app.get('/createStudent',(req,res)=>{
//   let sql = 'CREATE TABLE student(id int AUTO_INCREMENT, name VARCHAR(255),age DOUBLE, mobile_number DOUBLE, address VARCHAR(255), semester VARCHAR(255), PRIMARY KEY(id))'
//   MySQL.query(sql,(err)=>{
//     if(err){
//     throw err;}
//     console.log("DB Created");
//     res.send("database Created");
//   });

// }); 
// app.get('/createcourse',(req,res)=>{
//   let sql = 'CREATE TABLE student(id int AUTO_INCREMENT, name VARCHAR(255),age DOUBLE, mobile_number DOUBLE, address VARCHAR(255), semester VARCHAR(255), PRIMARY KEY(id))'
//   MySQL.query(sql,(err)=>{
//     if(err){
//     throw err;}
//     console.log("DB Created");
//     res.send("database Created");
//   });

// }); 
app.post('/StudentCourseEnrollment',auth,async (req, res) => {
  console.log("StudentCourseEnrollment ");
  let data = req.body;
  for (var i = 0; i < data.course_id.length; i++) {
    // console.log(i);
    // console.log(data.course_id.length-1);
    const a = {
      student_id: data.student_id,
      course_id: data.course_id[i]
    }

    await MySQL.query("INSERT INTO student_course SET ?", a, (err) => {
      if (err) {
        throw err;
      }
    })
    if (i == data.course_id.length - 1) {
      res.send("Add StudentCourseEnrollment post successfully")
    }
  }


});



app.get('/GetStudentCourse/:id',auth,(req, res) => {
  var sql = `SELECT student.id as student_Id , 
    student.name as student_name,course.id  as course_id  ,course.coursename 
FROM student 
INNER JOIN student_course ON student.id=student_course.student_id
  INNER JOIN course ON course.id=student_course.course_id 
  
  WHERE student.id=${req.params.id} ` ;
  MySQL.query(sql, function (err, result) {
    if (err) { throw err };
    if(result.length==0){
      res.send("Student haven't Enrolled")
    }
    else{
      res.send(result);
    }
  });
});


//var sql = "SELECT student.id as student_id, course.id as course_id FROM student JOIN course";
// MySQL.query(sql, function (err, result) {
//   if (err){ throw err};
//   console.log(result);
// console.log(JSON.parse(result)); 
// let sql1= "INSERT INTO student_course SET ?"
// MySQL.query(sql1,[result],(err)=>{
//   if(err){
//   throw err;}
//   console.log("Add studentcourse");
// })









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})