import { Link } from 'react-router-dom';
import ProfileImg from '/components/ProfileImg';
import { URL } from '/config/constants';

export default function Feed({ feed, isSimple }) {
    const { id, title, comments, inter, author, profile_image, image, postDate } = feed;

    return <>
        <li className="list-group-item list-group-item-action pt-3 pb-3 d-flex align-items-start gap-20" key={id}>
            <ProfileImg small src={profile_image} />
            <div className="flex-grow d-flex flex-column">
                <b>{author}</b>
                <p style={{ maxWidth: 400 }}>{title}</p>
                {!isSimple && image && <img src={image} width="100%" height="auto" className="mt-2 border-radius-12" alt="" />}
                <div className="mt-1" style={{ opacity: 0.5 }}>
                    <button to={`${URL.FEED}/${id}`} className="btn btn-none p-0 d-inline-flex align-items-center gap-1">
                        <img src="/assets/icons/heart.png" width="18px" height="auto" alt="" />
                        <small className="me-3">{inter}</small>
                    </button>
                    <Link to={`${URL.FEED}/${id}`} className="btn btn-none p-0 d-inline-flex align-items-center gap-1">
                        <img src="/assets/icons/comment.png" width="18px" height="auto" alt="" />
                        <small className="me-3">{comments}</small>
                    </Link>
                </div>
            </div>
        </li>
        {/* 코멘트 버튼 누르면 코멘트 불러와서 출력 */}
    </>
}
