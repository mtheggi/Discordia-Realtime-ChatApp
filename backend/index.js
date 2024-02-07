const express = require('express');
const app = express(); // create express app 
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000; // to set the environment port or 3000

// connect to datbase 
mongoose.connect(process.env.ATLAS_CONNECTION_STRING).then(() => { console.log('database connected') }).catch((err) => { console.log("MongoDB connection failed"); console.log(err) });
// importing Routes 
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');


// middlewares 
// app.use(express.static('public'));
app.use(cors()) // enable cors to comminicate with frontend 
app.use(express.json()); // parse json bodies 


// app.get (path , call_back_function(request  , response ) ); 
//--------------------------- Routes---------------------------// 
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get('/', (req, res) => {
    res.send('Hello World')


})
app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`)
})