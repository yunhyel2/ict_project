import { createBrowserRouter } from "react-router-dom";
import { URL } from "/config/constants";
import Home from "/pages/Home";
import Login from "/pages/login/Login";
import Signup from "/pages/login/Signup";
import NotFound from "/pages/NotFound";
import Introduce from "/pages/Introduce";
import Map from "/pages/ourplace/Map";
import MyPage from "/pages/mypage";
import Gathering from "/pages/gathering/Gathering";
import Feeds from "/pages/feed/Feeds";
import App from './App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: URL.LOGIN, element: <Login /> },
            { path: URL.REGISTER, element: <Signup /> },
            { path: URL.FEED, element: <Feeds /> },
            { path: URL.OURPLACE, element: <Map /> },
            { path: URL.JOINUS, element: <Gathering /> },
            { path: URL.MYPAGE, element: <MyPage /> },
            { path: "*", element: <NotFound /> }
        ]
    },
    {
        path: '/introduce',
        element: <Introduce />
    }
]);

export default router;