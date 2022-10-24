import { createRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { useMemo } from "react";
import { createContext } from "react";




const AuthContext = createContext({});

const contextRef = createRef();

export function AuthProvider({authService, authErrorEventBus, children}) {
    
    const [user, setUser] = useState(undefined);

    useImperativeHandle(contextRef, () => (user ? user.token : undefined));

    useEffect(() => {
        authService.me().then(setUser).catch(console.error);
    }, [authService]);

    const logout = useCallback(
        async () => authService.logout().then(() => setUser(undefined)),
        [authService]
    );

    const signin = useCallback(
        async (username, password) =>
            authService.login(username, password).then((user) => setUser(user)),
        [authService]
    );

    const signup = useCallback(
        async (username, password, name, email) =>
            authService
            .signup(username, password, name, email)
            .then((user) => setUser(user)),
        [authService]
    );


    const context = useMemo(
        () => ({
        user,
        signin,
        signup,
        logout,
    }),
    [user, logout, signup, signin]
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
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);

