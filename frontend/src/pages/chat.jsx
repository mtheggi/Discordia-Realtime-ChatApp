/*eslint-disable*/
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import UserChat from "../components/UserChat";
import PossibleChats from "../components/PossibleChats";
import ChatBox from "../components/ChatBox";
const Chat = () => {
    const { userChats, isUserChatsLoading, setCurrentChat, messages, isMessageLoading } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    // console.log("userchat ", userChats);
    // console.log("isuserChatLoading", isUserChatsLoading);


    return (
        <Container>
            <PossibleChats />
            {userChats?.length === 0 ? null : (
                <Stack direction="horizontal" gap={4} className="align-items-start ">
                    <Stack className="flex-grow-0 messages-box pe-3" gap={2}>

                        {isUserChatsLoading ? <Loading /> : (
                            userChats?.map((chat) => {
                                return (<div key={chat._id} onClick={() => { setCurrentChat(chat) }}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                                );
                            })
                        )
                        }
                    </ Stack>

                    <ChatBox />
                </Stack>
            )
            }

        </Container >

    );
}

export default Chat;