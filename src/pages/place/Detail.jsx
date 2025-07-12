import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OverlayPage } from "/components";
import Comment from './components/Comment';
import { Rank } from "./components/Rank";


const dummyRanks = [
    {
        id: 1,
        user: { name: "test" },
        rank: 5,
        comment: "좋았어용 최고의 맛집"
    },
    {
        id: 2,
        user: { name: "test2" },
        rank: 1,
        comment: "너무 비쌈 ㅡㅡ;"
    },
    {
        id: 3,
        user: { name: "test3" },
        rank: 3,
        comment: "맛있긴한데 밥먹는 중에 알바생을 혼내서 불편했네용"
    }
]

const dummy = {
    "id": 1,
    "name": "니뽕내뽕",
    "category": "중식",
    "address": "서울 강남구 강남대로98길 8 2,3층",
    "image": "https://ldb-phinf.pstatic.net/20250625_48/1750829385064N7Yu8_JPEG/%B0%F8%C5%EB1.jpg",
    "ranks": dummyRanks
};


/* 장소에 대한 별점 + 한줄평 페이지 */
export default function DetailPlace() {
    const { id } = useParams();
    const [place, setPlace] = useState(dummy);   // 플레이스 객체 정보
    const { ranks = [] } = place;


    const sum = ranks.reduce((acc, { rank }) => acc + rank, 0);
    const avg = ranks.length ? sum/ranks.length : 0;

    

    useEffect(() => {
        /* TODO:: 여기서 리스트 불러와서 저장하기 */
    }, []);

    return <>
        <OverlayPage title={place.name}>
            {/* TODO:: 장소의 address로 지도 구현하기 */}
            <div style={{ height: 400 }} />
            <div className="border-top border-bottom border-gray bg-gray p-3 d-flex flex-column align-items-center">
                <p className="h4 d-inline-flex align-items-center gap-8"><small style={{ fontWeight: 400, fontSize: 16 }}>평균 별점</small> {avg.toFixed(1)}</p>
                <Rank value={avg} readOnly />
            </div>
            {/* 코멘트를 불러와서 뿌려주기 */}
            <ul className="list-group full">
                {ranks.map(rank => <Comment key={rank.id} {...rank} />)}
            </ul>
            <div style={{ height: 60 }} />
        </OverlayPage>
    </>
}
