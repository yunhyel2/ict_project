import axios from "axios";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { authSessionClear, useAuth } from "/context/AuthContext";
import Logo from '/components/Logo';
import { URL } from "/config/constants";

export default function Login() {
    const { login } = useAuth();
    const accountRef = useRef();
    const passwordRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        
        const account = accountRef.current.value;
        const password = passwordRef.current.value;

        if (!account || !password) {
            alert("아이디와 비밀번호를 전부 입력해주세요!");
            return;
        }
        
        // 로그인할 때 사용한 아이디와 비밀번호를 dto로 전송
        axios.post("/api/auth/login", { account, password })
        .then(({ data }) => {
            if (data?.id) login(data);
        })
        .catch(err => {
            alert(err.response.data?.message);
        });
    };

    useEffect(() => {
        // 로그인 페이지로 떨어지는 순간 세션의 유저 정보를 삭제시킨다.
        authSessionClear();
    }, []);

    return <>
        <div style={{ height: '100%' }}>
            <form className="d-flex flex-column align-items-stretch" style={{ gap: 20, padding: 60 }} onSubmit={submit}>
                <Logo style={{ zoom: 1.5, margin: '0px auto' }} />
                <label htmlFor="login_id" hidden>아이디</label>
                <input
                    id="login_id"
                    className="form-control border-color-gray border-radius-20 ps-3"
                    ref={accountRef}
                    type="text"
                    name="username"
                    placeholder="아이디를 입력하세요"
                    style={{ height: 60 }}
                />
                <label htmlFor="login_password" hidden>비밀번호</label>
                <input
                    id="login_password"
                    className="form-control border-color-gray border-radius-20 ps-3"
                    ref={passwordRef}
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    style={{ height: 60 }}
                />
                <button
                    type="submit"
                    className="btn btn-primary border-radius-20"
                    style={{ height: 60 }}
                >
                    로그인
                </button>
            </form>
            <p className="d-flex gap-8 justify-content-center">
                아직 회원이 아니신가요?
                <Link to={URL.REGISTER} className="point">회원가입</Link>
            </p>
        </div>
    </>;
}
