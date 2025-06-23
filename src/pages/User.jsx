import { useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import { USERS } from "../config/constants";

export default function User({ username: id, name, profile, likes, avatar }) {
    const { pathname } = useLocation();
    const { dispatch } = useContext(UsersContext);
    
    const profileBtnRef = useRef()

    const userid = pathname.split('/')[2];

    const isActive = userid && userid === id;
    return <>
    <div className={`card ${isActive ? 'border-primary' : ''}`}>
        <img src={`/images/${avatar}`} className="card-img-top" alt="Card image" />
        <div className="card-body">
            <h4 className="card-title">{name}</h4>
            <p className="card-text">{profile}</p>
            {/* 상대경로로 지정하는 방법도 있다. */}
            <Link to={id} ref={profileBtnRef} className={`btn btn-${isActive ? 'outline-secondary disabled' : 'primary'}`}>프로필 보기</Link>
            <button className="btn btn-outline-secondary m-2" onClick={() => dispatch({ type: USERS.LIKES, username: id })}>
                <i className="fa-solid fa-heart m-1" style={{ color: '#e94f4f' }}></i>
                <span>{likes}</span>
            </button>
        </div>
    </div>
    </>
}