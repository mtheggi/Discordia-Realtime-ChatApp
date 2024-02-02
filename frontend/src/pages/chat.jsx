/*eslint-disable*/
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
    const { userChats,
        isUserChatsLoading,
        userChatsError,
    } = useContext(ChatContext);


    console.log("userchat ", userChats);





    return (<h1>Chat</h1>);
}

export default Chat;