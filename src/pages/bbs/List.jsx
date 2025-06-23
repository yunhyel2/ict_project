import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Pagination from "rc-pagination";
import ko_KR from "rc-pagination/lib/locale/ko_KR";
import { URL, BBS_PAGING, BBS } from "../../config/constants";
import Loading from "../../components/Loading";
import Failure from "../../components/Failure";
import { BBSContext } from "../../context/BbsContext";


async function getPostsFromServer (page) {
    const res = await axios.get(`${URL.BBS}?_sort=-postDate&_per_page=${BBS_PAGING.PAGESIZE}&_page=${page}`);  // -는 내림차순
    return res.data;
}

export default function List() {
    const { bbsModel: { nowPage, totalSize, posts }, dispatch } = useContext(BBSContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 전체 글 목록 가져오기
        getPostsFromServer(nowPage)
        .then(data => {
            dispatch({ type: BBS.ALL, posts: data.data })
            setLoading(false);
        })
        .catch(err => {
            setError(err);
            setLoading(false);
        });
    }, [nowPage, dispatch]);

    // <옵션> 로딩화면 보여주기
    if (loading) return <Loading />;
    if (error) return <Failure message={error.message} />;

    const itemRender = (current, type, element) => {
        if (totalSize === 0) return null;
        return element;
    };
    
    return <>
        <div className="p-5 bg-warning text-white rounded">
            <h1>게시판 목록</h1>
        </div>
        <div className="text-end my-2">
            <button className="btn btn-danger" onClick={() => navigate('form')}>글 등록</button>
        </div>
        <table className="table table-hover text-center">
            <thead className="table-dark">
                <tr>
                    <th className="col-1">번호</th>
                    <th>제목</th>
                    <th className="col-2">글쓴이</th>
                    <th className="col-3">작성일</th>
                    <th className="col-1">조회수</th>
                </tr>
            </thead>
            <tbody>
                {posts.length === 0 && <tr><td colSpan={5}>등록된 글이 없습니다.</td></tr>}
                {posts.map(({ id, title, username, postDate, views }) => (
                    <tr key={id}>
                        <td><small>{id}</small></td>
                        <td className="text-start">
                            {/*    Link의 state 속성으로 bbs를 넘기고 받는 쪽에서는 useLocation() 훅으로 받는다.    */}
                            <Link to={id} className="nav-link">{title}</Link>
                        </td>
                        <td>{username}</td>
                        <td><small>{postDate}</small></td>
                        <td><small>{views}</small></td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/*
            npm i rc-pagination
            페이징 표시: <Pagination total={전체글수} current={현재페이지} pageSize={페이지당 보여줄 글 수}/>
		    페이징 표시는 되나 페이지 번호 클릭시 이벤트는 처리해줘야한다
            페이지 번호 클릭시 이벤트 처리를 위해서는 onChange={(current)=>setNowPage(current)}
            여기서 current는 클릭한 페이지 번호로, 누른 페이지 번호가 인자로 전달이 된다. 이걸 받아서 처리해줘야함.
			단, BBS 컴포넌트에서 글 가져오는 dataFetch()를 nowPage 스테이트가
			변할때 마다 콜백 함수가 호출되도록 의존성 배열 [nowPage]에 설정 한다
		    가운데 정렬: align="center" 추가(디폴트가 왼쪽에 페이징 표시)
		*/}
        {/*   중국어를 한국어로 변경   */}
        {/*   페이지 번호 수 적용하기(BLOCKPAGE) 및 ...버튼 안보이기 적용   */}
        <Pagination 
            itemRender={itemRender}
            align="center"
            current={nowPage} 
            onChange={v => dispatch({ type: BBS.NOWPAGE, nowPage: v })} 
            total={totalSize}
            pageSize={BBS_PAGING.PAGESIZE}
            prevIcon={<i className="fa-solid fa-chevron-left"></i>}
            nextIcon={<i className="fa-solid fa-chevron-right"></i>}
            showQuickJumper={false}
            locale={ko_KR}  // 페이징 각 버튼들의 tooltip 언어 설정 (node_module에서 직접 import 해서 사용한다.)
            // 커스텀 하고싶다면, 직접 object를 만들어도 상관없다.
        />
    </>
}