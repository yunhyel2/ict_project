import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FeedsContext } from "/context/FeedsContext";
import { OverlayPage } from "/components";
import ProfileImg from "/components/ProfileImg";
import Comment from './components/Comment';
import FeedCommentWrite from "./components/CommentWrite";


export default function DetailFeed() {
    const { id } = useParams();
    const { model, dispatch } = useContext(FeedsContext);
    const { feeds = [] } = model;
    const { title, comments, inter, author, profile_image, image, postDate } = feeds[1];

    console.log(id);
    return <>
        <OverlayPage title="오늘의 피드">
            <div className="d-flex p-3 pt-2 pb-2 align-items-center gap-20">
                <ProfileImg small src={profile_image} />
                <b>{author}</b>
                <p className="d-flex flex-grow align-items-center justify-content-end gap-8 ms-auto">
                    {postDate}
                </p>
            </div>
            <div className="p-20 flex-grow d-flex flex-column border-top border-bottom border-gray" style={{ borderWidth: '8px !important' }}>
                <p style={{ maxWidth: 400 }}>{title}</p>
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
                        <span>{comments}</span>
                    </span>
                </div>
            </div>
            {/* 코멘트를 불러와서 뿌려주기 */}
            <ul className="list-group full">
                <Comment author="test1" title="ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" />
                <Comment author="test2ddd" title="바빠보이시네요..."  />
                <Comment author="test3" title="ㅠㅠㅠㅠㅠㅠ저도사람너무많아서 나왔어요"  />
            </ul>
            <div style={{ height: 60 }} />
            <FeedCommentWrite />
        </OverlayPage>
    </>
}
