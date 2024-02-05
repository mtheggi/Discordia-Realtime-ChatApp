/* eslint-disable */
import { createContext, useState, useCallback, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { baseUrl, postRequest, getRequest } from "../utils/services";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [possibleChats, setPossibleChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

    const [newMessage, setNewMessage] = useState(null);
    const [newMessageError, setNewMessageError] = useState(null);


    // console.log("current Chat", currentChat);
    // console.log("Messages", messages);
    useEffect(() => {
        const getMessages = async () => {
            if (user?._id) {
                setIsMessageLoading(true);
                setMessagesError(null);


                const res = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
                setIsMessageLoading(false);
                if (res.error) {
                    setMessagesError(res);
                    return console.log("Error in fetching Messages ");
                }

                setMessages(res);


            }
        };
        getMessages();
    }, [currentChat])



    const getPossibleChats = async () => {
        if (user?._id) {

            const res = await getRequest(`${baseUrl}/users/`);
            if (res.error) {
                return console.log("Chatcontext , getPossible Chats , Error in fetching possible chats. ");
            }
            const newPossibleChats = res.filter((u) => {
                let isChatcreated = false;
                if (user?._id === u?._id) return false;

                if (userChats) {

                    isChatcreated = userChats.some((chat) => {
                        return (chat.members[0] === u._id || chat.members[1] === u._id);
                    })
                }
                return !isChatcreated;
            })

            setPossibleChats(newPossibleChats);

        }
    }




    const getUserChats = async () => {
        if (user?._id) {
            const id = user._id;
            setUserChatsError(null);

            setIsUserChatsLoading(true);
            const res = await getRequest(`${baseUrl}/chats/find/${id}`);
            setIsUserChatsLoading(false);

            if (res.error) {
                return setUserChatsError(res);
            }
            setUserChats(res);
        }
    }

    const createChat = useCallback(async (firstId, secondId) => {
        // const { firstId, secondId } = req.body;
        const body = { firstId: firstId, secondId: secondId };

        const res = await postRequest(`${baseUrl}/chats/create`, JSON.stringify(body));
        if (res.error) {
            return console.log("Error creating new chat in the request .... ");

        }
        setUserChats((prev) => [...prev, res]);

    }, [])



    useEffect(() => {
        getUserChats();
    }, [user]);

    useEffect(() => { getPossibleChats(); }, [userChats]);

    const SendMessage = useCallback(async (textmessage, chatId, senderId, setTextMessage) => {
        //chatId, senderId, text 
        if (!textmessage) return console.log("you must type something ");

        const body = { chatId: chatId, senderId: senderId, text: textmessage };

        const res = await postRequest(`${baseUrl}/messages/`, JSON.stringify(body));

        if (res.error) {
            return setNewMessageError(res);
        }
        setNewMessage(res);
        setMessages((prev) => [...prev, res]);
        setTextMessage("");

    }, [])




    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        possibleChats,
        createChat,
        setCurrentChat,
        currentChat,
        messages,
        isMessageLoading,
        SendMessage
    }}>
        {children}
    </ChatContext.Provider>
}


