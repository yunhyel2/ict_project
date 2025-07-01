import ProfileImg from '/components/ProfileImg';

export default function FeedComment({ id, title, author, profile_image }) {

    return <>
        <li className="p-2 ps-3 border-bottom border-gray d-flex align-items-start gap-20" key={id}>
            <div className="d-flex align-items-center gap-8" style={{ height: 30 }}>
                <ProfileImg small src={profile_image} zoom={0.6} />
                <small>{author}</small>
            </div>
            <div className="flex-grow small pt-1" style={{ maxWidth: 400 }}>
                {title}
            </div>
            <div className="d-flex align-items-center gap-8" style={{ height: 30 }}>
                <button className="btn btn-none p-1"><img src="/assets/icons/heart.png" width="20px" alt="" /></button>
                {/* <button className="btn btn-none p-1"><i className="fas fa-reply text-gray" /></button> */}
            </div>
        </li>
    </>
}
