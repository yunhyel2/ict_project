import ProfileImg from '/components/ProfileImg';

export default function Feed({ id, title, comments, inter, author, profile_image }) {

    return <>
        <li className="list-group-item list-group-item-action pt-2 pb-2 d-flex align-items-center gap-8" key={id}>
            <ProfileImg small src={profile_image} style={{ zoom: 0.8 }} />
            <b>{author}</b>
            <p style={{ maxWidth: 400 }}>{title}</p>
            <button className="btn btn-none">답글쓰기</button>
        </li>
    </>
}
