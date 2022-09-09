const express = require('express');
const router=express.Router();
const auth = require('../middleware/verifytoken');
const {userImageUpload} = require('../helper/userImage');
const {studentdetailgetdata,studentdetailpost,studentdetaildeletedata,studentdetailidfind,studentdetailupdatedata} = require("../Controllers/studentdetailControllers");

  
  router.post('/studentpost',userImageUpload.single('image'),auth,studentdetailpost);

  router.get('/studentget',auth,studentdetailgetdata);

  router.delete('/studentdelete/:id',auth,studentdetaildeletedata );
  
  router.get('/studentidfind/:id',auth,studentdetailidfind) ;

  router.put('/studentupdate/:id',auth,studentdetailupdatedata);




module.exports = router