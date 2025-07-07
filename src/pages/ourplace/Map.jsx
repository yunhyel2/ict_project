import { useEffect, useRef, useState } from "react"
import { Link, Outlet } from "react-router-dom";
import { URL } from "/config/constants";
import { getMapfromAddress, setMarkerfromAddress } from "/components/Map";

const userAddress = '서울특별시 서초구 서초동';
const places = [
    {
      "id": 1,
      "name": "니뽕내뽕",
      "category": "중식",
      "address": "서울 강남구 강남대로98길 8 2,3층",
      "image": "https://ldb-phinf.pstatic.net/20250625_48/1750829385064N7Yu8_JPEG/%B0%F8%C5%EB1.jpg"
    },
    {
      "id": 2,
      "name": "스타벅스 강남에비뉴점",
      "category": "카페",
      "address": "서울 서초구 서초대로77길 62 강남역아이파크 B102~B105",
      "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png"
    },
    {
      "id": 3,
      "name": "참치한마리",
      "category": "일식",
      "address": "서울 서초구 사평대로57길 7 2층",
      "image": "https://ldb-phinf.pstatic.net/20200816_125/1597572467932URqql_JPEG/JLFPc4tceQ2DE1dEiTHwAOft.jpg"
    },
    {
      "id": 4,
      "name": "티유치과의원",
      "category": "병원",
      "address": "서울 서초구 서초대로77길 54 서초 더블유타워 12층, 13층 티유치과의원",
      "image": "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNDEyMjRfMjc2%2FMDAxNzM1MDA4NjExNTQ5.obnJGTbmKlAkUmGPs3bu5HiHNH1mX3sVmAC8ryihM6kg.5xnpWE_xQXrKuACKji3mBsCsr-DcMgAxRCAFZ-hUPk0g.JPEG%2FDE57EE19-1840-430D-88B4-0D1D48404956.jpeg%3Ftype%3Dw1500_60_sharpen"
    }
];

export default function Map() {
    const [map, setMap] = useState(null);
    const [clickedMap, setClickedMap] = useState({});
    const mapRef = useRef();

    useEffect(() => {
        // 사용자 주소로 지도 불러오기
        getMapfromAddress(mapRef.current, userAddress, (m) => {
            setMap(m);
        });
    }, []);

    useEffect(() => {
        if (!map) return;
        // TODO:: places db에서 불러와서 아래 코드 성공함수에 넣기
        places.map((place) => {
            setMarkerfromAddress(map, place.address, () => setClickedMap(place));
        })
    }, [map]);

    return <>
        <div ref={mapRef} id="map" style={{ minHeight: '100%' }}></div>
        <Link to={`${URL.OURPLACE}/create`} className="create_button" />
        <div className={`position-absolute bg-white bottom-window ${clickedMap.id ? 'active' : ''}`}>
            <div className="d-flex gap-8 align-items-center p-3 border-top border-gray">
                <button className="btn btn-sm close-btn" onClick={() => setClickedMap({})}><i className="fas fa-xmark" /></button>
                <div className="border border-gray border-radius-12" style={{ minWidth: 100, height: 100, background: `url('${clickedMap.image || ''}') center / cover no-repeat` }}></div>
                <div className="p-2 flex-grow">
                    <p className="h6 text-nowrap">{clickedMap.name || ''}</p>
                    <span className="text-gray text-nowrap">{clickedMap.category || ''}</span>
                    <p className="text-gray"><small>{clickedMap.address || ''}</small></p>
                </div>
            </div>
        </div>
        <Outlet />
    </>
}