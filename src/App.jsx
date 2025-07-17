import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '/context/AuthContext';
import axios from "axios";
import Header from '/pages/Header';
import Menu from '/pages/Menu';
import Search from '/components/Search';
import Introduce from '/pages/Introduce';
import LogoutBtn from '/pages/login/LogoutBtn';
import SignupMap from '/pages/login/SignupMap';
import Chat from '/pages/Chat';
import './App.css';

function App() {
  const [chat, setChat] = useState();
  const { auth, fetchAuth, logout } = useAuth();
  
  useEffect(() => {

    //백엔드에서 세션에 값이 남아 있는지 체크 후 로그인 상태가 아니라면 로그아웃 시킨다.
    axios.get("/api/auth/login")
    .then(({ data }) => fetchAuth(data))
    .catch(() => logout());     /* TODO:: 주석처리풀기 */
  }, [])

  /* TODO:: 주석처리풀기 */
  const needToSetLocation = auth.account && !auth.location;
  // const needToSetLocation = false;

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
            {auth.role == "ADMIN" && <a href="/admin" target="_blank" className="btn btn-danger border-radius-12 btn-sm">관리자페이지</a>}
            <button className="btn btn-warning border-radius-12 btn-sm" onClick={() => setChat(true)}>동네에서 실시간 채팅하기</button>
          </div>
        </div>
        {chat && <Chat onClose={() => setChat(false)} />}
      </div>
    </>
  )
}

export default App
