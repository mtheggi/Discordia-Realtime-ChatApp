/* eslint-disable */
import { createContext, useState, useCallback, useEffect, useContext } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";
import { io } from "socket.io-client";

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
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [notifications, setNotifications] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    console.log("notifications ", notifications);
    //RecieveMessage/Notification  
    useEffect(() => {
        if (socket === null || user === null) return;
        socket.on("getMessage", (message) => {
            if (currentChat?._id !== message?.chatId) return;
            const { chatId, senderId, text, _id, createdAt, updatedAt, __v } = message;

            // console.log("mymess", mymessage);
            setMessages((prev) => [...prev, { chatId, senderId, text, _id, createdAt, updatedAt, __v }]);
        });

        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members.some(id => { return id === res.senderId });
            if (isChatOpen) {
                setNotifications(prev => [{ ...res, isRead: true }, ...prev]);
            } else {
                setNotifications(prev => [res, ...prev]);
            }
        })

        return () => {
            socket.off("getMessage");
            socket.off("getNotification");
        }
    }, [socket, currentChat]);


    // sendMessage 
    useEffect(() => {
        if (socket === null || user === null) return;

        const recieverId = currentChat?.members?.find((id) => id !== user?._id);

        socket.emit("sendMessage", { ...newMessage, recieverId })

    }, [newMessage])

    console.log("newMessages ", newMessage);
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])


    useEffect(() => {
        if (socket === null || user === null) return;
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (onlineUsers) => {
            setOnlineUsers(onlineUsers);
        })

        return () => {
            socket.off("getOnlineUsers"); // remove the listener 
        }
    }, [socket])




    console.log("OnlineUsers", onlineUsers);
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
            setAllUsers(res);
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


    const readAllNotifications = useCallback((notifications) => {
        const mNot = notifications.map((n) => { return { ...n, isRead: true } });
        setNotifications(mNot);
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
        SendMessage,
        onlineUsers,
        notifications,
        allUsers,
        readAllNotifications
    }}>
        {children}
    </ChatContext.Provider>
}


