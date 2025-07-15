import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "/config/constants";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});  // 전역 state;
    const navigate = useNavigate();

    const login = (user) => {
        setAuth({ ...user, location: user.location?.location });
        navigate(URL.HOME, { replace: true });
    };

    const logout = () => {
        setAuth({});
        navigate(URL.LOGIN, { replace: true });
    }

    return <>
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    </>
}

export function useAuth() {
    return useContext(AuthContext);
}