const userModel = require('../Models/userModel'); 
const bcrypt = require("bcrypt"); 
const validator = require("validator"); 
const jwt = require("jsonwebtoken"); 

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 



const createToken= (_id)=> {
    return jwt.sign({_id } ,JWT_SECRET_KEY, {expiresIn : '2h'}); 
}

const registerUser = async (req, res ) =>{
    console.log("Post /register ")
    try {
        
        const {name, email ,password} = req.body; 
        let user = await userModel.findOne({"email":email}); 
        
        if(user) return res.status(400).json("User already signed in with this email before, Please change the email !"); 
        if(!email || !name  || !password) return res.status(400).json("email , name ,and passowrd are all required...") ;
        // if email is valud 
        if(!validator.isEmail(email)) return res.status(400).json("email is not valid "); 
        // if password is strong ? 
        if(!validator.isStrongPassword(password)) return res.status(400).json("passowrd is Weak...., write strong password "); 
        
        user = new userModel({name , email , password }); 
        
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password,salt); 
        
        await user.save(); 
        
        const token =  createToken(user._id); 
        
        res.status(200).json({_id: user._id , name : user.name, email : user.email , token: token} );
    }catch(err){
        console.log(err) ; 
        res.status(500).json(err);
    } 
}

module.exports = {registerUser} ; 
