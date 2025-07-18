import { useEffect, useRef, useState } from "react"
import { Link, Outlet } from "react-router-dom";
import { URL } from "/config/constants";
import { useAuth } from "/context/AuthContext";
import { getMapfromAddress, setMarkerfromAddress } from "/components/Map";


export default function Places({ places }) {
    const { auth: { location } } = useAuth();
    const [map, setMap] = useState(null);
    const [clickedMap, setClickedMap] = useState({});
    const mapRef = useRef();

    useEffect(() => {
        // 사용자 주소로 지도 불러오기
        getMapfromAddress(mapRef.current, location, (m) => {
            setMap(m);
        });
    }, [location]);

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