import { Link, Outlet } from 'react-router-dom';
import { URL } from '/config/constants';
import Search from '/components/Search';
import { makeCalendar, getDate } from '/components';

export default function Meets({ meets = [], setMeets }){

    const categories = ['알바', '소모임', '친구구해요', '운동', '취미', '맛집탐방', '스터디'];

    return<>
        <div className="d-flex flex-column" style={{ minHeight: '100%', height: '100%' }}>
            <div className="border-bottom border-gray position-sticky bg-white" style={{ top: 0 }}>
                <div className="d-flex gap-8 pt-3 ms-3 me-3">
                    {categories.map(v => <div key={v} className="btn btn-sm btn-outline-primary border-radius-20 text-nowrap">#{v}</div>)}
                </div>
                <div className="p-3 pt-2"><Search /></div>
            </div>
            <div className="flex-grow d-flex flex-column gap-20 p-20 justify-content-start overflow-y-auto">
                {meets.map(({ id, meetAt, title, goal, applies = 0 }) => (
                    <div key={id} className="border border-gray border-radius-12 d-flex align-items-center p-3 gap-20">
                        {makeCalendar(meetAt)}
                        <div className="d-flex flex-column flex-grow">
                            <span className="text-truncate d-inline-block mb-1" style={{ maxWidth: 240 }}>{title}</span>
                            <small className="text-gray"><i className="fas fa-calendar-check me-1" /> {getDate(meetAt)}</small>
                        </div>
                        <div className="d-flex flex-column">
                            <small className="text-gray text-right text-nowrap" style={{ fontSize: 12 }}>지원 {applies}명 / {goal}명</small>
                            <Link to={`${URL.JOINUS}/${id}`} className="btn btn-outline-primary btn-sm mt-1">지원</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Link to={`${URL.JOINUS}/create`} className="create_button" />
        <Outlet context={{ setMeets }} /> 
    </>

}