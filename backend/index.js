const express = require('express'); 
const app = express(); // create express app 
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000; // to set the environment port or 3000

// connect to datbase 
mongoose.connect(process.env.ATLAS_CONNECTION_STRING).then(()=>{ console.log('database connected')}).catch((err)=>{ console.log("MongoDB connection failed" );console.log(err)});






// middlewares 
app.use(express.json()); // parse json bodies 
app.use(cors()) // enable cors to comminicate with frontend 

// Routes endpoints
app.get('/',(req,res)=>{
    res.send('Hello World')
})




app.listen(port,(req, res)=>{
    console.log(`server is running on port ${port}`)
})