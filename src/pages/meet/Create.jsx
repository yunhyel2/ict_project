import { useRef, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import { OverlayPage } from "/components";
import { URL } from "/config/constants";
import { createMeet } from "/services/meets";
import { useAuth } from "/context/AuthContext";

export default function CreateMeet() {
 
    const { setMeets } = useOutletContext();
  
    const now = new Date(Date.now() - (new Date().getTimezoneOffset() * 60000)).toISOString().substring(0,16);

    const navigate = useNavigate();
    const titleRef = useRef();
    const contentRef = useRef();
    const goalRef = useRef();
    const { account, name, location, locationId } = useAuth().auth; // auth = { account, location, name }
    const user = { account, name };
    //const { account , location } = useAuth().auth; //테스트 용 임시

    //<<유효성 체크 메시지 출력을 위한 State>>
    const [titleValid, setTitleValid] = useState('');
    const [contenteValid, setContentValid] = useState('');

    

    //<<게시글 등록 버튼 이벤트 처리용>>
    const handleInsert = e=>{
        e.preventDefault();//제출 기능 막기
        const titleNode = titleRef.current;
        const contentNode = contentRef.current;

        if(titleNode.value.trim()===''){
            setTitleValid('제목을 입력하세요');
            titleNode.focus();
           
        }
        if(contentNode.value.trim()===''){
            setContentValid('내용을 입력하세요');
            contentNode.focus();
            
        }
        if(titleNode.value.trim()==='' || contentNode.value.trim()==='') return;   
        const title = titleNode.value;
        const content = contentNode.value;
        const goal = goalRef.current.value;
        const meetAt = now;
        
        createMeet({ user, location:{ location, id: locationId }, title, content, meetAt, goal })
        .then(data=>{
            setMeets(prev=>[data , ...prev])
            alert("모집이 생성되었습니다");
            navigate(URL.JOINUS)
        })
        .catch(err=> {
            console.log(err);
            alert("모집생성에 실패했습니다.");
        })
    };
    
    return <>
        <OverlayPage title="모임/모집">
            <form method="POST" className="d-flex flex-column">
                <div className="p-3 border-bottom border-gray">
                    <input ref={titleRef} type="text" className="form-control border-0" id="feed_title" placeholder="제목을 입력하세요" name="title"/>
                    <small className="text-danger">{titleValid}</small>
                </div>
                <div className="p-3 border-bottom border-gray">
                    <textarea ref={contentRef} style={{resize: 'none'}} className="form-control border-0" rows="18" id="feed_content" name="content" placeholder="내용을 입력하세요"></textarea>
                    <small className="text-danger">{contenteValid}</small>
                </div>
                <div className="border-bottom border-gray d-flex align-items">
                    <div className="d-flex p-3 flex-grow border-right border-gray">
                        <label htmlFor="feed_date" className="align-self-center pe-2 text-nowrap">일시</label>
                        <div className="flex-grow">
                            <input id="feed_date" type="datetime-local" name="date" className="form-control" min={now} defaultValue={now} />
                        </div>
                    </div>
                    <div className="d-flex p-3" style={{ width: 260 }}>
                        <label htmlFor="feed_goal" className="align-self-center pe-2 text-nowrap">모집 인원</label>
                        <div className="flex-grow">
                            <input ref={goalRef} type="number" className="form-control" name="goal" id="feed_goal" min="0" max="99" />
                        </div>
                        <span className="align-self-center ps-2 text-nowrap">명</span>
                    </div>
                </div>
                <button className="btn btn-primary p-3 border-radius-0" onClick={handleInsert}>작성하기</button>
            </form>
        </OverlayPage>
    </>
}
