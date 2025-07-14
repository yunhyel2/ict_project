import { useEffect, useState } from "react";
import Feeds from "./Feeds";

const dummy = [
    { "id": 1, "content": "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ", "inter": 43, "comments": 152, user: { "name": "김예원", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTt-WYZNlqqG2IVptc_QFuwJS_rqWYHi-J1x-X1v7H_hNqgmBNoW6fJAsKEEZP7T9RQQ&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 2, "content": "병원에 사람이 진짜 많네요 ㅠㅠ", "image": "https://www.korea.kr/newsWeb/resources/attaches/2024.03/13/06_01.jpg", "inter": 35, "comments": 120, user: { "name": "윤혜리", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 3, "content": "요즘 좋은 일이 있습니다", "inter": 42, "comments": 63, user: { "name": "심형섭", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3jV3iXp0p-2sVnnoLHhcAIeEluDcJ4U1fCaORyEUWUEhjXLym_TQedZYykX04n7AIbE&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 4, "content": "지금 시장 열었나요?", "inter": 13, "comments": 36, user: { "name": "송아영", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcCx3hkGL-yUzxlKmvr-uufAhU5M5pcabJwwI0Bvs5O5tztesnJ1JVzE-N0azIvOtzvk&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 5, "content": "오늘 두레약국 영업 안한대요 참고하시고 저처럼 피해보지마세요", "inter": 23, "comments": 21, user: { "name": "임현우", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ng9mU93Gh7Xq1JpRDe47cWu4AqWXeIxcA6dBTc6nytsV2l_nJOkvvhh1wS9nV2fS0V8&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 6, "content": "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ", "image": "https://www.elle.co.kr/resources_old/online/org_online_image/el/c5083ba6-ad76-4b90-9ad1-2928d9e5b0c5.jpg",  "inter": 43, "comments": 152, user: { "name": "김예원", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTt-WYZNlqqG2IVptc_QFuwJS_rqWYHi-J1x-X1v7H_hNqgmBNoW6fJAsKEEZP7T9RQQ&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 7, "content": "병원에 사람이 진짜 많네요 ㅠㅠ", "inter": 35, "comments": 120, user: { "name": "윤혜리", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 8, "content": "지금 시장 열었나요?", "inter": 13, "comments": 36, user: { "name": "송아영", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcCx3hkGL-yUzxlKmvr-uufAhU5M5pcabJwwI0Bvs5O5tztesnJ1JVzE-N0azIvOtzvk&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 9, "content": "요즘 좋은 일이 있습니다", "inter": 42, "comments": 63, user: { "name": "심형섭", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3jV3iXp0p-2sVnnoLHhcAIeEluDcJ4U1fCaORyEUWUEhjXLym_TQedZYykX04n7AIbE&usqp=CAU" }, createdAt: new Date().toISOString() },
    { "id": 10, "content": "오늘 두레약국 영업 안한대요 참고하시고 저처럼 피해보지마세요", "inter": 23, "comments": 21, user: { "name": "임현우", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ng9mU93Gh7Xq1JpRDe47cWu4AqWXeIxcA6dBTc6nytsV2l_nJOkvvhh1wS9nV2fS0V8&usqp=CAU" }, createdAt: new Date().toISOString() }
];

export default function FeedsContainer(props) {
    const [feeds, setFeeds] = useState(dummy);

    useEffect(() => {
        ax
        /* TODO:: 여기서 리스트 불러와서 저장하기 */
        // 단, 피드는 20개(혹은 10개?)씩 순차적으로 불러와 기존 데이터에 쌓는 방식으로 진행해야한다.
        // 참조 :: react-intersection-observer 이용한 무한스크롤 (수업시간에 배웠습니다!)

    }, []);

    return <>
        <Feeds {...props} feeds={feeds} />
    </>
}