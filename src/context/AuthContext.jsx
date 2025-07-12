import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "/config/constants";


const AuthContext = createContext(null);

const account = localStorage.getItem('account') || 'ict-test-user';
const name = localStorage.getItem('name') || 'ICT 테스트 유저';
const location = localStorage.getItem('location') || '서울특별시 서초구 서초동';

export const authSessionClear = () => {
    // 세션에 남은 auth 정보 클리어
    localStorage.removeItem('account');
    localStorage.removeItem('name');
    localStorage.removeItem('location');
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ account, location, name });  // 전역 state;
    const navigate = useNavigate();

    const login = (user) => {
        setAuth(user);
        localStorage.setItem('account', user.account);
        localStorage.setItem('name', user.name);
        localStorage.setItem('location', user.locations?.location);
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