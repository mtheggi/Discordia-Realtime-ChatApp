const express  = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../Controllers/userController'); 

// Router.post(path , callback() {controllers }) 

router.post('/register', registerUser); 
router.post('/login', loginUser)


module.exports = router; 
