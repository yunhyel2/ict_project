import { Link } from 'react-router-dom';
import { getDate } from '/components';
import ProfileImg from '/components/ProfileImg';
import { URL } from '/config/constants';

export default function Feed({ feed, isSimple }) {
    const { id, content, comments, inter, user: { name: username, profileImage }, image, createdAt } = feed;

    return <>
        <li className="list-group-item list-group-item-action pt-2 pb-3 d-flex align-items-start gap-20" key={id}>
            <ProfileImg small src={profileImage} />
            <div className="flex-grow d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center pt-1 pb-1">
                    <b>{username}</b>
                    <small className="text-gray" style={{ fontSize: 12 }}>{getDate(createdAt)}</small>
                </div>
                <p style={{ maxWidth: 400 }}>{content}</p>
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
    </>
}
