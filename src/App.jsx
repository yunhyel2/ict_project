import { Outlet } from 'react-router-dom';
import Header from '/pages/Header';
import { UsersProvider } from '/context/UsersContext';
import Menu from '/pages/Menu';
import Search from '/components/Search';
import './App.css';
import Introduce from './pages/Introduce';
import LoginRegisterBtn from './pages/login/LoginRegisterBtn';
import LogoutBtn from './pages/login/LogoutBtn';


function App() {

  //  << State를 리듀서와 컨텍스트로 관리하기 >>
  //  (1) useState()로 관리 했던 사용자 목록 및 인증 데이타 제거 (App.jsx)
  //  (2) 사용자 목록 및 인증 데이타를 리듀서와 컨텍스트로 관리하기 위한 Context 객체 생성 (context / AuthContext.jsx)
  //  (3) Context 객체의 Provider 컴포넌트 생성 (context / AuthContext.jsx)
  //  (4) Provider 컴포넌트로 데이타를 제공할 자식 컴포넌트들 감싸기
  //  (5) 자식 컴포넌트에 내리는 모든 Props 제거

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
              <LoginRegisterBtn/>
              <LogoutBtn/>
              {/* TODO:: 관리자 유저만 보이도록 처리 */}
              <a href="/admin" target="_blank" className="btn btn-warning border-radius-12 p-3">관리자페이지</a>
            </div>
          </div>
        </div>
      </UsersProvider>
    </>
  )
}

export default App
