import { createContext, useContext, useEffect, useState } from "react";
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
        setAuth({ ...user, location: user.location?.location });
        navigate(URL.HOME, { replace: true });
    };

    const logout = () => {
        setAuth({});
        navigate(URL.LOGIN, { replace: true });
    }

    useEffect(() => {
        localStorage.setItem('account', auth.account);
        localStorage.setItem('name', auth.name);
        if (auth.location?.location) localStorage.setItem('location', auth.location?.location);
    }, [auth])

    return <>
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    </>
}

export function useAuth() {
    return useContext(AuthContext);
}