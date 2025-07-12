import { Link } from "react-router-dom";
import ProfileImg from "/components/ProfileImg";
import StatusBar from "/components/StatusBar";
import Logo from "/components/Logo";
import { URL } from "/config/constants";
import { useAuth } from "/context/AuthContext";

export default function MyPage() {
    const { auth: { name: username, location } } = useAuth();
    return <>
        <StatusBar title="마이페이지" noBack />
        <section className="d-flex flex-column overflow-y-auto" style={{ minHeight: "100%", height: '100%', background: 'var(--gray-border-color)' }}>
            <div className="mb-2 d-flex gap-20 border-bottom border-gray align-items-center p-3 pt-4 pb-4 bg-white">
                <ProfileImg />
                <div className="flex-grow">
                    <p className="h5">{username} 님</p>
                    <p className="text-gray">{location}</p>
                </div>
                <Link to={URL.MYINFO} className="btn btn-none border-radius-20" style={{ width: 40, height: 40 }}>
                    <i className="fas fa-wrench" />
                </Link>
            </div>
            <ul className="bg-white">
                <li className="border-bottom border-gray p-4 pl-5 pointer d-flex justify-content-between align-items-center">
                    <span><img src="/assets/icons/menuIcon3.png" width="24px" className="me-2"/> 내가 추천한 플레이스</span>
                    <i className="fas fa-angle-right" />
                </li>
                <li className="border-bottom border-gray p-4 pl-5 pointer d-flex justify-content-between align-items-center">
                    <span><img src="/assets/icons/bookmark.png" width="24px" className="me-2"/> 북마크한 플레이스</span>
                    <i className="fas fa-angle-right" />
                </li>
                <li className="border-bottom border-gray p-4 pl-5 pointer d-flex justify-content-between align-items-center">
                    <span><img src="/assets/icons/menuIcon2.png" width="24px" className="me-2"/> 내가 작성한 글</span>
                    <i className="fas fa-angle-right" />
                </li>
                <li className="border-bottom border-gray p-4 pl-5 pointer d-flex justify-content-between align-items-center">
                    <span><img src="/assets/icons/menuIcon4.png" width="24px" className="me-2"/> 내가 작성한 모집글</span>
                    <i className="fas fa-angle-right" />
                </li>
            </ul>
            <br/>
            <div className="p-3 pt-4">
                <Logo />
                <br/>
                <small className="text-gray">
                    © 2024 서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ) <br/>
                    <a className="text-gray" target="_blank" href="https://ictedu.co.kr">한국 ICT 인재개발원</a> 
                    
                    <br/><br/>
                    icon by. <a className="text-gray" href="https://www.flaticon.com/kr/authors/arkinasi" target="_blank">arkinasi</a>
                </small>		
            </div>	
        </section>
    </>;
}