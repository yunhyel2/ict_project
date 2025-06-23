import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './router';
import 'rc-pagination/assets/index.css';
import './index.css';

{/*
    1) BrowserRouter 컴포넌트 대신 RouterProvider 컴포넌트 사용
    2) router.jsx에서 createBrowerRouter()함수로 라우팅 정보를 갖고 있는 BrowerRouter객체 생성
    3) RouterProvider 컴포넌트의 router속성에 BrowerRouter객체를 지정
    
    ※router.jsx에서 라우터 설정을 분리하여 관리하자
*/}

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
