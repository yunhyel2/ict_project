import { NavLink } from 'react-router-dom';
import { URL } from '/config/constants';
import classes from './Menu.module.scss';

const menus = [
  { path: URL.MAIN, label: '홈', icon: 'menuIcon1.png' },
  { path: URL.FEED, label: '오늘의 피드', icon: 'menuIcon2.png' },
  { path: URL.OURPLACE, label: '추천플레이스', icon: 'menuIcon3.png' },
  { path: URL.JOINUS, label: '구인/모집', icon: 'menuIcon4.png' },
  { path: URL.MYPAGE, label: '마이', icon: 'menuIcon5.png' }
]
function Menu() {
  return (
    <nav className={classes.menu}>
      {menus.map(({ path, label, icon }) => (
        <NavLink key={label} to={path} className={({ isActive }) => `${classes.menu_item} h6 ${isActive ? classes.active : ''}`}>
          <img src={`/assets/icons/${icon}`} width="auto" height="36%" alt="" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu;

