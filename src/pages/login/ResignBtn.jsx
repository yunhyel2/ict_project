import { useState } from "react";
import { useAuth } from "/context/AuthContext";
import { deleteUser } from "/services/users";
import PwdConfirm from "./PwdConfirm";

// 회원 탈퇴 버튼
export default function ResignBtn() {
    const [confirmed, setConfirmed] = useState(false);
    const { auth: { account }, logout } = useAuth();

    const resign = e => {
        e.preventDefault();
        deleteUser(account).then(({ data }) => {
            if (data?.id) {
                alert('성공적으로 탈퇴되었습니다. \n로그인 화면으로 돌아갑니다.');
                setConfirmed(false);
                logout();
            }
        });
    }

    const confirmResign = e => {
        e.preventDefault();
        if (confirm("정말 탈퇴하시겠습니까?")) {
            setConfirmed(true);
        }
    }

    return <>
        <p className="d-flex justify-content-end p-1 pe-2">
            <button onClick={confirmResign} className="btn btn-link btn-sm text-gray">회원 탈퇴하기</button>
        </p>
        {confirmed && <PwdConfirm onConfirm={resign} />}
    </>
}