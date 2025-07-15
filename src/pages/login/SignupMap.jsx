import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import { getMyAddressNow, getKakaoMap, setMarker } from '/components/Map';
import { useAuth } from "/context/AuthContext";
import { updateUser } from "/services/users";
import { URL } from "/config/constants";

export default function SignupMap({ onConfirm = () => {} }) {
    const { auth, login } = useAuth();
    const { pathname } = useLocation();
    const [address, setAddress] = useState('');
    const mapRef = useRef();

    useEffect(() => {
        if (auth.location) return;
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

    const confirmRegister = () => {
        updateUser({ ...auth, address })
        .then((data) => {
            if (data?.id) login(data);
        });
    }

    return <>
        <div className="d-flex flex-column" style={{ minHeight: '100%' }}>
            <div className="border-bottom border-gray bg-white p-3">
                <input type="text" className="form-control border-gray p-3" name="address" value={address} readOnly />
            </div>
            <div ref={mapRef} id="map" className="flex-grow"></div>
            <button className="btn btn-primary p-3 border-radius-0" onClick={pathname != URL.REGISTER ? confirmRegister : confirmAddress}>이 동네로 시작하기</button>
        </div>
    </>
}