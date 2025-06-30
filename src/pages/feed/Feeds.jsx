import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { URL } from "/config/constants";
import Feed from "./components/Feed";
import { FeedsContext } from "/context/FeedsContext";


export default function Feeds() {
    const { model, dispatch } = useContext(FeedsContext);
    const { feeds = [] } = model;

    return <>
        <ul className="list-group full overflow-y-auto" style={{ minHeight: '100%', height: '100%' }}>
            {feeds.map(feed => <Feed key={feed.id} feed={feed} />)}
        </ul>
        <Outlet />
        <Link to={`${URL.FEED}/create`} className="create_button" />
    </>
}
