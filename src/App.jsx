import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import { UsersProvider } from './context/UsersContext';
import './App.css';

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
        <Header />
        <div className="container">
          <Outlet />
        </div>
      </UsersProvider>
    </>
  )
}

export default App
