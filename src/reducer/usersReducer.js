//  << 리듀서(사용자 정의 함수)의 목적은 State 변경 >>

import { AUTH_KEY, USERS } from "../config/constants";

//  리듀서 : 현재 State를 인자로 받아 dispatch가 전달하는 action의 type(요청 종류)
//  State를 변경해서 새로운 State를 반환한다.

const usersReducer = (state, action) => {
    console.log('(usersReducer.js)의 현재 state: ', state);
    switch(action.type) {
        case USERS.ALL:     // 사용자 목록
            return { ...state, users: action.users };
        case USERS.LOGIN:   // 로그인 처리
            sessionStorage.setItem(AUTH_KEY.USERNAME, action.auth);
            return { ...state, auth: action.auth };
        case USERS.LOGOUT:  // 로그아웃 처리
            sessionStorage.removeItem(AUTH_KEY.USERNAME);
            return { ...state, auth: null };
        case USERS.LIKES:   // 좋아요 처리
            return { ...state, users: state.users.map(user => user.username === action.username ? { ...user, likes: parseInt(user.likes)+1 } : user) };
        default:
            console.error("존재하지 않는 요청입니다.");
    }
    return state;
};

export default usersReducer;
