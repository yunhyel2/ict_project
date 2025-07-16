import { Outlet } from "react-router-dom";
import Feed from "../feed/components/Feed";
import { OverlayPage } from "/components";
export default function MyCreateFeed(){

    return<>
        <OverlayPage title="내가 작성한 피드">
            {/* <ul className="list-group full overflow-y-auto" style={{ minHeight: '100%', height: '100%' }}>
            {MyCreateFeed.map(feed => <Feed key={feed.id} feed={feed} />)}
            </ul> */}
            <Outlet />
            
        </OverlayPage>
    
    </>
}