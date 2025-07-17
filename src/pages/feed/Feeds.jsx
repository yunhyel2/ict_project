import { Link, Outlet } from "react-router-dom";
import { URL } from "/config/constants";
import Loading from "/components/Loading";
import Feed from "./components/Feed";

export default function Feeds({ feeds, loading, setFeeds }) {
    if (loading) return <Loading />;

    return <>
        <ul className="list-group full overflow-y-auto" style={{ minHeight: '100%', height: '100%' }}>
            {feeds.length == 0 && <li className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>피드가 없습니다.</li>}
            {feeds.map(feed => <Feed key={feed.id} feed={feed} />)}
        </ul>
        <Outlet context={{ setFeeds }} />
        <Link to={`${URL.FEED}/create`} className="create_button" />
    </>
}
