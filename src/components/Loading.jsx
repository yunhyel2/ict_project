import scss from './Loading.module.css';

//  <<<     데이터 뿌려주기 전 로딩 UI 컴포넌트   >>>
export default function Loading () {
    

    return <>
        <div className="p-5 bg-warning text-white rounded mt-3">
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className="d-flex align-items-center">
                    <h2 className="display-6">
                        Now Loading . . .
                    </h2>
                </div>
                <div className="d-flex align-items-center">
                    <div className={scss.loading}>
                        <div className={scss.item}></div>
                        <div className={scss.item}></div>
                        <div className={scss.item}></div>
                        <div className={scss.item}></div>
                        <div className={scss.item}></div>
                        <div className={scss.item}></div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
