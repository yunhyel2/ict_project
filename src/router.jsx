import { createBrowserRouter } from "react-router-dom";
import { URL } from "/config/constants";
import { AuthProvider } from '/context/AuthContext';
import Home from "/pages/Home";
import Login from "/pages/login/Login";
import Signup from "/pages/login/Signup";
import SignupMap from "/pages/login/SignupMap";
import NotFound from "/pages/NotFound";
import Place from "/pages/place";
import CreatePlace from "/pages/place/Create";
import DetailPlace from "/pages/place/Detail";
import MyPage from "/pages/mypage";
import Meet from "/pages/meet";
import CreateMeet from "/pages/meet/Create";
import DetailMeet from "/pages/meet/Detail";
import ModifyMeet from "/pages/meet/Modify";
import MyPageUserInfo from "/pages/mypage/UserInfo";
import Feeds from "/pages/feed";
import DetailFeed from "/pages/feed/Detail";
import CreateFeed from "/pages/feed/Create";
import Notifications from "/pages/Notifications";
import App from './App';
import AppNotAuth from "./AppNotAuth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthProvider><App /></AuthProvider>,
        children: [
            { path: "", element: <Home /> },
            { path: URL.NOTIFICATIONS, element: <Notifications /> },
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
                element: <Place />,
                children: [
                    { path: `create`, element: <CreatePlace /> },
                    { path: ':id', element: <DetailPlace /> },
                ]
            },
            { 
                path: URL.JOINUS,
                element: <Meet />,
                children: [
                    { path: `create`, element: <CreateMeet /> },
                    { path: `modify/:id`, element: <ModifyMeet />},
                    { path: ':id', element: <DetailMeet /> },
                ]
            },
            { path: URL.MYPAGE, element: <MyPage /> },
            { path: URL.MYINFO, element: <MyPageUserInfo /> },
            { path: URL.MYLOCATION, element: <SignupMap /> },
            { path: "*", element: <NotFound /> }
        ]
    },
    {
        path: '/',
        element: <AuthProvider><AppNotAuth /></AuthProvider>,
        children: [
            { path: URL.LOGIN, element: <Login /> },
            { path: URL.REGISTER, element: <Signup /> }
        ]
    }
]);

export default router;