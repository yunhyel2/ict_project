import classes from './Introduce.module.scss';

export default function Introduce() {

    return <>
        <div className={classes.container}>
            UX works for
            <div className={classes.droppingTexts}>
                <div>Developers</div>
                <div>Designers</div>
                <div>Coders</div>
                <div>EVERYONE!</div>
            </div>
        </div>
    </>
}