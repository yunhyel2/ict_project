import { useContext } from "react";
import { Outlet } from "react-router-dom";
import User from "./User";
import { UsersContext } from "../context/UsersContext";

export default function UsersNested() {
    const { usersInfo: { users } } = useContext(UsersContext);

    return <>
        <Outlet context={{ users }} />
        <div className="row mt-5">
            {users.map(user => (
                <div className="col-sm-4 my-1" key={user.id}>
                    <User {...user} />
                </div>
            ))}
        </div>
    </>
}