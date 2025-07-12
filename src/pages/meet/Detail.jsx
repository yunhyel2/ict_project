import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDate, OverlayPage } from "/components";
import ProfileImg from '/components/ProfileImg';

const dummy = { id: 1, title: '배드민턴 치실분 한분만', content: "배드민턴치실분 한분만 급하게 구해봅니다<br/>여자만 구해요. 남자안됨<br/><br/><br/>치고 밥먹고 헤어져요.", date: new Date('2025/07/20').toISOString(), goal: 1, applies: 0, user: { name: "윤혜리", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' }, createdAt: new Date().toISOString() };

export default function DetailMeet() {
    const { id } = useParams();
    const [meet, setMeet] = useState(dummy);
    const { title, content, createdAt = '', applies= 0, goal = 1, user } = meet;
    const { profileImage = '', name: username = "윤혜리" } = user;

    useEffect(() => {
        /* TODO:: 여기서 객체 불러와서 저장하기 */
    }, []);

    return <>
        <OverlayPage title="모임/모집">
            <div className="d-flex flex-column" style={{ height: '100%' }}>
                <div className="p-3 border-bottom border-gray d-flex gap-20 align-items-center" style={{ borderBottomWidth: '8px !important' }}>
                    <ProfileImg small src={profileImage} />
                    <div className="flex-grow">
                        <strong>{username}</strong>
                        <p>{title}</p>
                    </div>
                </div>
                <div className="border-bottom border-gray d-flex align-items">
                    <div className="d-flex p-3 flex-grow border-right border-gray">
                        <small className="align-self-center pe-4 text-nowrap text-gray">일시</small>
                        <small className="flex-grow">
                            {getDate(createdAt)}
                        </small>
                    </div>
                    <div className="d-flex p-3">
                        <small className="align-self-center pe-4 text-nowrap text-gray">지원 현황</small>
                        <small className="flex-grow">
                            {`${applies} 명 지원 / 총 ${goal} 명`}
                        </small>
                    </div>
                </div>
                <div className="flex-grow p-4 ps-3 pe-3 border-bottom border-gray" dangerouslySetInnerHTML={{ __html: content }} />
                {/* TODO:: 지원하기 버튼 / 마감될 경우 지원마감 버튼 노출 */}
                <button className="btn btn-primary p-3 border-radius-0">지원하기</button>
                <button className="btn btn-secondary p-3 border-radius-0" disabled>지원마감</button>
            </div>
        </OverlayPage>
    </>
}
