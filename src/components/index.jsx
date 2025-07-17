import StatusBar from "./StatusBar";


export const makeCalendar = (dt) => {
    const time = new Date(dt);
    const locale = "en-gb";

    var date   = time.getDate();
    var month = time.toLocaleString(locale,  {month: "long"});

    return <>
        <div className="d-inline-flex flex-column calendar align-items-stretch">
            <p className="text-white text-center">{month}</p>
            <p className="h3 bg-white text-center flex-grow mb-0">{date}</p>
        </div>
    </>
}

export const getDate = dt => {
    const date = dt.split('T')[0];
    let [hour, min] = dt.split('T')[1].split(':');
    hour = parseInt(hour);
    min = parseInt(min);
    let fhour = hour > 12 ? hour - 12 : hour;
    if (fhour == 0) fhour = 12;
    return <>
        <span>{date}</span><span className="ms-2">{hour >= 12 ? '오후' : '오전'} {fhour}시 {min != 0 && `${min}분`}</span>
    </>;
};


export function OverlayPage({ title, children, onDelete, onEdit }) {
    const deleteAsset = () => {
        if (confirm("정말 삭제하시겠습니까?")) {
            onDelete();
        }
    }
    return <>
        <div className="bg-white position-absolute" style={{ width: '100%', height: '100%', top: 0, left: 0, zIndex: 10 }}>
            <StatusBar title={title}>
                {onEdit && <button className="btn btn-none p-1" onClick={onEdit} title="수정하기"><i className="fas fa-pen-to-square"></i></button>}
                {onDelete && <button className="btn btn-none p-1" onClick={deleteAsset} title="삭제하기"><i className="fas fa-trash-can"></i></button>}
            </StatusBar>
            <div className="overflow-y-auto" style={{ height: '100%', minHeight: '100%', paddingTop: 60 }}>
                {children}
            </div>
        </div>
    </>
}

export default {};
