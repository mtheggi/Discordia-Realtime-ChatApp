/*eslint-disable*/
import { Stack } from "react-bootstrap";
import { useFetchRecChat } from "../Hooks/useFetchRecChat";
import { AvatarGenerator } from 'random-avatar-generator';
import { useEffect, useState } from "react";

const UserChat = ({ chat, user }) => {
    const { reciever } = useFetchRecChat(chat, user);
    const generator = new AvatarGenerator();
    const [avatar, setAvatar] = useState("./defaultAvatar.jpg");

    useEffect(() => {
        const newAvatar = generator.generateRandomAvatar(reciever?._id);
        setAvatar(newAvatar);
    }, [reciever])


    // console.log(reciever);
    return (
        <Stack direction="horizontal" className="user-card p-2 mb-1 justify-content-between" role='button'>
            <div className="d-flex flex-row m-0">
                <div className="me-2">
                    <img src={avatar} style={{ height: "60px", width: "60px" }}></img>
                </div>

                <div className="text-content">
                    <div className="name">{reciever?.name}</div>
                    <div className="text">text message</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date"> 1/1/2012</div>
                <div className="this-user-notifications"><strong>2</strong></div>
                <div className="user-online"></div>

            </div>

        </Stack >
    );
}

export default UserChat;