import { useNavigate } from "react-router-dom"

export default function NavigatePage() {
    //  <<<     <Route> 컴포넌트로 라우팅에 의한 컴포넌트 전환(페이지 전환)이 아닌
    //          useNavigate() 함수가 반환한 함수 호출로 컴포넌트 전환하기   >>>
    const navigate = useNavigate();
    console.log('(Navigate.jsx)navigate: ', navigate);
    return <>
        <h1 className="display-4 mt-3">useNavigate() 훅 함수</h1>
        {/*     navigate('URL패턴');    */}
        <button onClick={() => navigate('/users')} className="btn btn-success me-2">History</button>
        {/*     navigate('URL패턴', { replace: true });    */}
        {/*     /users로 전환 직전의 History를 저장하지 않는다. (Navigate 페이지 기록이 대체되면서 이동하기 때문에 백버튼 클릭시 Navigate 페이지로 돌아가지 않는다.)    */}
        <button onClick={() => navigate('/users', { replace: true })} className="btn btn-success me-2">No History(replace:true 옵션 테스트)</button>

        {/*     navigate('URL패턴', { state: 데이터 }) ** URL 패턴에 매핑된 컴포넌트로 데이터 전달시        */}
        <button className="btn btn-danger" onClick={() => navigate("/querystring?param1=UseNavigate&param2=함수로 컴포넌트 전환", { state: { name: 'ICT' } })}>State 전달 테스트</button>
    </>
}