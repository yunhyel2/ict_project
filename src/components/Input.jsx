import { useEffect, useState } from 'react';
import classes from './Input.module.scss';

export default function Input({
    id, placeholder, label, required, errorMessage, ...props
}) {
    const [error, setError] = useState("");
    const [shrink, setShrink] = useState(false);

    useEffect(() => {
        if (errorMessage) setError(`* ${errorMessage}`);
    }, [errorMessage]);


    const handleBlur = e => {
        if (!required) return;
        const { value } = e.target;
        if (!value) {
            setError("* 이 값은 필수입니다!");
            e.target.focus();
        } else setError(errorMessage || "");
    }

    return <>
        <div className={`${classes.field} ${error ? classes.error : ''}`}>
            <input id={id} className={`form-control ${required ? classes.required : ''}`} onFocus={() => setShrink(true)} onBlur={handleBlur} {...props} />
            <label htmlFor={id} className={shrink ? classes.shrink : ''}><small>{label}</small><span>{placeholder || label+'를 입력하세요'}</span></label>
            {error && <small className={classes.errorMessage}>{error}</small>}
        </div>
    </>
}