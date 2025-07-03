var geocoder = geocoder;
let coords;

if (!geocoder) {
    try {
        geocoder = new kakao.maps.services.Geocoder()
    } catch(e) {
        console.log(e);
    };
}

// 주소로 좌표 검색 :: 카카오 좌표 객체 리턴
export function getCoordsfromAddress(address) {
    return geocoder.addressSearch(address, function(result, status) {

    // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
            return new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        } 
        return null;
    });    
}


export function getMyAddressNow(success) {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng} }) => {
        // 좌표로 행정동 주소 정보를 가져옴
        geocoder.coord2RegionCode(lng, lat, (res) => {
            const { address_name: address } = res[0];
            success({ address, lat, lng });
        });
    })
}

export function getKakaoMap(map, {lat, lng}) {
    return new kakao.maps.Map(map, { 
        center: new kakao.maps.LatLng(lat, lng)
    });
}

export function setMarker(map, { lat, lng, content }) {
    var tooltip
    var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng)
    });
    marker.setMap(map);
    if (content) {
        tooltip = new kakao.maps.InfoWindow({
            content : `<div style="width:150px;word-break:keep-all;text-align:center;padding:6px 0;">${content}</div>`,
            // removable: true
        });
        kakao.maps.event.addListener(marker, 'mouseover', () => tooltip.open(map, marker));
        kakao.maps.event.addListener(marker, 'mouseout', () => tooltip.close());
    }
    //  아래 코드는 지도 위의 마커를 제거하는 코드입니다
    //  marker.setMap(null);
}
