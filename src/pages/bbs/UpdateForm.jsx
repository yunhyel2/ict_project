import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../config/constants";


export default function UpdateForm () {

    const navigate = useNavigate();
    // URL 파라미터로 글의 키값(ID)를 받아서 원격에 해당 글 ID로 요청해도 무방
//  const params = useParams();
    // 혹은 useNavigate로 이동시 수정하려는 글 전체를 "state" 키로 전달해도 무방
    // 단, 이때는 글 ID로 수정할 글을 요청할 필요 없다.
    const { state } = useLocation();

    // 에러 메시지를 뿌려주기 위한 Span Ref객체 생성
    const titleSpanRef = useRef();
    const contentSpanRef = useRef();

    // 수정 컴포넌트는 입력요소의 값들을 State로 관리 (입력 컴포넌트는 Ref로 제어했음)
    const [form, setForm] = useState(state);
    // 입력 요소의 change 이벤트 처리
    const changeValue = (e) => {
        const { name, value } = e.target;
        if (name.toUpperCase() === 'TITLE') {
            if (e.target.value.trim().length === 0) titleSpanRef.current.textContent = "제목을 입력하세요.";
            else titleSpanRef.current.textContent = "";
        }
        if (name.toUpperCase() === 'CONTENT') {
            if (e.target.value.trim().length === 0) contentSpanRef.current.textContent = "내용을 입력하세요.";
            else contentSpanRef.current.textContent = "";
        }
        setForm(prev => ({ ...prev, [name]: value }));
    };
    
    // JSON-SERVER로 수정 요청 후에 상세보기로 이동
    // 수정 버튼 이벤트 처리용
    const onSubmit = e => {
        e.preventDefault();
        if (form.title.trim().length === 0) {
            alert("수정하려면 반드시 제목을 입력하세요");
            return;
        }
        if (form.content.trim().length === 0) {
            alert("수정하려면 반드시 내용을 입력하세요");
            return;
        }
        // eslint-disable-next-line no-unused-vars
        const { name, ...newForm } = form;  // name 빼고 전달 (작성자 이름은 내가 수동으로 추가한 value이기 때문 - 백엔드에서 쳐내는 경우 상관없다.)
        axios.put(`${URL.BBS}/${form.id}`, newForm)
        .then(() => {
            alert("수정되었습니다!");
            navigate(`/bbs/${form.id}`);
        })
        .catch(e => alert("수정에 문제가 발생하였습니다.\n 에러 : "+e.message));
    }

    return <>
        <div className="p-5 bg-warning text-white rounded">
            <h1>게시판 수정</h1>
        </div>
        <form>
            <div className="mb-3 mt-3">
                <label htmlFor="title" className="form-label">제목</label>
                {/*     ※ value={state.title} 코드로 입력 내용 뿌려주면 읽기 전용이 된다 즉 쓰기가 가능하려면 입력값을 State로 관리해야 한다     */}
                <input value={form.title} type="text" className="form-control" id="title" placeholder="제목을 입력하세요" name="title" onChange={changeValue} />
                {/*  유효성 체크 메시지 표시용 SPAN컴포넌트  */}
                <span ref={titleSpanRef} style={{color:'#FF0000'}}></span>
            </div>
            <div className="mb-3">
                <label htmlFor="content">내용</label>
                {/*     JSX에서는 textarea의 컨텐츠를 value속성으로 설정    */}
                <textarea className="form-control" rows="5" id="content" name="content" placeholder="내용을 입력하세요" value={form.content} onChange={changeValue}></textarea>
                {/*     유효성 체크 메시지 표시용 SPAN컴포넌트      */}
                <span ref={contentSpanRef} style={{color:'#FF0000'}}></span>
            </div>
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>수정</button>
            <button type="cancel" className="btn btn-secondary m-2" onClick={(e) => {e.preventDefault(); navigate(-1);}}>취소</button>
        </form>
    </>
}