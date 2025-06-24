import classes from './Logo.module.scss'



export default function Logo() {
    return <>
        <span className={classes.logo}>
            <img src="/assets/icons/logo.png" width="auto" height={30} alt="logo"/>
            <span className={classes.logoText}>
                Dongne
                <span>Dongne</span>
                <span>Dongne</span>
                <span>나를 위한 동네 생활</span>
            </span>
        </span>
    </>
}
