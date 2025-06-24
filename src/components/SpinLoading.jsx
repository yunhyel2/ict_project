import scss from './SpinLoading.module.css';

//  <<<     데이터 뿌려주기 전 로딩 UI 컴포넌트   >>>
export default function SpinLoading () {
    

    return <>
        <div className="d-flex justify-content-center my-2">
            <div className={scss.spinner}></div>
        </div>
    </>
}
