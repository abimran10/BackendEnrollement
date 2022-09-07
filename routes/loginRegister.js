const express = require('express');
const router=express.Router();
const {loginpost,registerpost} = require('../Controllers/userloginControllers');
const { db } = require('../model/loginregistermodel');
// const auth = require('../middleware/Auth');
router.post('/userLogin',loginpost);
router.post('/userRegister',registerpost);


module.exports = router