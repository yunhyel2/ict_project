import { NavLink } from "react-router-dom";
import { URL } from "/config/constants";

const kakao_login_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_RESTAPI_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
export default function LoginRegisterBtn() {

    return <>
        <a className="btn border-radius-12 p-0" style={{ background: '#fde500' }} href={kakao_login_url}>
            <img src="/assets/icons/kakao_login_btn.png" alt="카카오로 시작하기" />
        </a>
        <NavLink to={URL.LOGIN} className="btn border border-gray border-radius-12 btn-sm">로그인</NavLink>
        <NavLink to={URL.REGISTER} className="btn border border-gray border-radius-12 btn-sm">회원가입</NavLink>
    </>
}