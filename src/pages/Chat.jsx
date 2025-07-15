import { useRef } from "react"
import ProfileImg from "/components/ProfileImg";
import classes from "./Chat.module.scss";

export default function Chat({ onClose }) {
    const chatRef = useRef();
    const makeNotice = (message) => <div className={classes.notice}>{message}</div>;
    const makeMessage = (type, message, user = {}) => <>
        <div className={classes[type]}>
            <div className="d-inline-flex align-items-center">
                <ProfileImg src={user.ProfileImage} zoom={0.25} />
                <span className={classes.username}>{user.name}</span>
            </div>
            <div className={classes.message}>{message}</div>
        </div>
    </>

    return <>
        <div className={`flex-grow d-flex flex-column mt-4 border border-radius-12 border-gray bg-white overflow-hidden ${classes.chat}`}>
            <div className="d-flex p-1 bg-point align-items-center justify-content-between">
                <p className="text-white h6 ps-4 m-0">실시간 채팅방</p>
                <button className="btn btn-none p-2 pe-3" onClick={onClose}>
                    <i className="fas fa-xmark text-white h5 m-0" />
                </button>
            </div>
            <div ref={chatRef} className="flex-grow d-flex flex-column pt-2 pb-2 ps-3 pe-3 overflow-y-auto">
                {makeNotice("test 님이 입장했습니다.")}
                {makeMessage("receive", "안녕하세용~~~", { name: "테스트1" })}
                {makeMessage("send", "반갑습니다.", { name: 'test' })}
                {makeMessage("receive", "뭐하세요?", { name: '테스트3' })}
                {makeMessage("receive", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", { name: '테스트2' })}
                {makeMessage("receive", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", { name: '테스트2' })}
                {makeMessage("receive", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", { name: '테스트2' })}
                {makeMessage("receive", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", { name: '테스트2' })}
                {makeMessage("receive", "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", { name: '테스트2' })}
            </div>
            <div className="p-2 border-top border-gray d-flex small gap-8">
                <input type="text" name="content" className="form-control border-radius-20" style={{ fontSize: 14 }} />
                <button className="btn btn-primary btn-sm text-nowrap p-2 border-radius-20" style={{ minWidth: 40, height: 40 }}>
                    <i className="fas fa-paper-plane" style={{ fontSize: 16 }} />
                </button>
            </div>
        </div>
    </>
}