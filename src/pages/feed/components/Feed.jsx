import { Link } from 'react-router-dom';
import ProfileImg from '/components/ProfileImg';

export default function Feed({ id, title, comments, inter, author, profile_image }) {

    return <>
        <li className="list-group-item list-group-item-action pt-3 pb-3 d-flex align-items-start gap-20" key={id}>
            <ProfileImg small src={profile_image} />
            <div className="flex-grow d-flex flex-column">
                <b>{author}</b>
                <p style={{ maxWidth: 400 }}>{title}</p>
                <span className="mt-1">
                    <i className="fas fa-heart text-gray" /> <small className="text-gray me-3">{inter}</small>
                    <i className="fas fa-comment text-gray" /> <small className="text-gray">{comments}</small>
                </span>
            </div>
        </li>
        {/* 코멘트 버튼 누르면 코멘트 불러와서 출력 */}
    </>
}
