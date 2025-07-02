import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GatheringContext } from "/context/GatheringContext";
import { makeCalendar, getDate, OverlayPage } from "/components";
import ProfileImg from '/components/ProfileImg';


export default function DetailGathering() {
    const { id } = useParams();
    const { model, dispatch } = useContext(GatheringContext);
    const { feeds = [] } = model;

    const { title = '배드민턴 치실분', content = '같이 배드민턴 치실분<br/>한분만 구해요 젊은 여성분이었으면 좋겠어요!', date = '2025-07-16T12:00:00', applies= 0, goal = 1 } = feeds[0] || {};
    const { profile_image = '', name = "윤혜리" } = {};

    console.log(id);
    return <>
        <OverlayPage title="모임/모집">
            <div className="d-flex flex-column">
                <div className="p-3 border-bottom border-gray d-flex gap-20 align-items-center" style={{ borderBottomWidth: '8px !important' }}>
                    <ProfileImg small src={profile_image} />
                    <div className="flex-grow">
                        <strong>{name}</strong>
                        <p>{title}</p>
                    </div>
                </div>
                <div className="border-bottom border-gray d-flex align-items">
                    <div className="d-flex p-3 flex-grow border-right border-gray">
                        <small className="align-self-center pe-4 text-nowrap text-gray">일시</small>
                        <small className="flex-grow">
                            {getDate(date)}
                        </small>
                    </div>
                    <div className="d-flex p-3">
                        <small className="align-self-center pe-4 text-nowrap text-gray">지원 현황</small>
                        <small className="flex-grow">
                            {`${applies} 명 지원 / 총 ${goal} 명`}
                        </small>
                    </div>
                </div>
                <div className="p-4 ps-3 pe-3 border-bottom border-gray" dangerouslySetInnerHTML={{ __html: content }} style={{ height: 300 }} />
                {/* TODO:: 지원하기 버튼 / 마감될 경우 지원마감 버튼 노출 */}
                <button className="btn btn-primary p-3 border-radius-0">지원하기</button>
                <button className="btn btn-secondary p-3 border-radius-0" disabled>지원마감</button>
            </div>
        </OverlayPage>
    </>
}
