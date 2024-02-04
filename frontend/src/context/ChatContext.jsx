/* eslint-disable */
import { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { baseUrl, postRequest, getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [possibleChats, setPossibleChats] = useState([]);

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





    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        possibleChats,
        createChat
    }}>
        {children}
    </ChatContext.Provider>
}


