import { useState } from "react";
import AuthContext from "./AuthContext";
import {
    getToken,
    saveToken,
    removeToken
} from "../utils/token";

function AuthProvider({ children }) {

    const [token, setToken] = useState(getToken());

    const login = (jwt) => {

        saveToken(jwt);

        setToken(jwt);

    };

    const logout = () => {

        removeToken();

        setToken(null);

    };

    return (

        <AuthContext.Provider

            value={{

                token,

                login,

                logout,

                isAuthenticated: !!token

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;