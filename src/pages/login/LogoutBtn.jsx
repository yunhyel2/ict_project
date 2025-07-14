import { useNavigate } from "react-router-dom";
import { useAuth } from "/context/AuthContext";
import axios from "axios";
axios.defaults.withCredentials = true;

    const springLogin = "http://localhost:8080/api/auth";

export default function LogoutBtn() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = e => {
        axios.get(springLogin + "/logout")
            .then(res => {
                navigate('/login', { replace: true });
            })
            .catch(err => {
                console.log("error : ", err);
            });
        logout();
    }

    return <button onClick={onLogout} className="btn border border-gray border-radius-12 btn-sm">로그아웃</button>
}