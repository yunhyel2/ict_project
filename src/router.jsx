import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import App from './App';
import Login from "./pages/Login";
import BBS from "./pages/BBS";
import Photo from "./pages/Photo";
import Users from "./pages/Users";
import UsersNested from "./pages/UsersNested";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import List from "./pages/bbs/List";
import Detail from "./pages/bbs/Detail";
import CreateForm from "./pages/bbs/CreateForm";
import UpdateForm from "./pages/bbs/UpdateForm";

{/*
    <<<createBrowserRouter를 사용>>>
    기존의 <Routes>를 대체
    App.jsx에서 관리하던 <Route> 설정을 router.jsx 파일로 분리한다
    중첩 라우트(users/:id)도 children 배열로 정리
    https://reactrouter.com/6.30.0/upgrading/future#v7_starttransition
*/}


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "users", element: <Users /> },
            { path: "users/:id", element: <UserProfile /> },
            { 
                path: "users-nested",
                element: <UsersNested />,
                children: [
                    { path: ":id", element: <UserProfile /> }
                ]
            },
            { path: "bbs/*", element: <BBS /> },
            { path: "photo", element: <Photo /> },
            { path: "*", element: <NotFound /> },
        ]
    }
]);

export default router;