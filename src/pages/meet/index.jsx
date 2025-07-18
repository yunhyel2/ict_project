import { useEffect, useState } from "react";
import Meets from "./Meets";
import { getMeetAll } from "../../services/meets";

// const dummy = [
//     { id: 1, title: '배드민턴 치실분 한분만', date: new Date('2025/07/20').toISOString(), goal: 1, applies: 0, user: { name: "윤혜리", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' } },
//     { id: 2, title: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), goal: 6, applies: 3, user: { name: "정동준", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' } },
//     { id: 3, title: '영어 스터디 같이 할 사람 구해요', date: new Date('2025/08/05').toISOString(), goal: 5, applies: 0, user: { name: "윤혜리", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' } },
//     { id: 4, title: '포트폴리오용 간단 사이트 개발 하실분', date: new Date('2025/08/31').toISOString(), goal: 10, applies: 0, user: { name: "정동준", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' } },
//     { id: 5, title: '배드민턴 치실분 한분만', date: new Date('2025/07/20').toISOString(), goal: 1, applies: 0, user: { name: "윤혜리", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' } },
//     { id: 6, title: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), goal: 6, applies: 3, user: { name: "정동준", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' } },
//     { id: 7, title: '영어 스터디 같이 할 사람 구해요', date: new Date('2025/08/05').toISOString(), goal: 5, applies: 0, user: { name: "윤혜리", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' } },
//     { id: 8, title: '포트폴리오용 간단 사이트 개발 하실분', date: new Date('2025/08/31').toISOString(), goal: 10, applies: 0, user: { name: "정동준", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' } },
//     { id: 9, title: '배드민턴 치실분 한분만', date: new Date('2025/07/20').toISOString(), goal: 1, applies: 0, user: { name: "윤혜리", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' } },
//     { id: 10, title: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), goal: 6, applies: 3, user: { name: "정동준", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' } },
//     { id: 11, title: '영어 스터디 같이 할 사람 구해요', date: new Date('2025/08/05').toISOString(), goal: 5, applies: 0, user: { name: "윤혜리", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' } },
//     { id: 12, title: '포트폴리오용 간단 사이트 개발 하실분', date: new Date('2025/08/31').toISOString(), goal: 10, applies: 0, user: { name: "정동준", profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' } }
// ];

export default function MeetsContainer(props) {
    const [meets, setMeets] = useState([]);

    useEffect(() => {
        
        getMeetAll()
        .then(data => {
            console.log("불러온 게시글 데이터",data)
            setMeets(data);
        }).catch(err => console.error(err))
        //err.response.data?.message
        /* TODO:: 여기서 리스트 불러와서 저장하기 */
        // 단, 글은 20개(혹은 10개?)씩 순차적으로 불러와 기존 데이터에 쌓는 방식으로 진행해야한다.
        // 참조 :: react-intersection-observer 이용한 무한스크롤 (수업시간에 배웠습니다!)

    }, []);

    return <>
        <Meets {...props} meets={meets} setMeets={setMeets} />
        
    </>
}