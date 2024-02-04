/*eslint-disable */
import { useState, useEffect } from "react";
import { getRequest, baseUrl } from "../utils/services";

// fetch Reciever Chat 


export const useFetchRecChat = (chat, user) => {
    const [reciever, setReciever] = useState(null);
    const [error, setError] = useState(null);
    const recieverId = chat?.members.find(id => id !== user?._id);

    useEffect(() => {

        const getUser = async () => {
            if (!recieverId) return null;

            setError(null);
            const res = await getRequest(`${baseUrl}/users/find/${recieverId}`);
            if (res.error) {

                return setError(res);
            }
            setReciever(res);
        }
        getUser();
    }, [recieverId])


    return { reciever }
}