import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { URL } from "/config/constants";
import { OverlayPage, getDate } from "/components";
import ProfileImg from "/components/ProfileImg";
import { getFeedById, deleteFeedById, getComments, toggleLike, isLikedByUser } from "/services/feeds";
import { useAuth } from "/context/AuthContext";
import Comment from './components/Comment';
import FeedCommentWrite from "./components/CommentWrite";

export default function DetailFeed() {
    const { setFeeds } = useOutletContext();
    const [feed, setFeed] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadFeedData();
    }, [id]);

    const loadFeedData = async () => {
        try {
            setLoading(true);
            const [feedData, commentsData] = await Promise.all([
                getFeedById(id),
                getComments(id)
            ]);
            
            setFeed(feedData);
            setLikes(feedData.likeCount || 0);
            setComments(commentsData);
            
            if (auth.id) {
                const liked = await isLikedByUser(id, auth.id);
                setIsLiked(liked);
            }
        } catch (error) {
            console.error('피드 데이터 로딩 실패:', error);
            setFeed(null);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!auth.id) {
            alert('로그인이 필요합니다.');
            return;
        }
        
        try {
            const liked = await toggleLike(id, auth.id);
            setIsLiked(liked);
            setLikes(prev => liked ? prev + 1 : prev - 1);
        } catch (error) {
            console.error('좋아요 처리 실패:', error);
        }
    };

    const handleCommentAdded = () => {
        loadFeedData();
    };

    const handleCommentDeleted = () => {
        loadFeedData();
    };

    const deleteFeed = () => {
        deleteFeedById(id)
        .then((data) => {
            if (data.id) {
                alert("삭제되었습니다!");
                navigate(URL.FEED);
                setFeeds(prev => prev.filter(({id}) => data.id !== id)); // 아이디 같은 feeds를 찾아 리스트에서 삭제한다.
            }
        })
    }
    if (loading) {
        return <div className="d-flex justify-content-center p-4">로딩 중...</div>;
    }

    if (!feed) {
        return <div className="d-flex justify-content-center p-4">피드를 찾을 수 없습니다.</div>;
    }

    const { content, user, image, createdAt } = feed;
    const username = user?.name || '알 수 없음';
    const profileImage = user?.profileImage || '/assets/icons/empty_profile.svg';

    // 현재 로그인한 사용자가 해당 피드의 작성자인지 체크하는 변수
    const isAuthor = user?.account === auth.account;

    return <>
        <OverlayPage title="오늘의 피드" {...isAuthor && { onDelete: deleteFeed }}>
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
                    <button 
                        className="btn btn-none p-1 d-inline-flex align-items-center gap-2"
                        onClick={handleLike}
                    >
                        <img 
                            src={isLiked ? "/assets/icons/heart_filled.png" : "/assets/icons/heart.png"} 
                            width="24px" 
                            height="auto" 
                            alt="좋아요" 
                        />
                        <span>{likes}</span>
                    </button>
                    <span className="btn btn-none p-1 d-inline-flex align-items-center gap-2 cursor-auto">
                        <img src="/assets/icons/comment.png" width="24px" height="auto" alt="댓글 수" />
                        <span>{comments.length}</span>
                    </span>
                </div>
            </div>
            {/* 코멘트를 불러와서 뿌려주기 */}
            <ul className="list-group full">
                {comments.map(comment => (
                    <Comment 
                        key={comment.id} 
                        {...comment} 
                        onCommentDeleted={handleCommentDeleted}
                    />
                ))}
            </ul>
            <div style={{ height: 60 }} />
            <FeedCommentWrite onCommentAdded={handleCommentAdded} />
        </OverlayPage>
    </>
}
