import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UsersContext } from "/context/UsersContext";
import { URL, USERS } from "/config/constants";

export default function Login() {
    const { dispatch } = useContext(UsersContext);
    // const { login } = useOutletContext();
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
            console.log(res.data);
            if (res.data?.length > 0) {   // 일치하는 회원이 있는 경우
                const [user] = res.data;
                dispatch({ type: USERS.LOGIN, auth: user.username });
                navigate(`/users-nested/${username}`, { replace: true });
            } else {  // 일치하는 회원이 없는 경우
                alert("회원 정보가 없습니다!");
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    

    return <>
        <div className="p-5 bg-warning text-white rounded">
        <h1>로그인</h1>
        </div>
        <form>
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-4">
                    <input ref={userNameRef} type="text" className="form-control" placeholder="아이디를 입력하세요" name="username"/>
                </div>
                <div className="col-4">
                    <input ref={passwordRef} type="password" className="form-control" placeholder="비밀번호를 입력하세요" name="password"/>
                </div>
                <div className="col-auto">
                    <button className="btn btn-danger" onClick={submit}>로그인</button>
                </div>
            </div>
        </form>
    </>
}
