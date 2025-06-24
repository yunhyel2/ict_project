import { NavLink } from 'react-router-dom';
import { MENU_URLS } from '/config/constants';
import classes from './Menu.module.scss';

const menus = [
  { path: MENU_URLS.MAIN, label: '홈', icon: 'menuIcon1.svg' },
  { path: MENU_URLS.TODAYFEED, label: '오늘의 피드', icon: 'menuIcon2.svg' },
  { path: MENU_URLS.OURPLACE, label: '추천플레이스', icon: 'menuIcon4.svg' },
  { path: MENU_URLS.JOINUS, label: '구인/모집', icon: 'menuIcon3.svg' },
  { path: MENU_URLS.MYPAGE, label: '마이', icon: 'menuIcon5.svg' }
]
function Menu() {
  return (
    <nav className={classes.menu}>
      {menus.map(({ path, label, icon }) => (
        <NavLink key={label} to={path} className={({ isActive }) => `${classes.menu_item} h6 ${isActive ? classes.active : ''}`}>
          <img src={`/assets/icons/${icon}`} alt="" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Menu;

