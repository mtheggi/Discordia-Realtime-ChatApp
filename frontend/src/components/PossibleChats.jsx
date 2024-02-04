/*eslint-disable*/
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const PossibleChats = () => {
    const { possibleChats, createChat } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    // console.log(possibleChats);
    return (
        <Stack direction="horizontal" className="mb-3 flex-wrap">
            {possibleChats && possibleChats.map((u) => {
                return (
                    // onClick={}
                    <div key={u._id} className="single-user mb-1" onClick={() => createChat(user._id, u._id)}>
                        <strong>{u.name}</strong>
                        <span className="user-online"></span>
                    </div>
                );

            })
            }
        </Stack >



    );
}

export default PossibleChats;   