import { getDate } from '/components';
import { Rank } from './Rank';

/* TODO :: 익명으로 할까 고민중 UI가 잘 안나와서 */
export default function PlaceComment({ id, comment, user, rank, createdAt }) {
    const { name: username } = user;

    return <>
        <li className="p-2 border-bottom border-gray d-flex align-items-start gap-8" key={id}>
            <div style={{ zoom: 0.6 }}>
                <Rank value={rank} readOnly />
            </div>
            <div className="flex-grow small" style={{ maxWidth: 400, paddingTop: 1 }}>
                {comment}
                <small className="text-gray ms-3">— {createdAt?.split('T')[0]}</small>
            </div>
            {/* TODO:: 사용자가 로그인 한 유저라면 삭제버튼 보이게 / 삭제 이벤트 처리 */}
            <button className="btn btn-none p-0 d-flex align-self-center">
                <i className="fas fa-xmark" />
            </button>
        </li>
    </>
}
