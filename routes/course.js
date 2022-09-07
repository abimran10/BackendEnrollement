const express = require('express');
const router=express.Router();
const auth = require('../middleware/verifytoken');
const {coursedetailpost,coursedetailgetdata,coursedetaildeletedata,coursedetailupdatedata}= require("../Controllers/coursedetailControllers")

  router.post('/coursepost',auth,coursedetailpost);

  router.get('/courseget',auth,coursedetailgetdata);

  router.delete('/coursedelete/:id',auth,coursedetaildeletedata );

  router.put('/courseupdate/:id',auth, coursedetailupdatedata);




module.exports = router