import ProfileImg from '/components/ProfileImg';

/* TODO:: 현재 로그인 사용자가 이 코멘트에 좋아요를 찍었는가? 체크하여 버튼 이벤트/디스플레이 처리 (table : comments_like) */
/* TODO:: 현재 로그인 사용자가 이 코멘트를 작성했는가?를 체크하여 좋아요 버튼 대신 삭제버튼을 추가한다. */
export default function FeedComment({ id, content, user }) {

    const { id: userId, name: username, profileImage } = user;

    return <>
        <li className="p-2 ps-3 border-bottom border-gray d-flex align-items-start gap-20" key={id}>
            <div className="d-flex align-items-center gap-8" style={{ height: 30 }}>
                <ProfileImg small src={profileImage} zoom={0.6} />
                <small style={{ lineHeight: 1 }}>{username}</small>
            </div>
            <div className="flex-grow small pt-1" style={{ maxWidth: 400 }}>
                {content}
            </div>
            <div className="d-flex align-items-center gap-8" style={{ height: 30 }}>
                <button className="btn btn-none p-1 d-flex align-self-center">
                    <img src="/assets/icons/heart.png" width="20px" alt="" />
                </button>
                {/* <button className="btn btn-none p-1"><i className="fas fa-reply text-gray" /></button> */}
            </div>
        </li>
    </>
}
