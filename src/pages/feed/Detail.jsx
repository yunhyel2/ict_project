import { useContext } from "react";
import { useParams } from "react-router-dom";
import { FeedsContext } from "/context/FeedsContext";
import { OverlayPage } from "/components";


export default function DetailFeed() {
    const { id } = useParams();
    const { model, dispatch } = useContext(FeedsContext);
    const { feeds = [] } = model;

    console.log(id);
    return <>
        <OverlayPage title="오늘의 피드">
            <div className="p-20">
                detail
            </div>
        </OverlayPage>
    </>
}
