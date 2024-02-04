const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        members: Array, // array of 2 --> parameters are _id 
    }
    ,
    {
        timestamps: true,
    })

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel; 