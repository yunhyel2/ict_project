import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OverlayPage, getDate } from "/components";
import ProfileImg from "/components/ProfileImg";
import Comment from './components/Comment';
import FeedCommentWrite from "./components/CommentWrite";


const dummy = { 
    "id": 1,
    "content": "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ",
    "inter": 43,
    "comments": [
        { id: 1, user: { id: 2, "name": "test" }, content: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" },
        { id: 2, user: { id: 3, "name": "test" }, content: "바빠보이시네요..." },
        { id: 3, user: { id: 4, "name": "test" }, content: "ㅠㅠㅠㅠㅠㅠ저도사람너무많아서 나왔어요" },
    ],
    user: { "name": "김예원", "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlTt-WYZNlqqG2IVptc_QFuwJS_rqWYHi-J1x-X1v7H_hNqgmBNoW6fJAsKEEZP7T9RQQ&usqp=CAU" },
    createdAt: new Date().toISOString()
};

export default function DetailFeed() {
    const [feed, setFeed] = useState(dummy);
    const { id } = useParams();
    const { content, comments = [], inter, user: { name: username, profileImage }, image, createdAt } = feed;

    useEffect(() => {
        /* TODO:: 여기서 객체 불러와서 저장하기 */
    }, []);

    return <>
        <OverlayPage title="오늘의 피드">
            <div className="d-flex p-3 pt-2 pb-2 align-items-center gap-20">
                <ProfileImg small src={profileImage} />
                <b>{username}</b>
                <p className="d-flex flex-grow align-items-center justify-content-end gap-8 ms-auto">
                    <small className="text-gray">{getDate(createdAt)}</small>
                </p>
            </div>
            <div className="p-20 flex-grow d-flex flex-column border-top border-bottom border-gray" style={{ minHeight: 300, borderWidth: '8px !important' }}>
                <p style={{ maxWidth: 400 }}>{content}</p>
                {image && <img src={image} width="100%" height="auto" className="mt-2 border-radius-12" alt="" />}
            </div>
            <div className="p-3 d-flex align-items-center justify-between border-bottom border-gray">
                <span>댓글</span>
                <div className="d-flex flex-grow align-items-center justify-content-end gap-8 ms-auto">
                    <button to={`/feed/${id}`} className="btn btn-none p-1 d-inline-flex align-items-center gap-2">
                        <img src="/assets/icons/heart.png" width="24px" height="auto" alt="" />
                        <span>{inter}</span>
                    </button>
                    <span className="btn btn-none p-1 d-inline-flex align-items-center gap-2 cursor-auto">
                        <img src="/assets/icons/comment.png" width="24px" height="auto" alt="" />
                        <span>{comments.length}</span>
                    </span>
                </div>
            </div>
            {/* 코멘트를 불러와서 뿌려주기 */}
            <ul className="list-group full">
                {comments.map(comment => <Comment key={comment.id} {...comment} />)}
            </ul>
            <div style={{ height: 60 }} />
            <FeedCommentWrite />
        </OverlayPage>
    </>
}
