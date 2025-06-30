import { useRef, useState } from "react"
import { OverlayPage } from "/components";

export default function CreateFeed() {

    const titleRef = useRef();
    const contentRef = useRef();
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
    };
    
    return <>
        <OverlayPage title="오늘의 피드">
            <form method="POST">
                <div className="p-3 border-bottom border-gray">
                    <input ref={titleRef} type="text" className="form-control border-0" id="feed_title" placeholder="제목을 입력하세요" name="title"/>
                    <small className="text-danger">{titleValid}</small>
                </div>
                <div className="p-3 border-bottom border-gray">
                    <textarea ref={contentRef} style={{resize: 'none'}} className="form-control border-0" rows="18" id="feed_content" name="content" placeholder="내용을 입력하세요"></textarea>
                    <small className="text-danger">{contenteValid}</small>
                </div>
                <div className="p-3 border-bottom border-gray">
                    <label htmlFor="feed_image" className="btn btn-none">
                        <i className="fa-solid fa-image me-1" /> 사진
                    </label>
                    <input type="file" name="image" id="feed_image" className="invisible" accept="image/*" />
                </div>
                <div className="p-3 text-end">
                    <button className="btn btn-primary">작성하기</button>
                </div>
            </form>
        </OverlayPage>
    </>
}
