/*eslint-disable*/
import { Stack } from "react-bootstrap";
import { useFetchRecChat } from "../Hooks/useFetchRecChat";
import { AvatarGenerator } from 'random-avatar-generator';
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";
import { useFetchLastestMessage } from "../Hooks/useFetchLastestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
    const { reciever } = useFetchRecChat(chat, user);
    const generator = new AvatarGenerator();
    const [avatar, setAvatar] = useState("./defaultAvatar.jpg");
    const { onlineUsers, notifications, markThisUSerNotificationAsRead } = useContext(ChatContext);
    const [thisUserNotifications, setThisUserNotifications] = useState([]);
    const { latestMessage } = useFetchLastestMessage(chat);
    useEffect(() => {
        const newAvatar = generator.generateRandomAvatar(reciever?._id);
        setAvatar(newAvatar);
    }, [reciever])


    useEffect(() => {
        const unreadNotifications = unreadNotificationsFunc(notifications);
        const nthisUserNotifications = unreadNotifications?.filter((n) => {
            return n.senderId === reciever?._id;
        })
        setThisUserNotifications(nthisUserNotifications);
    }, [notifications])

    const truncateText = (text) => {
        let shortText = text.substring(0, 20);
        if (text.length > 20) {
            shortText = shortText + "...."
        }
        return shortText
    }

    return (
        <Stack direction="horizontal" className="user-card p-2 mb-1 justify-content-between"
            role='button'
            onClick={() => {
                if (thisUserNotifications?.length !== 0) {
                    markThisUSerNotificationAsRead(thisUserNotifications, notifications);
                }

            }}

        >
            <div className="d-flex flex-row m-0">
                <div className="me-2">
                    <img src={avatar} style={{ height: "60px", width: "60px" }}></img>
                </div>

                <div className="text-content">
                    <div className="name">{reciever?.name}</div>
                    <div className="text">{latestMessage?.text && (<span>{truncateText(latestMessage?.text)}</span>)}</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date"> {moment(latestMessage?.createdAt).calendar()}</div>
                <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ''}>
                    <strong>
                        {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ''}
                    </strong>
                </div>
                <div className={onlineUsers?.some((u) => u?.userId === reciever?._id) ? "user-online" : ""}></div>

            </div>

        </Stack >
    );
}

export default UserChat;