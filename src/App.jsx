import { Outlet } from 'react-router-dom';
import Header from '/pages/Header';
import { UsersProvider } from '/context/UsersContext';
import Menu from '/pages/Menu';
import Search from '/components/Search';
import './App.css';
import Introduce from './pages/Introduce';
import LoginRegisterBtn from './pages/login/LoginRegisterBtn';
import LogoutBtn from './pages/login/LogoutBtn';


/*  
  로그인 해서 들어오는 화면들은 전부 이곳을 통한다. 
  TODO:: 로그인 안되어있을 시 로그아웃 시키고 로그인 페이지로 즉시 이동
*/
function App() {


  return (
    <>
      <UsersProvider>
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
      </UsersProvider>
    </>
  )
}

export default App
