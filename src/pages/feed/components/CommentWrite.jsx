import ProfileImg from '/components/ProfileImg';

export default function FeedCommentWrite() {

    const parentId = '';    // 해당 피드 아이디(부모)
    const userId = '';    // 로그인 된 유저 아이디(고유키)
    const profile_image = '';   // 로그인 된 유저 프로필 이미지
    const author = '';  // 로그인 된 유저 이름

    return <>
        <div className="p-2 ps-3 border-top border-gray position-absolute bg-white" style={{ width: '100%', bottom: 0, left: 0 }}>
            <form className="d-flex small pt-1 gap-8">
                <input type="hidden" name="parent_id" value={parentId} />
                <input type="text" name="content" className="form-control border-radius-20" style={{ fontSize: 14 }} />
                <input type="hidden" name="user_id" value={userId} />
                <button className="btn btn-primary btn-sm text-nowrap p-2 border-radius-20" style={{ minWidth: 40, height: 40 }}>
                    <i className="fas fa-paper-plane" style={{ fontSize: 16 }} />
                </button>
            </form>
        </div>
    </>
}
