import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL, USERS } from "/config/constants";
import { UsersContext } from "/context/UsersContext";
import Weather from "/components/Weather";
import ProfileImg from "/components/ProfileImg";

async function getUsersFromServer () {
    const { data } = await axios.get(URL.USERS);
    return data;
}

const places = [
    {
        id: 1,
        thumbnail: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqmKll-DUjzwTbRdmGqSQvN1XNZV72-oyFdRf8PYB0D7opmdBkcDNN-6yjq9cBr_SUYTSGVoExFBvfxUjNsq_lVflo0ucjB5rgjczt6C6GDMmKt7v8rUCfw3a_HJQJvyz1bRSFtSg=s1360-w1360-h1020',
        name: '차백도',
        category: '카페/디저트'
    },
    {
        id: 2,
        thumbnail: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqZ0ylOwfEXU4lSI1897lnysXHf9mv4ttg4tzAFYQJlQ-JwNvmKidoNoZ_clMHnP9cMR74NdBQyJ6iWF8CWnfTBm_Ve-9DVF5JHccDSn1R8wzXnvhqpWAXE_xXlWb8CbSjwmCYz=s1360-w1360-h1020-rw',
        name: '강남교자',
        category: '음식점'
    },
    {
        id: 3,
        thumbnail: 'https://lh5.googleusercontent.com/proxy/15kuMEe1xqqsWsgEr_TYjP64rHtweiV9aSBP3RZ-BAlhNYcTXfKr_QE9wLFLXRa5T85wddpGwFlZoBSP4evBolY0eeoQT-WgnmY6LY0Rbpc',
        name: '강동성심병원',
        category: '병원'
    },
    {
        id: 4,
        thumbnail: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqziLsROcdXVk_Ext5PNlN_jOJoAM1O3PqyFnzha3AUt6hVL7ApWllFFx31YdNWvxxs5QWKOtmZTUabATO7Zrq1z1N-VrtOBj8yTcKocCR5R5XzyhxsOxKNvkbMXiHgLK5nVjI=s1360-w1360-h1020',
        name: '두레약국',
        category: '약국'
    }
];

