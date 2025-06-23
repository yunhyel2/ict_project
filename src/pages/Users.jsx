import User from "./User";
import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

export default function Users() {
    const { usersInfo: { users } } = useContext(UsersContext);

    return <>
        <div className="row mt-5">
            {users.map(user => (
                <div className="col-sm-4 my-1" key={user.id}>
                    <User {...user} />
                </div>
            ))}
        </div>
    </>
}