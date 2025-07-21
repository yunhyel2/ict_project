import { Link, Outlet, useLocation } from "react-router-dom";
import { URL } from "/config/constants";
import Loading from "/components/Loading";
import Feed from "./components/Feed";

export default function Feeds({ feeds, loading, setFeeds, lastFeedElementRef, loadingMore, hasMore }) {
    const { pathname } = useLocation();
    // 목록페이지에서만 로딩 노출
    if (pathname === URL.FEED && loading) return <Loading />;

    return <>
        <ul className="list-group full overflow-y-auto" style={{ minHeight: '100%', height: '100%' }}>
            {feeds.length == 0 && <li className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>피드가 없습니다.</li>}
            {feeds.map((feed, index) => {
                if (index === feeds.length - 1) {   // 마지막에 ref 붙인다.
                    return <Feed key={feed.id} feed={feed} ref={lastFeedElementRef} />;
                } else {
                    return <Feed key={feed.id} feed={feed} />;
                }
            })}
            {loadingMore && (
                <li className="d-flex align-items-center justify-content-center p-3">
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">로딩 중...</span>
                    </div>
                    <span className="ms-2">더 많은 피드를 불러오는 중...</span>
                </li>
            )}
            {!hasMore && feeds.length > 0 && (
                <li className="d-flex align-items-center justify-content-center p-3 text-muted">
                    모든 피드를 불러왔습니다.
                </li>
            )}
        </ul>
        <Outlet context={{ setFeeds }} />
        <Link to={`${URL.FEED}/create`} className="create_button" />
    </>
}
