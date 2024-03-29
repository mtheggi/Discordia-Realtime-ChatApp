const userModel = require('../Models/userModel'); 
const bcrypt = require("bcrypt"); 
const validator = require("validator"); 
const jwt = require("jsonwebtoken"); 
const { restart } = require('nodemon');

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

const loginUser = async (req ,res) => {
    console.log("Post , /login")
    
    
    try {
        const {email , password} = req.body; 
        let user = await userModel.findOne({"email":email}); 
        console.log(user);

        if(!user) return res.status(400).json("invalid email or password .... "); 

        const isValidPassword =  await bcrypt.compare(password , user.password); 
        
        if(!isValidPassword) return res.status(400).json("Incorrect password"); 

        const token = createToken(user._id); 

        res.status(200).json({_id:user._id , name : user.name , email : user.email , token : token }); 
    }catch(err) {
        console.log(err); 
        res.status(500).json(err); 
    }
}

const findUser = async (req, res )=> { 

    const userId = req.params.userId; 
    try {
        let user = await userModel.findById(userId); 


        res.status(200).json(user); 

    }catch(err) {
        console.log(err); 
        res.status(500).json(err); 
    }


}


const getUsers = async (req, res )=> { 

    try {
        let users = await userModel.find(); 


        res.status(200).json(users); 

    }catch(err) {
        console.log(err); 
        res.status(500).json(err); 
    }


}

module.exports = {registerUser,loginUser, findUser,getUsers} ; 
