import { BBS } from "../config/constants";

const bbsReducer = (state, action) => {
    switch(action.type) {
        case BBS.ALL:
            return { ...state, posts: action.posts };
        case BBS.TOTALSIZE:
            return { ...state, totalSize: action.totalSize };
        case BBS.NOWPAGE:
            return { ...state, nowPage: action.nowPage };
        case BBS.WRITE:
            return { ...state, nowPage: 1, totalSize: state.totalSize+1 };
        case BBS.DELETE:
            return { ...state, nowPage: 1, totalSize: state.totalSize-1 };
        default:
            console.error("존재하지 않는 요청입니다.");
    }
    return state;
}


export default bbsReducer;