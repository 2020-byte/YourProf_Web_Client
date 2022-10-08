import { createRef, useContext, useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Home from "../page/Home";



const AuthContext = createContext({});

const contextRef = createRef();

export function AuthProvider({authService, authErrorEventBus, children}) {
    const [user, setUser] = useState(false);

    const logout = () => {
        setUser(false);
    };

    const signin = () => {
        setUser(true);
    }


    const context = useMemo(
        () => ({
        user,
        signin,
        logout,
    }),
    [user, logout, signin]
    );


    return (
        <AuthContext.Provider value={context}>
            {(children)}
        </AuthContext.Provider>
    )
}

export class AuthErrorEventBus {
    listen(callback) {
        this.callback = callback;
    }

    notify(error) {
        this.callback(error);
    }
}

export default AuthContext;
export const useAuth = () => useContext(AuthContext);

