/* eslint-disable */
import { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [success, setsuccess] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    useEffect(() => {
        let user = localStorage.getItem('User');
        if (user) {
            setsuccess(true);
        }
        setUser(JSON.parse(user));

    }, [])

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));

        setIsRegisterLoading(false);
        if (response.error) {
            return setRegisterError(response);
        }


        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        setsuccess(true);

    }, [registerInfo])



    // console.log("registerInfo", registerInfo);
    const logoutUser = useCallback(() => {
        localStorage.removeItem('User');
        setUser(null);
    }, []);

    return <AuthContext.Provider value={{ user, setUser, registerInfo, setRegisterInfo, registerError, registerUser, isRegisterLoading, success, logoutUser }}>
        {children}
    </AuthContext.Provider>
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};
