import { useParams } from 'react-router-dom';
import { useAuth } from '/context/AuthContext';

export default function CreatePlaceComment() {
    const { id: feedId } = useParams();
    const { auth: { account } } = useAuth();

    return <>
        <div className="p-2 ps-3 border-top border-gray position-absolute bg-white" style={{ width: '100%', bottom: 0, left: 0 }}>
            <form className="d-flex small pt-1 gap-8">
                <input type="hidden" name="parent_id" value={feedId} />
                <input type="text" name="comment" className="form-control border-radius-20" style={{ fontSize: 14 }} />
                <input type="hidden" name="account" value={account} />
                <button className="btn btn-primary btn-sm text-nowrap p-2 border-radius-20" style={{ minWidth: 40, height: 40 }}>
                    <i className="fas fa-paper-plane" style={{ fontSize: 16 }} />
                </button>
            </form>
        </div>
    </>
}
