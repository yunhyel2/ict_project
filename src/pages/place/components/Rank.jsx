import { useState } from "react";

const getIcon = (rank, nth) => {
    if (rank > nth && rank < nth+1) return "star_half";  // 반쪽 별
    if (rank >= nth) return "star";  // 채워진 별
    return "star_empty";  // 빈 별
}
export function Rank({ readOnly, value = 0 }) {
    const [rank, setRank] = useState(value);

    return <>
        <input type="number" name="rank" className="invisible position-absolute" value={rank} readOnly />
        <div className="d-inline-flex">
            {[1,2,3,4,5].map(i => readOnly ? 
            <img src={`/assets/icons/${getIcon(rank, i)}.png`} width="30px" height="30px" className="m-1" key={i} /> :
            (
                <button key={i} onClick={() => setRank(i)} className="btn btn-none m-1 p-0">
                    <img src={`/assets/icons/${getIcon(rank, i)}.png`} width="30px" height="30px" />
                </button>
            ))}
        </div>
    </>
}