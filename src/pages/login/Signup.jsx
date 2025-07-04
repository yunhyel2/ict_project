import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "/config/constants";
import Logo from '/components/Logo';
import Statusbar from '/components/Statusbar';
import SignupMap from "./SignupMap";
import classes from "./Signup.module.scss";

// https://apis.map.kakao.com/web/sample/coord2addr/
// 유저의 현재 위치로 행정동 주소 알아내기 (가입할때 당근처럼 진행)

export default function Signup() {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const confirm = confirmRef.current.value;

        if (!username || !password || !confirm) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        if (password !== confirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // 기존 사용자 중복 확인
            const check = await axios.get(`${URL.USERS}?username=${username}`);
            if (check.data.length > 0) {
                alert("이미 존재하는 아이디입니다.");
                return;
            }

            // 회원 등록 요청
            await axios.post(`${URL.USERS}`, { username, password });
            alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("회원가입에 실패했습니다.");
        }
    };

    const onBack = e => {
        e.preventDefault();
        setStep(0);
    }

    console.log(import.meta.env.VITE_SOME_KEY);

    return <>
        <div className={classes.container}>
            <form className={classes.form} style={{ left: `-${step * 100}%` }} onSubmit={handleSubmit} >
                <SignupMap setStep={setStep} />
                <div className="d-flex flex-column align-items-stretch gap-20">
                    <Statusbar title="회원가입" onBack={onBack} />
                    <label htmlFor="register_id" hidden>아이디</label>
                    <input
                        id="register_id"
                        type="text"
                        ref={usernameRef}
                        placeholder="아이디를 입력하세요"
                        className="form-control border-color-gray border-radius-20"
                    />
                    <label htmlFor="register_password" hidden>비밀번호</label>
                    <input
                        id="register_password"
                        type="password"
                        ref={passwordRef}
                        placeholder="비밀번호를 입력하세요"
                        className="form-control border-color-gray border-radius-20"
                    />

                    <label htmlFor="register_password_confirm" hidden>비밀번호 확인</label>
                    <input
                        id="register_password_confirm"
                        type="password"
                        ref={confirmRef}
                        placeholder="비밀번호를 다시 입력하세요"
                        className="form-control border-color-gray border-radius-20"
                    />
                    <button type="submit" className="btn btn-primary border-radius-0 mt-auto">회원가입</button>
                </div>
            </form>
        </div>
    </>;
}
