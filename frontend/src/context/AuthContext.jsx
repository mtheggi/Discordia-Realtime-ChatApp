import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    // console.log("registerInfo", registerInfo);
    return <AuthContext.Provider value={{ user, setUser, registerInfo, setRegisterInfo }}>
        {children}
    </AuthContext.Provider>
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
