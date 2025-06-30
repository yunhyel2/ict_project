import { createContext, useReducer } from "react";
import { FEEDS } from "/config/constants";



const initialState = {
    feeds: [
    { "id": 1, "title": "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ", "inter": 43, "comments": 152, "author": "김예원", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTt-WYZNlqqG2IVptc_QFuwJS_rqWYHi-J1x-X1v7H_hNqgmBNoW6fJAsKEEZP7T9RQQ&usqp=CAU" },
    { "id": 2, "title": "병원에 사람이 진짜 많네요 ㅠㅠ", "image": "https://www.korea.kr/newsWeb/resources/attaches/2024.03/13/06_01.jpg", "inter": 35, "comments": 120, "author": "윤혜리", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU" },
    { "id": 3, "title": "요즘 좋은 일이 있습니다", "inter": 42, "comments": 63, "author": "심형섭", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3jV3iXp0p-2sVnnoLHhcAIeEluDcJ4U1fCaORyEUWUEhjXLym_TQedZYykX04n7AIbE&usqp=CAU" },
    { "id": 4, "title": "지금 시장 열었나요?", "inter": 13, "comments": 36, "author": "송아영", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcCx3hkGL-yUzxlKmvr-uufAhU5M5pcabJwwI0Bvs5O5tztesnJ1JVzE-N0azIvOtzvk&usqp=CAU" },
    { "id": 5, "title": "오늘 두레약국 영업 안한대요 참고하시고 저처럼 피해보지마세요", "inter": 23, "comments": 21, "author": "임현우", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ng9mU93Gh7Xq1JpRDe47cWu4AqWXeIxcA6dBTc6nytsV2l_nJOkvvhh1wS9nV2fS0V8&usqp=CAU" },
    { "id": 6, "title": "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ", "image": "https://www.elle.co.kr/resources_old/online/org_online_image/el/c5083ba6-ad76-4b90-9ad1-2928d9e5b0c5.jpg",  "inter": 43, "comments": 152, "author": "김예원", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTt-WYZNlqqG2IVptc_QFuwJS_rqWYHi-J1x-X1v7H_hNqgmBNoW6fJAsKEEZP7T9RQQ&usqp=CAU" },
    { "id": 7, "title": "병원에 사람이 진짜 많네요 ㅠㅠ", "inter": 35, "comments": 120, "author": "윤혜리", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU" },
    { "id": 8, "title": "지금 시장 열었나요?", "inter": 13, "comments": 36, "author": "송아영", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcCx3hkGL-yUzxlKmvr-uufAhU5M5pcabJwwI0Bvs5O5tztesnJ1JVzE-N0azIvOtzvk&usqp=CAU" },
    { "id": 9, "title": "요즘 좋은 일이 있습니다", "inter": 42, "comments": 63, "author": "심형섭", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3jV3iXp0p-2sVnnoLHhcAIeEluDcJ4U1fCaORyEUWUEhjXLym_TQedZYykX04n7AIbE&usqp=CAU" },
    { "id": 10, "title": "오늘 두레약국 영업 안한대요 참고하시고 저처럼 피해보지마세요", "inter": 23, "comments": 21, "author": "임현우", "profile_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ng9mU93Gh7Xq1JpRDe47cWu4AqWXeIxcA6dBTc6nytsV2l_nJOkvvhh1wS9nV2fS0V8&usqp=CAU" }

  ]
};

export const FeedsContext = createContext(null);

const FeedsReducer = (state, action) => {
    switch(action.type) {
        case FEEDS.ALL:
            // 피드는 20개(혹은 10개?)씩 순차적으로 불러와 기존 데이터에 쌓는 방식으로 진행한다.
            return { ...state, feeds: [...state.feeds, ...action.feeds] };
        default:
    }
    return state;
}

export function FeedsProvider({ children }) {
    const [model, dispatch] = useReducer(FeedsReducer, initialState);

    return <>
        <FeedsContext.Provider value={{ model, dispatch }}>
            {children}
        </FeedsContext.Provider>
    </>
}