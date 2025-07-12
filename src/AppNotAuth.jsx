import { Outlet } from 'react-router-dom';
import Search from '/components/Search';
import Introduce from '/pages/Introduce';
import LoginRegisterBtn from '/pages/login/LoginRegisterBtn';
import './App.css';

/*  로그인 하지 않고 들어올 수 있는 화면들은 전부 이곳을 통한다. */
function AppNotAuth() {

  return (
    <>
      <div id="main_section">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <div id="side_section" className="p-4">
        <div className="p-3 border border-radius-12 border-gray bg-white">
          <Introduce />
          <Search placeholder="동네에서 검색해보세요" />
          <div className="d-flex flex-column gap-8 align-items-stretch pt-3">
            <LoginRegisterBtn/>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppNotAuth
