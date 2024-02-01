const messageModel = require("../Models/messageModel");

const createMessage = async (req, res) => { // create post 
    const { chatId, senderId, text } = req.body;
    console.log("post , /create")
    try {
        const message = new messageModel({
            chatId: chatId,
            senderId: senderId,
            text: text
        })
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const getMessages = async (req, res) => { // get 
    console.log("get , /find/:chatId")
    //get all messages in chat with specified id from params 
    const { chatId } = req.params;

    try {
        const messages = await messageModel.find({ chatId: chatId });
        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }


}


module.exports = { createMessage, getMessages }