const express  = require('express');
const router = express.Router();
const {registerUser} = require('../Controllers/userController'); 

// Router.post(path , callback() {controllers }) 

router.post('/register', registerUser); 


module.exports = router; 
