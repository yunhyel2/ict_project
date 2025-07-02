import classes from './Introduce.module.scss';

export default function Introduce() {

    return <>
        <div className={classes.container}>
            우리 동네
            <div className={classes.droppingTexts}>
                <div>맛집</div>
                <div>놀거리</div>
                <div>커뮤니티</div>
                <div>모임</div>
            </div>
            <div className={classes.staticTexts}>전부 <span className="point">dongne</span>에서!</div>
        </div>
    </>
}