const feeds = [
    { id: 1, title: '오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ', inter: 43, comments: 152, author: '김예원', profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTt-WYZNlqqG2IVptc_QFuwJS_rqWYHi-J1x-X1v7H_hNqgmBNoW6fJAsKEEZP7T9RQQ&usqp=CAU' },
    { id: 2, title: '병원에 사람이 진짜 많네요 ㅠㅠ', inter: 35, comments: 120, author: '윤혜리', profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
    { id: 3, title: '요즘 좋은 일이 있습니다', inter: 42, comments: 63, author: '심형섭', profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3jV3iXp0p-2sVnnoLHhcAIeEluDcJ4U1fCaORyEUWUEhjXLym_TQedZYykX04n7AIbE&usqp=CAU' },
    { id: 4, title: '지금 시장 열었나요?', inter: 13, comments: 36, author: '송아영', profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcCx3hkGL-yUzxlKmvr-uufAhU5M5pcabJwwI0Bvs5O5tztesnJ1JVzE-N0azIvOtzvk&usqp=CAU' },
    { id: 5, title: '오늘 두레약국 영업 안한대요 참고하시고 저처럼 피해보지마세요', inter: 23, comments: 21, author: '임현우', profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Ng9mU93Gh7Xq1JpRDe47cWu4AqWXeIxcA6dBTc6nytsV2l_nJOkvvhh1wS9nV2fS0V8&usqp=CAU' }
]

const join = [
    { id: 1, subject: '배드민턴 치실분 한분만', date: new Date('2025/07/20').toISOString(), max: 1, party: 0, author: "윤혜리", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMfeYVIFGvDHrF30lB5S57Nxk1iFVLu48ZQpy_1dRTNQHp7c-VHGYXoMR-sUuVmg87K0&usqp=CAU' },
    { id: 2, subject: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), max: 6, party: 3, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' },
    { id: 3, subject: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), max: 6, party: 0, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' },
    { id: 4, subject: '같이 설빙 신메뉴 먹어볼 파티원 모집합니다', date: new Date('2025/07/11').toISOString(), max: 6, party: 0, author: "정동준", profile_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWG4MePynPvEaiOY7cL5vnawHiKkvO0bK81o4JJx-okbML_IIrDda_FtDKeKbhV_k47-8&usqp=CAU' }
];

const makeCalendar = (dt) => {
    const time = new Date(dt);
    const locale = "en-gb";

    var date   = time.getDate();
    var month = time.toLocaleString(locale,  {month: "long"});

    return <>
        <div className="d-inline-flex flex-column calendar align-items-stretch">
            <p className="text-white text-center">{month}</p>
            <p className="h3 bg-white text-center flex-grow mb-0">{date}</p>
        </div>
    </>
}

const getDate = dt => {
    const date = dt.split('T')[0];
    let [hour, min] = dt.split('T')[1].split(':');
    hour = parseInt(hour);
    min = parseInt(min);
    let fhour = hour > 12 ? hour - 12 : hour;
    if (fhour == 0) fhour = 12;
    return <>
        <span>{date}</span><span className="ms-2">{hour >= 12 ? '오후' : '오전'} {fhour}시 {min != 0 && `${min}분`}</span>
    </>;
};

export default function Home() {
    const { dispatch } = useContext(UsersContext);

    useEffect(() => {
        getUsersFromServer().then(data => dispatch({ type: USERS.ALL, users: data }));
    }, []);

    return <>
        <main>
            <Weather />
            <section>
                <h2 className="section_title">New 추천 플레이스</h2>
                <ul className="d-flex gap-8 flex-wrap">
                    {places.map(({ id, thumbnail, name, category }) => (
                        <li key={id} className="d-flex flex-column" style={{ flex: 1 }}>
                            <Link to="/" className="image-square" style={{ backgroundImage: `url('${thumbnail}')` }} />
                            <p className="ps-1 pt-1">{name}</p>
                            <small className="ps-1 text-gray">{category}</small>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="section_title">지금 핫한 우리 동네 피드</h2>
                <ul className="list-group full">
                    {feeds.map(({ id, title, comments, inter, author, profile_image }) => (
                        <li className="list-group-item list-group-item-action pt-3 pb-3 d-flex align-items-start gap-20" key={id}>
                            <ProfileImg small src={profile_image} />
                            <div className="flex-grow d-flex flex-column">
                                <b>{author}</b>
                                <Link to={`/feed/${id}`} className="text-truncate d-inline-block" style={{ maxWidth: 400 }}>{title}</Link>
                                <span className="mt-1">
                                    <i className="fas fa-heart text-gray" /> <small className="text-gray me-3">{inter}</small>
                                    <i className="fas fa-comment text-gray" /> <small className="text-gray">{comments}</small>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="section_title">동네 모임에 참여해보세요!</h2>
                <ul className="list-group full">
                    {join.map(({ id, subject, date, max, party }) => (
                        <li key={id} className="list-group-item d-flex align-items-center pt-3 pb-3 gap-20" style={{ flex: 1 }}>
                            {makeCalendar(date)}
                            <div className="d-flex flex-column flex-grow">
                                <span className="text-truncate d-inline-block mb-1" style={{ maxWidth: '100%' }}>{subject}</span>
                                <small className="text-gray"><i className="fas fa-calendar-check me-1" /> {getDate(date)}</small>
                            </div>
                            <div className="d-flex flex-column">
                                <small className="text-gray text-right text-nowrap" style={{ fontSize: 12 }}>지원 {party}명 / {max}명</small>
                                <Link to={`/join/${id}`} className="btn btn-outline-primary btn-sm mt-1">지원</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    </>
}