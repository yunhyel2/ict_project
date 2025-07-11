import { useEffect, useRef, useState } from "react"
import { getMyAddressNow, getKakaoMap, setMarker } from '/components/Map';

export default function SignupMap({ onConfirm }) {
    const [address, setAddress] = useState('');
    const mapRef = useRef();

    useEffect(() => {
        getMyAddressNow(({ address: adrs, lat, lng }) => {
            setAddress(adrs);
            const map = getKakaoMap(mapRef.current, { lat, lng });
            setMarker(map, { lat, lng });
        });
    }, []);

    const confirmAddress = e => {
        e.preventDefault();
        onConfirm(address);
    }

    return <>
        <div className="d-flex flex-column" style={{ minHeight: '100%' }}>
            <div className="border-bottom border-gray bg-white p-3">
                <input type="text" className="form-control border-gray p-3" name="address" value={address} readOnly />
            </div>
            <div ref={mapRef} id="map" className="flex-grow"></div>
            <button className="btn btn-primary p-3 border-radius-0" onClick={confirmAddress}>이 동네로 가입하기</button>
        </div>
    </>
}