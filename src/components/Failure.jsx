
//  << 에러 내용 보여주는 컴포넌트 >>
export default function Failure({ message }) {
    return <>
        <div className="alert alert-danger mt-3">
            <h1 className="display-6 text-danger">Error! <small className="text-dark">{message}</small></h1>
        </div>
    </>
}
