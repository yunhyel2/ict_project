import { createBrowserRouter } from "react-router-dom";
import { URL } from "/config/constants";
import Home from "/pages/Home";
import Login from "/pages/login/Login";
import Signup from "/pages/login/Signup";
import NotFound from "/pages/NotFound";
import Introduce from "/pages/Introduce";
import Map from "/pages/ourplace/Map";
import CreatePlace from "/pages/ourplace/Create";
import MyPage from "/pages/mypage";
import Gathering from "/pages/gathering";
import CreateGathering from "/pages/gathering/Create";
import DetailGathering from "/pages/gathering/Detail";
import Feeds from "/pages/feed";
import DetailFeed from "/pages/feed/Detail";
import CreateFeed from "/pages/feed/Create";
import App from './App';
import AppNotAuth from "./AppNotAuth";
import MyPageUserInfo from "./pages/mypage/UserInfo";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { 
                path: URL.FEED,
                element: <Feeds />,
                children: [
                    { path: `create`, element: <CreateFeed /> },
                    { path: ':id', element: <DetailFeed /> },
                ]
            },
            { 
                path: URL.OURPLACE,
                element: <Map />,
                children: [
                    { path: `create`, element: <CreatePlace /> },
                    { path: ':id', element: <DetailFeed /> },
                ]
            },
            { 
                path: URL.JOINUS,
                element: <Gathering />,
                children: [
                    { path: `create`, element: <CreateGathering /> },
                    { path: ':id', element: <DetailGathering /> },
                ]
            },
            { path: URL.MYPAGE, element: <MyPage /> },
            { path: URL.MYINFO, element: <MyPageUserInfo /> },
            { path: "*", element: <NotFound /> }
        ]
    },
    {
        path: '/',
        element: <AppNotAuth />,
        children: [
            { path: URL.LOGIN, element: <Login /> },
            { path: URL.REGISTER, element: <Signup /> },
        ]
    }
]);

export default router;