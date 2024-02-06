import { useContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";

export const useFetchLastestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);
    useEffect(() => {
        const getMessages = async () => {
            const res = await getRequest(`${baseUrl}/messages/${chat?._id}`);

            if (res.error) {
                return console.log("Error getting messages .. ");
            }
            const lastMessage = res[res?.length - 1];
            setLatestMessage(lastMessage);

        };
        getMessages();

    }, [newMessage, notifications, chat?._id]) // Include 'chat?._id' as a dependency

    return { latestMessage };
}