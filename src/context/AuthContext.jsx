import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "/config/constants";


const AuthContext = createContext(null);

const account = localStorage.getItem('account') || null;

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ account });  // 전역 state;
    const navigate = useNavigate();

    const login = (user) => {
        setAuth(user);
        localStorage.setItem('account', user.account);
    };
    const logout = () => {
        setAuth({});
        navigate(URL.LOGIN);
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