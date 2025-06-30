import { FeedsProvider } from "/context/FeedsContext";
import Feeds from "./Feeds";

export default function FeedsContainer(props) {
    return <>
        <FeedsProvider>
            <Feeds {...props} />
        </FeedsProvider>
    </>
}