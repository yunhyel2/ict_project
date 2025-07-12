import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '/context/AuthContext';
import { URL } from '/config/constants';
import Header from '/pages/Header';
import Menu from '/pages/Menu';
import Search from '/components/Search';
import Introduce from '/pages/Introduce';
import LogoutBtn from '/pages/login/LogoutBtn';
import './App.css';


/*  
  로그인 해서 들어오는 화면들은 전부 이곳을 통한다. 
  TODO:: 로그인 안되어있을 시 로그아웃 시키고 로그인 페이지로 즉시 이동
*/
function App() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    //  들어올때 로그인 여부 체크해서 로그인 안되어있다면 로그인 화면으로
    if (!auth.account) navigate(URL.LOGIN);
  }, [])

  return (
    <>
      <div id="main_section">
        <Header />
        <main className="container">
          <Outlet />
        </main>
        <Menu />
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
