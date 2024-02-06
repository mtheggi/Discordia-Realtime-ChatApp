/*eslint-disable */
import { useContext, useState, useRef, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { useFetchRecChat } from "../Hooks/useFetchRecChat";
import Loading from "./Loading";
import { Button, Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji"

const ChatBox = () => {

    const { currentChat, messages, isMessageLoading, SendMessage } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    const { reciever } = useFetchRecChat(currentChat, user);
    const [textMessage, setTextMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);



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

                <div ref={messagesEndRef} />
            </Stack>

            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <InputEmoji placeholder="send message"
                    type="text"
                    onChange={(e) => { setTextMessage(e) }}
                    value={textMessage}
                    fontFamily="nunito"
                    borderColor="rbga(72, 112,223,0.2)"
                />
                <Button className="send-btn" onClick={() => SendMessage(textMessage, currentChat._id, user._id, setTextMessage)} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                    </svg>
                </Button>

            </Stack>


        </Stack>


    );
}

export default ChatBox;