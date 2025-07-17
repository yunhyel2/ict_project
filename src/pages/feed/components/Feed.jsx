import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDate } from '/components';
import ProfileImg from '/components/ProfileImg';
import { URL } from '/config/constants';
import { useAuth } from '/context/AuthContext';
import { toggleLike, getLikeCount, isLikedByUser } from '/services/feeds';

export default function Feed({ feed, isSimple }) {
    const { id, content, user, image, createdAt, likeCount = 0, commentCount = 0 } = feed;
    const username = user?.name || '알 수 없음';
    const profileImage = user?.profileImage || '/assets/icons/empty_profile.svg';
    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const [likes, setLikes] = useState(likeCount);
    const [isLiked, setIsLiked] = useState(false);
    
    useEffect(() => {
        if (auth.id) {
            isLikedByUser(id, auth.id).then(setIsLiked);
        }
    }, [id, auth.id]);
    
    const handleLike = async (e) => {
        e.preventDefault();
        e.stopPropagation();
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

    return <>
        <li role="button" onClick={() => navigate(`${URL.FEED}/${id}`)} className="list-group-item list-group-item-action pt-2 pb-3 d-flex align-items-start gap-20" key={id}>
            <ProfileImg small src={profileImage} />
            <div className="flex-grow d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center pt-1 pb-1">
                    <b>{username}</b>
                    <small className="text-gray" style={{ fontSize: 12 }}>{getDate(createdAt)}</small>
                </div>
                <p style={{ maxWidth: 400 }}>{content}</p>
                {!isSimple && image && <img src={image} width="100%" height="auto" className="mt-2 border-radius-12" alt="" />}
                <div className="mt-3 d-flex align-items-center gap-8">
                    <button 
                        className="border-0 bg-transparent p-0 d-inline-flex align-items-center gap-1"
                        onClick={handleLike}
                    >
                        <img 
                            src={isLiked ? "/assets/icons/heart_filled.png" : "/assets/icons/heart.png"} 
                            width="18px" 
                            height="auto" 
                            alt="" 
                        />
                        <small className="me-2">{likes}</small>
                    </button>
                    <span className="border-0 bg-transparent p-0 d-inline-flex align-items-center gap-1">
                        <img src="/assets/icons/comment.png" width="18px" height="auto" alt="댓글" />
                        <small>{commentCount}</small>
                    </span>
                </div>
            </div>
        </li>
    </>
}
