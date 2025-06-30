import { useEffect, useRef } from "react"
import { Link, Outlet } from "react-router-dom";
import { URL } from "/config/constants";

export default function Map() {
    const mapRef = useRef();
    let map;
    let markers = [];
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            //  1. 지도 생성
            map = getKakaoMap(lat, lng);
            //  2. 마커 생성
            setMarker(lat, lng, "한국 ICT 인재개발원");
        })
    }

    function getKakaoMap(lat, lng) {
        return new kakao.maps.Map(mapRef.current, { 
            center: new kakao.maps.LatLng(lat, lng)
            // mapTypeId: kakao.maps.MapTypeId.SKYVIEW
        });
    }

    function setMarker(lat, lng, content) {
        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lng)
        });
        marker.setMap(map);
        if (content) {
            var tooltip = new kakao.maps.InfoWindow({
                content : `<div style="width:150px;word-break:keep-all;text-align:center;padding:6px 0;">${content}</div>`,
                // removable: true
            });
            kakao.maps.event.addListener(marker, 'mouseover', () => tooltip.open(map, marker));
            kakao.maps.event.addListener(marker, 'mouseout', () => tooltip.close());
        }
        //  생성된 마커 객체를 배열에 저장
        markers.push({ 'marker': marker, 'tooltip': tooltip || null });
        //  아래 코드는 지도 위의 마커를 제거하는 코드입니다
        //  marker.setMap(null);
    }
    useEffect(() => {
        
    }, []);

    return <>
        <div ref={mapRef} id="map" style={{ minHeight: '100%' }}></div>
        <Link to={`${URL.OURPLACE}/create`} className="create_button" />
        <Outlet />
    </>
}