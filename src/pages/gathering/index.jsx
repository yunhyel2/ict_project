import { GatheringProvider } from "/context/GatheringContext";
import Gathering from "./Gatherings";

export default function GatheringContainer(props) {
    return <>
        <GatheringProvider>
            <Gathering {...props} />
        </GatheringProvider>
    </>
}