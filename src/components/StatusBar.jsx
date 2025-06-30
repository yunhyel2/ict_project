import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './StatusBar.scss';

function StatusBar({
    children = null, title, path, noBack, onBack
}) {
    const headerRef = useRef();
    const navigate = useNavigate();
    const goBack = () => {
        navigate(path || -1);
    }


    return (
        <div id="statusBar" className="d-flex" ref={headerRef}>
            <div className="flex1">
                {!noBack && (
                    <button className="btn btn-none" onClick={onBack || goBack}>
                        <i className="fas fa-angle-left"/>
                    </button>
                )}
            </div>
            <p className="h5 mb-0">{title}</p>
            <div className="flex1">
                {children}
            </div>
        </div>
    );
}

export default StatusBar;
