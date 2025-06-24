import { createBrowserRouter } from "react-router-dom";
import Home from "/pages/Home";
import Login from "/pages/login/Login";
import NotFound from "/pages/NotFound";
import App from './App';
import Introduce from "./pages/Introduce";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "*", element: <NotFound /> },
        ]
    },
    {
        path: '/introduce',
        element: <Introduce />
    }
]);

export default router;