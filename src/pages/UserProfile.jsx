//  <<<     사용자 프로필을 별도의 라우팅으로 구성 : 중첩 라우팅 미사용   >>>
//  1. 사용자 프로필 화면을 독립된 페이지로 보여줄 때 사용
//  2. URL 파라미터(id)는 사용자 프로필 컴포넌트(UserProfile)에서만 받을 수 있다.

import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useContext, useEffect } from "react";
import { UsersContext } from "../context/UsersContext";

//  3. 모든 사용자 데이터를 UserProfile 컴포넌트에 속성값으로 내린다.
export default function UserProfile({ users: users_props }) {

    const { usersInfo: { users = users_props } } = useContext(UsersContext);
    
    //  <<< 리액트 라우터 돔의 URL 파라미터를 읽어오는 훅 함수 : useParams() >>>
    const { id } = useParams();
    //  URL 파라미터로 받은 아이디로 사용자를 필터링해야 한다.
    const [user] = users.filter(({ username:userId }) => userId.toString() === id.toString());

    useEffect(() => {
        window.scrollTo(0,0);
    }, [id]);

    // 존재하지 않는 사용자 URL로 요청받는 경우 처리해줘야 
    if (!user) return <NotFound />;
    
    
    return <>
        <h2>Profile</h2>
        <table className="table table-bordered">
            <tbody>
                <tr>
                    <th className="w-25 bg-dark text-white text-center">아이디</th>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <th className="w-25 bg-dark text-white text-center">이름</th>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <th className="w-25 bg-dark text-white text-center">프로필</th>
                    <td>{user.profile}</td>
                </tr>
            </tbody>
        </table>
    </>
}