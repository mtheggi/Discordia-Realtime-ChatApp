/* eslint-disable */
import { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { baseUrl, postRequest, getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

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

    useEffect(() => {
        getUserChats();
    }, [user]);




    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError

    }}>
        {children}
    </ChatContext.Provider>
}


