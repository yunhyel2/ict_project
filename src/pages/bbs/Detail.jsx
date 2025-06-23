import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AUTH_KEY, BBS, URL } from "../../config/constants";
import NotFound from "../NotFound";
import { UsersContext } from "../../context/UsersContext";
import { BBSContext } from "../../context/BbsContext";

export default function Detail() {
    const navigate = useNavigate();
    const { usersInfo: { auth } } = useContext(UsersContext);
    const { dispatch } = useContext(BBSContext);

    //  1. URL파라미터로 넘어오는 게시글의 키(id)값 얻기
    const params = useParams();

    //  <<  조회한 글 내용 및 작성자명을 담을 State  >>
    const [post, setPost] = useState({
        id: "",
        title: "",
        content: "",
        username: "",
        postDate: "",
        views: "",
        name: ""    // 작성자 이름
    });

    useEffect(() => {
        const fetchPost = async () => {
            const { data: post } = await axios.get(`${URL.BBS}/${params.id}`);
            const { data: user } = await axios.get(`${URL.USERS}?${AUTH_KEY.USERNAME}=${post.username}`);
            return { ...post, name: user[0].name };
        };
        fetchPost().then(data => {
            // 데이터 가져와지면 조회수 증가 수정 call  [TODO:: 중복 조회를 체크해야하는가?]
            axios.put(`${URL.BBS}/${params.id}`, { ...data, views: data.views+1 })
            .then(() => {
                setPost({ ...data, views: data.views + 1 });
            })
        });
    }, []);

    if (!post.id) return <NotFound />;

    // 본인글인지 체크
    const onDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`${URL.BBS}/${params.id}`)
            .then(() => { 
                dispatch({ type: BBS.DELETE });
                navigate("/bbs");
             })
            .catch((e) => { console.log(e); })
        }
    };

    return <>
        <div className="p-5 bg-warning text-white rounded">
            <h1>게시판 상세</h1>
        </div>
        <table className="table table-bordered mt-3">
            <tbody>
                <tr>
                    <th className="w-25 text-center bg-dark text-white">번호</th>
                    <td>{post.id}</td>
                </tr>
                <tr>
                    <th className="w-25 text-center bg-dark text-white">글쓴이</th>
                    <td>{post.name}</td>
                </tr>
                <tr>
                    <th className="w-25 text-center bg-dark text-white">작성일</th>
                    <td>{post.postDate}</td>
                </tr>
                <tr>
                    <th className="w-25 text-center bg-dark text-white">제목</th>
                    <td>{post.title}</td>
                </tr>
                <tr>
                    <th className="w-25 text-center bg-dark text-white">조회수</th>
                    <td>{post.views}</td>
                </tr>
                <tr>
                    <th className="text-center bg-dark text-white" colSpan="2">내용</th>
                </tr>
                <tr>
                    {/*
                        ※https://reactjs.org/docs/dom-elements.html
                        XSS공격을 막기 위해 자바스트립트 코드로 '\n'을 '<br/>'문자열로
                        변경시 태그가 아닌 문자열("<br/>")로 렌더링
                    */}
                    {/* <td colSpan="2">{bbs.content.replace('\n','<br/>')}</td> */}
                    {/* \n으로 split한 배열에 map을 적용해서 콜백함수에서 내용들을 JSX로 리턴 */}
                    <td colSpan="2">
                        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/gi, '<br/>') }}></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div className="text-center mb-5">
            {/* 수정 폼으로 조회한 게시글 전달({ state: bbs }) : 수정 폼에서는 useLocation() 훅으로 받는다 */}
            {auth === post.username && (
                <>
                    <button className="btn btn-success" onClick={() => navigate(`/bbs/form/${post.id}`, { state: post })} >수정</button>
                    <button className="btn btn-success mx-2" onClick={onDelete}>삭제</button>
                </>
            )}

            {/* naviget()함수로 페이지 전환 */}
            <button className="btn btn-success" onClick={() => navigate('/bbs')}>목록(button)</button>
            {/* Link컴포넌트로 페이지 전환 */}
            <Link to="/bbs" className="btn btn-warning ms-2">목록(Link)</Link>
        </div>
    </>
}