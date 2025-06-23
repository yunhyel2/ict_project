import { useContext, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import List from './bbs/List';
import CreateForm from './bbs/CreateForm';
import UpdateForm from './bbs/UpdateForm';
import Detail from './bbs/Detail';
import { UsersContext } from "../context/UsersContext";
import { BBSProvider } from "../context/BbsContext";


export default function BBS() {
    const navigate = useNavigate();
    const { usersInfo: { auth } } = useContext(UsersContext);
    const isLogin = !!auth;

    useEffect(() => {
        if (!isLogin) {
            // 이 게시판에 입장할때 로그인 여부 체크
            alert("로그인 후 이용하세요!");
            console.log(navigate);
            navigate(-1);
        }
    }, []);

    if (!isLogin) return null;

    return <>
        <BBSProvider>
            <Routes>
                <Route path="" element={<List />} />
                <Route path="/form" element={<CreateForm />} />
                <Route path="/form/:id" element={<UpdateForm />} />
                <Route path="/:id" element={<Detail />} />
            </Routes>
        </BBSProvider>
    </>
}