import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "/components/Logo";
import { useAuth } from "/context/AuthContext";
import ProfileImg from "/components/ProfileImg";
import classes from "./Header.module.scss";


const dummy = [
    {
        id: 1,
        auser: { name: "윤혜리" },
        content: "[#user]님이 [#target]에 댓글을 남겼습니다.",
        target: "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ",
        link: "/feeds/1"
    },
    {
        id: 2,
        auser: { name: "윤혜리" },
        content: "[#user]님이 [#target]에 댓글을 남겼습니다.",
        target: "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ",
        link: "/feeds/1"
    },
    {
        id: 3,
        auser: { name: "윤혜리" },
        content: "[#user]님이 [#target]에 댓글을 남겼습니다.",
        target: "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ",
        link: "/feeds/1"
    }
];
export default function Header() {
    const { auth: { account, notifications = dummy } } = useAuth();
    const [showNoti, setShowNoti] = useState(false);
    const count = notifications?.length || 0;
    const navigate = useNavigate();

    const makeMessage = (str, user, target) => {
        str = str.replace("[#user]", `<b>${user.name}</b>`);
        str = str.replace("[#target]", `<b style="max-width: 130px; line-height: 1" class="d-inline-block text-truncate">${target}</b>`);
        return str;
    }

    
    
    useEffect(() => {
        const closeNoti = (e) => {
            if (showNoti && !e.target.closest("#notilist")) {
                setShowNoti(false);
                window.removeEventListener("click", closeNoti);
            }
        };
        if (showNoti) {
            setTimeout(() => {
                window.addEventListener("click", closeNoti);
            }, 500)
        }
    }, [showNoti])

    if (!account) return null;
    
    return <>
        <nav className={classes.header} style={{ height: 55 }}>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <Logo />
            </NavLink>
            <ul className="navbar-nav">
                <li className="nav-item">
                    {/* [TODO]:: 유저 알림 구현 */}
                    <button className="btn btn-none p-1 pt-2 position-relative" onClick={() => setShowNoti(!showNoti)}>
                        <i className="fa-regular fa-bell" style={{ fontSize: 28 }} />
                        {count > 0 && <>
                            <span
                                className="badge border-radius-20 bg-danger position-absolute p-0 d-inline-flex justify-content-center align-items-center"
                                style={{ top: 0, right: -4, width: 20, height: 20, lineHeight: '20px', fontSize: 10 }}
                            >
                                {count}
                            </span>
                        </>}
                    </button>
                </li>
            </ul>
        </nav>
        <div id="notilist" hidden={!showNoti} className="position-absolute border border-gray border-radius-20 bg-white overflow-hidden" style={{ top: 68, right: 8, zIndex: 10 }}>
        {showNoti && <>
            <ul className="list-group overflow-y-auto border-none" style={{ width: 250, maxHeight: 200, margin: -2 }}>
                {notifications.map(({ auser, content, target, link }) => <>
                    <li className="p-2 list-group-item d-flex gap-8 list-group-item-action pointer" onClick={() => navigate(link)}>
                        <ProfileImg src={auser.profileImage} zoom={0.3} />
                        <div dangerouslySetInnerHTML={{ __html: makeMessage(content, auser, target, link) }} style={{ fontSize: 13 }} />
                    </li>
                </>)}
            </ul>
        </>}
        </div>
    </>
}