import { useRef, useState } from "react"

export default function PostForm() {

    const titleRef= useRef();
    const contentRef=useRef();
    //<<유효성 체크 메시지 출력을 위한 State>>
    const [titleValid,setTitleValid]=useState('');
    const [contenteValid,setContentValid]=useState('');
    //<<게시글 등록 버튼 이벤트 처리용>>
    const handleInsert=e=>{
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
        <button class="btn p-0 m-0 text-decoration-none" onClick={onclick}>게시글의 주제를 선택해주세요.</button>
        <i class="fa-solid fa-chevron-right" style={{marginLeft:180, display: 'inline', cursor: 'pointer'}}  onClick={onclick}></i>
        <hr/>
        <i class="fa-solid fa-xmark" style={{cursor: 'pointer'}} onClick={onclick}></i>
        <li style={{marginLeft:180, display: 'inline'}}>글쓰기</li>
        <li style={{marginLeft:160, display: 'inline', cursor: 'pointer'}} onClick={onclick}>완료</li>
        <hr/>
    
        <form>
        <div className="mb-3 mt-3">
            <input ref={titleRef} type="text" className="form-control border-0" id="title" placeholder="제목을 입력하세요" name="title"/>
            <span style={{color:'#FF0000'}}>{titleValid}</span>
        </div>
        <hr/>
        <div className="mb-3">
            <textarea ref={contentRef} style={{resize: 'none'}} className="form-control  border-0" rows="18" id="content" name="content" placeholder="내용을 입력하세요"></textarea>
            <span style={{color:'#FF0000'}}>{contenteValid}</span>
        </div>
        </form>
        <i class="fa-solid fa-image" style={{marginLeft:20, display: 'inline', cursor: 'pointer'}}> 사진</i>
        <i class="fa-solid fa-compass" style={{marginLeft:20, display: 'inline', cursor: 'pointer'}}>장소</i>
        <i class="fa-solid fa-square-poll-vertical" style={{marginLeft:20, display: 'inline', cursor: 'pointer'}}> 투표</i>
        <i class="fa-solid fa-link" style={{marginLeft:20, display: 'inline', cursor: 'pointer'}}> 링크</i>
    
    </>
}
