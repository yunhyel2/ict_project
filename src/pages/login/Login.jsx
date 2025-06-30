import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UsersContext } from "/context/UsersContext";
import { URL, USERS } from "/config/constants";
import { Link } from "react-router-dom";

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

    return (
        <div style={{ marginTop: "50px", textAlign: "center" }}>
    <h2 className="point">로그인</h2>
    <form
        onSubmit={submit}
        style={{
            display: "inline-block",
            textAlign: "left",
            padding: "20px",
            border: "1px solid var(--gray-border-color)",
            borderRadius: "5px",
            backgroundColor: "#fff",
        }}
    >
        <div style={{ marginBottom: "10px" }}>
            <label>아이디</label><br />
            <input
                ref={userNameRef}
                type="text"
                name="username"
                placeholder="아이디를 입력하세요"
                style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                    border: "1px solid var(--gray-border-color)",
                    color: "var(--text-color)",
                }}
            />
        </div>
        <div style={{ marginBottom: "10px" }}>
            <label>비밀번호</label><br />
            <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                    border: "1px solid var(--gray-border-color)",
                    color: "var(--text-color)",
                }}
            />
        </div>
        <div style={{ textAlign: "center" }}>
            <button
                type="submit"
                style={{
                    padding: "8px 20px",
                    backgroundColor: "var(--point-color)",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                로그인
            </button>
        </div>
    </form>
    <p style={{ marginTop: "10px" }}>
    아직 회원이 아니신가요?{" "}
    <Link to="/signup" className="point" style={{ textDecoration: "none" }}>
        회원가입
    </Link>
</p>
</div>
);
}
