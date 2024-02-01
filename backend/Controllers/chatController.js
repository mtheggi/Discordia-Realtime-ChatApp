const chatModel = require("../Models/chatModel");

// createchat ; 
// findChat ;  
// getUserchats ; 

const creatChat = async (req, res) => { // post 
    // console.log("post , /create") ; 
    // console.log("body " , req.body); 

    const { firstId, secondId } = req.body;
    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        if (chat) return res.status(200).json(chat);
        const chat2 = new chatModel({
            members: [firstId, secondId]

        });

        const savedChat = await chat2.save();

        res.status(200).json(savedChat);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const findUserChats = async (req, res) => { // get 
    // console.log("get, /find/:id"); 
    const id = req.params.id;
    // console.log("id " , id ); 


    try {
        const chats = await chatModel.find({
            members: { $in: [id] }
        });
        console.log("chats", chats);
        res.status(200).json(chats);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}
const findChat = async (req, res) => { // get 
    // console.log("get , /find/:firstId/:secondId") ; 
    const { firstId, secondId } = req.params;
    // console.log(firstId , " " , secondId); 

    try {
        const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } });

        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

module.exports = { creatChat, findChat, findUserChats }; 
