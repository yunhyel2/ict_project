import { Link } from "react-router-dom";
import { OverlayPage } from "/components";
import { makeCalendar } from '/components';
import { useAuth } from "/context/AuthContext";
import { useEffect } from "react";
export default function MyCreateMeet(){

    const { auth: { name: username, location } } = useAuth();
    useEffect(()=>{
        /*아이디 검색 / 조회(대조)
        해당 유저가 작성한 글 가져와 뿌려주기 */ 

    },[]);

    return<>
        <OverlayPage title="내가 작성한 모집글">
            <ul  className="flex-grow d-flex flex-column gap-20 p-20 justify-content-start overflow-y-auto">
                <li className="border border-gray border-radius-12 d-flex align-items-center p-3 gap-20" style={{ flex: '1 1 50%' }}>
                    <div className="inline-block"></div>
                    {makeCalendar()}
                    <div className="d-flex flex-column flex-grow">
                        <span className="text-truncate d-inline-block mb-1" style={{ maxWidth: 240 }}>  제목</span>
                        <small className="text-gray"><i className="fas fa-calendar-check me-1" /> 날짜</small>
                    </div>
                    <div className="d-flex flex-column flex-grow">
                        <span className="text-gray text-right text-nowrap" style={{ fontSize: 12 }}>지원 5명 /0 명</span>
                        <Link to="/" className="btn btn-outline-primary btn-sm mt-1"> 마감하기 </Link>
                    </div>
                </li>
            </ul>
        </OverlayPage>

    </>
}