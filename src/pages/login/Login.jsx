import { useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UsersContext } from "/context/UsersContext";
import Logo from '/components/Logo';
import { URL, USERS } from "/config/constants";

export default function Login() {
    const { dispatch } = useContext(UsersContext);
    const userNameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        const username = userNameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            alert("아이디와 비밀번호를 전부 입력해주세요!");
            return;
        }

        axios.get(`${URL.USERS}?username=${username}&password=${password}`)
            .then(res => {
                if (res.data?.length > 0) {
                    const [user] = res.data;
                    dispatch({ type: USERS.LOGIN, auth: user.username });
                    navigate(`/users-nested/${username}`, { replace: true });
                } else {
                    alert("회원 정보가 없습니다!");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return <>
        <div style={{ height: '100%' }}>
            <form className="d-flex flex-column align-items-stretch" style={{ gap: 20, padding: 60 }} onSubmit={submit}>
                <Logo style={{ zoom: 1.5, margin: '0px auto' }} />
                <label htmlFor="login_id" hidden>아이디</label>
                <input
                    id="login_id"
                    className="form-control border-color-gray border-radius-20"
                    ref={userNameRef}
                    type="text"
                    name="username"
                    placeholder="아이디를 입력하세요"
                    style={{ height: 60 }}
                />
                <label htmlFor="login_password" hidden>비밀번호</label>
                <input
                    id="login_password"
                    className="form-control border-color-gray border-radius-20"
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
