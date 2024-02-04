/*eslint-disable */
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { useFetchRecChat } from "../Hooks/useFetchRecChat";
import Loading from "./Loading";
import { Stack } from "react-bootstrap";
import moment from "moment";

const ChatBox = () => {
    const { currentChat, messages, isMessageLoading } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    const { reciever } = useFetchRecChat(currentChat, user);

    if (!reciever) {
        return (<p style={{ textAlign: "center", width: "100%" }}> No Conversation Selected Yet ... </p>);
    }
    if (isMessageLoading) {
        return (<> <Loading /> </>);
    }
    return (
        <Stack gap={3} className="chat-box">
            <div className="chat-header">
                <strong>{reciever.name}</strong>
            </div>

            <Stack className="messages" gap={3}>
                {messages && messages.map((m) => {
                    return (
                        <Stack key={m._id} className={`${m?.senderId === user?._id ?
                            "message self align-self-end flex-grow-0" :
                            "message align-self-start flex-grow-0"
                            }`}>
                            <span ><strong>{m.text} </strong></span>
                            <span className="message-footer">{moment(m.createdAt).calendar()}</span>
                        </Stack>
                    );

                })}
            </Stack>

        </Stack>


    );
}

export default ChatBox;