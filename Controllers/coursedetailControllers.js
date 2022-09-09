const MySQL = require('../Database/db');
const course = require('../model/coursemodel');

const coursedetailgetdata = async (req, res) => {
  console.log("helllooo2");
  //res.send("data..............");
  MySQL.query("SELECT * FROM course",function(err, result){
    if(err) {
      console.log("error: ", err);
    }
    else{
      res.send(result);
      console.log('employees : ', result);
    }
  })
    
  }


const coursedetailpost = async (req,res) => {
    console.log("coursepost")
    try{
    let coursedetail ={
      semester: req.body.semester,
      program_of_study: req.body.program_of_study,
      department: req.body.department,
      coursename: req.body.coursename,
      academicyear: req.body.academicyear
                  
    };
    console.log("coursedetail",coursedetail);
    let sql = 'INSERT INTO course SET ?'
    MySQL.query(sql,coursedetail,(err)=>{
         if(err){
         throw err;}
         console.log("Add Course");
         res.send("Add Course successfully");
       })
   
    }
    catch(err){
      console.log("error",err)
    }
  }




  const coursedetaildeletedata = function (req, res) {
    id = req.params.id;
    console.log("delete",id);
    const sql="DELETE FROM student_course WHERE student_course.course_id = ? ";
    MySQL.query(sql,id,function (err) {
      if(err) {
        console.log("error: ", err);
      }
      else{
        const sql1="DELETE FROM course WHERE course.id = ? ";
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



  const coursedetailidfind= async function(req, res){
    const id = req.params.id;
      console.log("course id find",id);
      const sql = "SELECT * FROM course WHERE id = ?";
      MySQL.query(sql,[id],function (err, result) {
        if (err) throw err;
        console.log("update id get");
        res.send(result);
      });
  }


  const coursedetailupdatedata=  async function(req, res) {
    console.log("My ID IS",req.params.id)
     const mybodydata={
        semester: req.body.semester,
        program_of_study: req.body.program_of_study,
        department: req.body.department,
        coursename: req.body.coursename,
        academicyear: req.body.academicyear
     }
     console.log(mybodydata)
     MySQL.query("UPDATE course SET semester=?,program_of_study=?,department=?,coursename=?,academicyear=? WHERE id=? ",[mybodydata.semester,mybodydata.program_of_study,mybodydata.department,mybodydata.coursename,mybodydata.academicyear,req.params.id],function(err, result) {
      if(err) {
        console.log("error: ", err);
        // result(null, err);
      }else{

          MySQL.query("SELECT * FROM course WHERE id = ?",[req.params.id], function (err, result1) {
            if (err) throw err;
            res.send("successfully update");
          });
        // console.log(result);
        // res.send(result);

      }
    });
 }

module.exports = {coursedetailpost,coursedetailgetdata,coursedetaildeletedata,coursedetailidfind,coursedetailupdatedata}; 