import { createBrowserRouter } from "react-router-dom";
import Home from "/pages/Home";
import Login from "/pages/login/Login";
import NotFound from "/pages/NotFound";
import Introduce from "/pages/Introduce";
import { URL } from "/config/constants";
import Map from "/pages/ourplace/Map";
import App from './App';
import Signup from "/pages/signup/Signup";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: URL.OURPLACE, element: <Map /> },
            { path: "*", element: <NotFound /> },
        ]
    },
    {
        path: '/introduce',
        element: <Introduce />
    }
]);

export default router;