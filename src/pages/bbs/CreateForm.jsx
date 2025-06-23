import axios from "axios";
import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { BBS, URL } from "../../config/constants";
import { UsersContext } from "../../context/UsersContext";
import { BBSContext } from "../../context/BbsContext";


export default function CreateForm () {
    const titleRef = useRef();
    const contentRef = useRef();
    const navigate = useNavigate();
    const { usersInfo: { auth } } = useContext(UsersContext);
    const { dispatch } = useContext(BBSContext);

    /*   유효성 체크 메시지 출력을 위한 State   */
    const [titleValid, setTitleValid] = useState('');
    const [contentValid, setContentValid] = useState('');
    //  <<  게시글 등록 버튼 이벤트 처리용  >>
    const onCreate = e => {
        e.preventDefault();     // 제출 기능 막기
        const title = titleRef.current.value.trim();
        const content = contentRef.current.value.trim();

        if (title === '') {
            setTitleValid('제목을 입력하세요');
            titleRef.current.focus();
            return;
        }
        if (content === '') {
            setContentValid('내용을 입력하세요');
            contentRef.current.focus();
            return;
        }
        if (title && content) {
            // 글 등록하기
            //  << 데이타 등록하기 >>
            //  ※ 최신 버전의 JSON-SERVER(API SERVER)의 id는 문자열이다.
            //  반드시 문자열로 변환해줘야
            //  GET /posts/:id 요청시 404 에러(Not Found)가 안 난다
            axios.post(URL.BBS, { 
                title,
                content,
                username: auth,
                postDate: new Date().toLocaleString(),
                views: 0
            })
            .then(() => {
                dispatch({ type: BBS.WRITE })
                navigate("/bbs");
            })
            .catch((e) => { console.log(e); })
        }
    };

    return <>
        <div className="p-5 bg-warning text-white rounded">
            <h1>게시판 등록</h1>
        </div>
        <form>
            <div className="mb-3 mt-3">
                <label htmlFor="title" className="form-label">제목</label>
                <input ref={titleRef} type="text" className="form-control" id="title" placeholder="제목을 입력하세요" name="title" />
                {/*     제목 유효성 체크 메시지 표시용 SPAN 컴포넌트    */}
                <span style={{ color:'#FF0000' }}>{titleValid}</span>
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">내용</label>
                {/*     ※ JSX에서는 textarea의 컨텐츠를 value 속성으로 설정     */}
                <textarea ref={contentRef} className="form-control" rows="5" id="content" name="content" placeholder="내용을 입력하세요"></textarea>
                {/*     내용 유효성 체크 메시지 표시용 SPAN 컴포넌트    */}
                <span style={{ color:'#FF0000' }}>{contentValid}</span>
            </div>
            <button type="submit" className="btn btn-primary" onClick={onCreate}>등록</button>
        </form>
    </>
}