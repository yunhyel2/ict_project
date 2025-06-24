import { useContext, useEffect } from "react";
import axios from "axios";
import { URL, USERS } from "/config/constants";
import { UsersContext } from "/context/UsersContext";

async function getUsersFromServer () {
    const { data } = await axios.get(URL.USERS);
    return data;
}

export default function Home() {
    const { dispatch } = useContext(UsersContext);

    useEffect(() => {
        getUsersFromServer().then(data => dispatch({ type: USERS.ALL, users: data }));
    }, []);

    return <>
        <div className="p-5 bg-info text-white rounded">
            <h1>
                Home <small>메인 페이지 입니다</small>
            </h1>
        </div>
    </>
}