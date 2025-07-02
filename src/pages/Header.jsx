import { NavLink } from "react-router-dom";
import Logo from "/components/Logo";
import classes from "./Header.module.scss";

export default function Header() {
    return <>
        <nav className={classes.header} style={{ height: 55 }}>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <Logo />
            </NavLink>
            <ul className="navbar-nav">
                <li className="nav-item">
                    {/* [TODO]:: 유저 알림 구현 */}
                </li>
            </ul>
        </nav>
    </>
}