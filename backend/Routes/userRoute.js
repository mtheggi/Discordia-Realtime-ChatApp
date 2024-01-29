const express  = require('express');
const router = express.Router();
const {registerUser, loginUser,findUser,getUsers} = require('../Controllers/userController'); 

// Router.post(path , callback() {controllers }) 

router.post('/register', registerUser);  // register 
router.post('/login', loginUser) // login 
router.get('/find/:userId' , findUser) // find user by ID 
router.get('/' , getUsers)  // get all users 

module.exports = router; 
