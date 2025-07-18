import { useEffect, useState } from "react";
import { getFeeds } from "/services/feeds";
import Feeds from "./Feeds";

export default function FeedsContainer(props) {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /* TODO:: 여기서 리스트 불러와서 저장하기 */
        // 단, 피드는 20개(혹은 10개?)씩 순차적으로 불러와 기존 데이터에 쌓는 방식으로 진행해야한다.
        // 참조 :: react-intersection-observer 이용한 무한스크롤 (수업시간에 배웠습니다!)
        loadFeeds();
    }, []);

    const loadFeeds = async () => {
        try {
            setLoading(true);
            const data = await getFeeds();
            setFeeds(data);
        } catch (error) {
            console.error("피드 로딩 실패:", error);
            setFeeds([]);
        } finally {
            setLoading(false);
        }
    };

    return <>
        <Feeds {...props} feeds={feeds} loading={loading} setFeeds={setFeeds} />
    </>
}