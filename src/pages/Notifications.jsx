import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/context/AuthContext";
import ProfileImg from "/components/ProfileImg";
import { OverlayPage } from "/components";
import { getNotificationsByAccount } from "/services/notifications";


const dummy = [
    {
        id: 1,
        auser: { name: "윤혜리" },
        content: "[#user]님이 [#target]에 댓글을 남겼습니다.",
        target: "진짜 미쳤네요<br /> 날씨가 너무 더워요...ㅠ.ㅠ<br/> 개싫어진짜",
        link: "/feeds/1"
    },
    {
        id: 2,
        auser: { name: "윤혜리" },
        content: "[#user]님이 [#target]에 댓글을 남겼습니다.",
        target: "오늘 날씨가 좋아서 커피 한잔 했어요 ㅋㅋ<br>ㅋ<br>ㅋ",
        link: "/feeds/1"
    },
    {
        id: 3,
        auser: { name: "윤혜리" },
        content: "[#user]님이 [#target]에 댓글을 남겼습니다.",
        target: "아진심왤케춥지너무싫어요",
        link: "/feeds/1"
    }
];

export default function Notifications() {
    const [notifications, setNotifications] = useState(dummy);
    const { auth: { account } } = useAuth();

    useEffect(() => {
        /* TODO:: 알림 리스트 (읽든 안 읽든 전부 pagination 형태로) 가져오기 */
        if (!account) return;
        getNotificationsByAccount(account)
        .then((data) => {
            setNotifications(data);
        });
    }, [account]);

    if (!account) return null;
    
    return <>
        <OverlayPage title="알림">
            <ul className="flex-grow list-group overflow-y-auto border-none border-radius-0" style={{ margin: -2 }}>
                {notifications.map((notification) => <Notification {...notification} />)}
            </ul>
        </OverlayPage>
    </>
}

function Notification({ auser, content, target, link, isRead: isReadOrg }) {
    const [isRead, setIsRead] = useState(false);
    const navigate = useNavigate();
    const makeMessage = (str, user, target) => {
        const content = target.replace(/<br>|<br\/>|<br \/>/gi, "");
        str = str.replace("[#user]", `<b>${user.name}</b>`);
        str = str.replace("[#target]", `<b style="max-width: 280px; line-height: 1" class="d-inline-block text-truncate">${content}</b>`);
        return str;
    }

    const readNotification = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // api 콜
        setIsRead(true);
    };

    useEffect(() => {
        setIsRead(isReadOrg)
    }, [isReadOrg]);

    return <>
        <li className="p-3 list-group-item d-flex gap-20 list-group-item-action pointer align-items-center" style={{ opacity: isRead ? 0.5 : 1 }} onClick={() => navigate(link)}>
            <ProfileImg src={auser.profileImage} zoom={0.5} />
            <div className="flex-grow" dangerouslySetInnerHTML={{ __html: makeMessage(content, auser, target, link) }} />
            {!isRead && <button className="btn btn-sm btn-outline-secondary text-nowrap" onClick={readNotification}>읽음</button>}
        </li>
    </>
}