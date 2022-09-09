const MySQL = require('../Database/db');
const  db  = require('../Database/db');
// db.connect((err)=>{
//   if(err){
//    throw err;
//   }
//   console.log("mysql connected");

// })
const student = require('../model/studentmodel');

const studentdetailgetdata = async (req, res) => {
  console.log("helllooo1");
  //res.send("data..............");
      MySQL.query("SELECT * FROM student",function(err, result){
        if(err) {
          console.log("error: ", err);
        }
        else{
          res.send(result);
          console.log('employees : ', result);
        }
      })
      
  }


const studentdetailpost = async (req,res) => {
  console.log("heloo");
    console.log("filename 222222",req.file);
    try{
    let studentdetail = {
      name: req.body.name,
      age: req.body.age,
      mobile_number: req.body.mobile_number,
      address: req.body.address,
      semester: req.body.semester,
      student_image: req.file.filename  

    };
    console.log("studentdetail",studentdetail);
     let sql = 'INSERT INTO student SET ?'
     MySQL.query(sql,studentdetail,(err)=>{
          if(err){
          throw err;}
          console.log("Add User");
          res.send("Add Student successfully");
        })
    }
    catch(err){
      console.log("error",err)
    }
  }

  const studentdetaildeletedata = function (req, res) {
    id = req.params.id;
    console.log("delete",id);
    const sql="DELETE FROM student_course WHERE student_course.student_id = ? ";
    MySQL.query(sql,id,function (err) {
      if(err) {
        console.log("error: ", err);
      }
      else{
        const sql1="DELETE FROM student WHERE student.id = ? ";
        MySQL.query(sql1,id,function (err) {
          if(err) {
            console.log("error: ", err);
          }
          else{
             res.send("successfully deleted")
          }
        });

      }
    });
  }
  const studentdetailidfind = async function(req, res){
    const id = req.params.id;
      console.log("student id find",id);
      const sql = "SELECT * FROM student WHERE id = ?";
      MySQL.query(sql,[id],function (err, result) {
        if (err) throw err;
        console.log("update id get");
        res.send(result);
      });
  }

  const studentdetailupdatedata=  async function(req, res) {
    console.log("My ID IS",req.params.id)
     const mybodydata={
        name: req.body.name,
        age: req.body.age,
        mobile_number: req.body.mobile_number,
        address: req.body.address,
        semester: req.body.semester
     }
     console.log(mybodydata.name);
     MySQL.query("UPDATE student SET name=?,age=?,mobile_number=?,address=?,semester=? WHERE id=? ",[mybodydata.name,mybodydata.age,mybodydata.mobile_number,mybodydata.address,mybodydata.semester,req.params.id],function(err, result) {
      if(err) {
        console.log("error: ", err);
        // result(null, err);
      }else{

          MySQL.query("SELECT * FROM student WHERE id = ?",[req.params.id], function (err, result1) {
            if (err) throw err;
            res.send("successfully update");
          });
        // console.log(result);
        // res.send(result);

      }
    });
 }

module.exports = {studentdetailgetdata,studentdetailpost,studentdetaildeletedata,studentdetailidfind,studentdetailupdatedata}; 