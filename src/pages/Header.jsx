import { NavLink } from "react-router-dom";
import { URL } from "/config/constants";
import Logo from "/components/Logo";
import { useAuth } from "/context/AuthContext";
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
    const { auth: { account, notifications = dummy } } = useAuth(); /* 여기 들어오는 알림은 new 만 */
    const count = notifications?.length || 0;

    if (!account) return null;
    
    return <>
        <nav className={classes.header} style={{ height: 55 }}>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <Logo />
            </NavLink>
            <ul className="navbar-nav">
                <li className="nav-item">
                    {/* [TODO]:: 유저 알림 구현 */}
                    <NavLink to={URL.NOTIFICATIONS} className="position-relative p-2 pt-3">
                        <i className="fa-regular fa-bell" style={{ fontSize: 28 }} />
                        {count > 0 && <>
                            <span
                                className="badge border-radius-20 bg-danger position-absolute p-0 d-inline-flex justify-content-center align-items-center"
                                style={{ top: 4, right: -2, width: 20, height: 20, lineHeight: '20px', fontSize: 10 }}
                            >
                                {count}
                            </span>
                        </>}
                    </NavLink>
                </li>
            </ul>
        </nav>
    </>
}