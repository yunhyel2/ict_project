import { createContext, useReducer } from "react";
import { GATHERING } from "/config/constants";



const initialState = {
    gatherings: [
        { id: 1, subject: '배드민턴 치실분 한분만', date: new Date('2025/07/20').toISOString(), max: 1, party: 0, author: "윤혜리", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
        { id: 2, subject: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), max: 6, party: 3, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' },
        { id: 3, subject: '영어 스터디 같이 할 사람 구해요', date: new Date('2025/08/05').toISOString(), max: 5, party: 0, author: "윤혜리", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
        { id: 4, subject: '포트폴리오용 간단 사이트 개발 하실분', date: new Date('2025/08/31').toISOString(), max: 10, party: 0, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' },
        { id: 5, subject: '배드민턴 치실분 한분만', date: new Date('2025/07/20').toISOString(), max: 1, party: 0, author: "윤혜리", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
        { id: 6, subject: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), max: 6, party: 3, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' },
        { id: 7, subject: '영어 스터디 같이 할 사람 구해요', date: new Date('2025/08/05').toISOString(), max: 5, party: 0, author: "윤혜리", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
        { id: 8, subject: '포트폴리오용 간단 사이트 개발 하실분', date: new Date('2025/08/31').toISOString(), max: 10, party: 0, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' },
        { id: 9, subject: '배드민턴 치실분 한분만', date: new Date('2025/07/20').toISOString(), max: 1, party: 0, author: "윤혜리", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
        { id: 10, subject: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), max: 6, party: 3, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' },
        { id: 11, subject: '영어 스터디 같이 할 사람 구해요', date: new Date('2025/08/05').toISOString(), max: 5, party: 0, author: "윤혜리", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
        { id: 12, subject: '포트폴리오용 간단 사이트 개발 하실분', date: new Date('2025/08/31').toISOString(), max: 10, party: 0, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' }
    ]
};

export const GatheringContext = createContext(null);

const GatheringReducer = (state, action) => {
    switch(action.type) {
        case GATHERING.ALL:
            // 모임은 20개(혹은 10개?)씩 순차적으로 불러와 기존 데이터에 쌓는 방식으로 진행한다.
            return { ...state, feeds: [...state.gatherings, ...action.gatherings] };
        default:
    }
    return state;
}

export function GatheringProvider({ children }) {
    const [model, dispatch] = useReducer(GatheringReducer, initialState);

    return <>
        <GatheringContext.Provider value={{ model, dispatch }}>
            {children}
        </GatheringContext.Provider>
    </>
}