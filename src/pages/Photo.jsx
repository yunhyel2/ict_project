import axios from "axios";
import { useEffect, useState } from "react"
import { URL } from "../config/constants";
import { useInView } from "react-intersection-observer";
import SpinLoading from "../components/SpinLoading";

async function getPhotosFromServer(albumId) {
    const res = await axios.get(`${URL.PHOTOS}?albumId=${albumId}`);
    return res.data;
}

export default function Photo() {
    //  <<  패치한 사진 데이터 저장용 State  >>
    const [photos, setPhotos] = useState([]);
    //  <<  패치중일때 로딩 화면 보여주기 위한 State(옵션)  >>
    const [loading, setLoading] = useState(true);
     //  <<  무한 스크롤 구현  >>
    //  https://github.com/thebuilder/react-intersection-observer
    //  npm install react-intersection-observer
    //  모니터링할 속성
    const [albumId, setAlbumId] = useState(1);

    //  <<  무한 스크롤링 미적용시  >>
    //  albumID 수정을 위한 useEffect() 훅
    useEffect(() => {
        getPhotosFromServer(albumId)
        .then(res => {
            const phs = res.map(ph => ({
                 ...ph,
                 url: ph.url.replace('via.placeholder.com', 'placehold.co')+'/png', 
                 thumbnailUrl: ph.thumbnailUrl.replace('via.placeholder.com', 'placehold.co')+'/png'
            }))
            console.log(`<< 앨범 아이디 ${albumId}번인 포토 목록 >>\n${phs}`);
            //  1) 네트워크에서 패치한 데이터로 State인 Photos 변경
            setPhotos(prev => [...prev, ...phs]);
            //  2) 로딩 화면 숨기기 (데이터 가져오기 완료 - 옵션)
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, [albumId]);

    //  useInView 훅 함수는 배열을 반환한다.
    //  ref : 모니터링 하고자하는 DOM요소에 할당할 ref객체.
    //        # 패치한 아이템의 마지막 요소에 할당한다.
    //  inView : ref를 할당한 요소가 보이면 true, 안 보이면 false 값을 갖는 변수로 자동으로 변한다.
    const [targetRef, inView] = useInView();

    useEffect(() => {
        if (inView) {
            setLoading(true);
            setAlbumId(albumId+1);
        }
    }, [inView]);


    
    console.log('ref: %O / inView: %O / albumID: %O', targetRef, inView, albumId);

    return <>
        <div className="p-5 bg-success text-white rounded mb-2">
            <h1>사진 목록</h1>
        </div>

        {/*     마지막 DOM요소에 ref를 바인딩 한다.   */}
        {photos.map((photo, idx) => (
            <div className="card mt-2" key={idx} {...idx===photos.length-1 && { ref: targetRef }}>
                {/*     마지막 요소가 화면안에 들어오면 inView가 true가 된다.   */}
                <div className="card-header bg-warning">{photo.title} <span className="badge bg-dark">{photo.id}</span></div>
                <div className="card-body">
                    <img src={photo.thumbnailUrl} className="img-thumbnail" alt={photo.thumbnailUrl} />
                </div>
                <div className="card-footer bg-danger" style={{cursor:'pointer'}} >{photo.url}</div>
            </div>
        ))}
        {loading && <SpinLoading />}
        
    </>
}