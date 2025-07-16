import { useEffect, useState } from "react";
import { verifyUser } from "/services/users";
import Input from "/components/Input";
import Logo from "/components/Logo";
import { useAuth } from "/context/AuthContext";

export default function PwdConfirm({ onConfirm }) {
    const [password, setPassword] = useState("");
    const { auth: { account } } = useAuth();
    const isSocialLogin = !isNaN(account);

    const submit = (e) => {
        e.preventDefault();
        verifyUser(account, password)
        .then((data) => {
            if (data?.id) onConfirm();
        })
        .catch((error) => alert(error.response?.data?.message || '비밀번호가 틀립니다!'));
        e.stopPropagation();
    };

    const checkEnter = (e) => {
        if (e.key === "Enter") submit(e);
    }

    useEffect(() => {
        /* 카카오, 네이버 로그인 사용자는 비밀번호 재검증을 하지 않는다. 즉, 숫자면 바로 넘어가지도록 */
        if (isSocialLogin) onConfirm();
    }, [isSocialLogin])

    if (isSocialLogin) return null;

    return <>
        <div className="bg-white position-absolute d-flex flex-column justify-content-center" style={{ width: '100%', height: '100%', top: 0, left: 0, zIndex: 20 }}>
            <div className="d-flex flex-column align-items-stretch justify-content-center" style={{ gap: 20, padding: '0 40px 80px' }}>
                <Logo style={{ margin: '0 auto', zoom: 1.6 }} />
                <h6 className="mt-2 mb-1 text-center" style={{ lineHeight: 1.3 }}>회원정보 접근 시, <br/>개인정보 보호를 위해 본인확인을 진행합니다.</h6>
                <input type="text" name="account" value={account} readOnly hidden />
                <Input type="password" name="password" placeholder="비밀번호를 입력하세요" value={password} onChange={e => setPassword(e.target.value)} autoFocus onKeyDown={checkEnter} />
                <button
                    type="submit"
                    className="btn btn-primary border-radius-20"
                    style={{ height: 60 }}
                    disabled={!password}
                    onClick={submit}
                >
                    확인
                </button>
            </div>
        </div>
    </>;
}
