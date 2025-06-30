import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GatheringContext } from "/context/GatheringContext";
import { OverlayPage } from "/components";


export default function DetailGathering() {
    const { id } = useParams();
    const { model, dispatch } = useContext(GatheringContext);
    const { feeds = [] } = model;

    console.log(id);
    return <>
        <OverlayPage title="모임/모집">
            <div className="p-20">
                detail
            </div>
        </OverlayPage>
    </>
}
