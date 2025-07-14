import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '/context/AuthContext';
import axios from "axios";
import { URL } from '/config/constants';
import Header from '/pages/Header';
import Menu from '/pages/Menu';
import Search from '/components/Search';
import Introduce from '/pages/Introduce';
import LogoutBtn from '/pages/login/LogoutBtn';
import SignupMap from '/pages/login/SignupMap';
import './App.css';

function App() {
  const { auth, login, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {

    //백엔드에서 세션에 값이 남아 있는지 체크 후 로그인 상태가 아니라면 로그아웃 시킨다.
    axios.get("/api/auth/login")
    .then(({ data }) => login(data))
    // .catch(() => logout());     /* TODO:: 주석처리풀기 */

    //  들어올때 로그인 여부 체크해서 로그인 안되어있다면 로그인 화면으로
    // if (!auth.account) navigate(URL.LOGIN);
  }, [])

  /* TODO:: 주석처리풀기 */
  // const needToSetLocation = !auth.location;
  const needToSetLocation = false;

  return (
    <>
      <div id="main_section">
          {needToSetLocation ? 
            <SignupMap /> :
             <>
              <Header />
              <main className="container">
                  <Outlet />
              </main>
              <Menu />
            </>
          }
      </div>
      <div id="side_section" className="p-4">
        <div className="p-3 border border-radius-12 border-gray bg-white">
          <Introduce />
          <Search placeholder="동네에서 검색해보세요" />
          <div className="d-flex flex-column gap-8 align-items-stretch pt-3">
            <LogoutBtn/>
            {/* TODO:: 관리자 유저만 보이도록 처리 */}
            <a href="/admin" target="_blank" className="btn btn-warning border-radius-12 btn-sm">관리자페이지</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
