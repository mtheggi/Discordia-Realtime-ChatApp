const express = require("express"); 
const Router = express.Router(); 
const {findChat , findUserChats ,creatChat}  =require("../Controllers/chatController");

Router.get("/find/:firstId/:secondId" , findChat);  
Router.get("/find/:id" , findUserChats) ;
Router.post("/create" , creatChat);

module.exports = Router; 
