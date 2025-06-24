import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { AUTH_KEY, URL, USERS } from "../config/constants";

const initialState = {
    users: [],      // 사용자들 저장용
    auth: sessionStorage.getItem(AUTH_KEY.USERNAME) || null,     // 로그인한 사용자 아이디 저장용
};

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


export const UsersContext = createContext(null);


async function getUsersFromServer () {
  try {
    const { data } = await axios.get(URL.USERS);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

//  먼저 reducer/usersReducer.js에 State를 변경할 리듀서(함수)를 정의한다.
export function UsersProvider({ children }) {
    //  <<  3. 사용자 목록 및 인증 여부를 State(usersInfo)로 관리하기 위한 리듀서 객체 생성  >>
    const [usersInfo, dispatch] = useReducer(usersReducer, initialState);

    //  사용자 목록 가져오기
    useEffect(() => {
        console.log('사용자 목록 가져오기')
        getUsersFromServer()
            .then(data => dispatch({ type: USERS.ALL, users: data }))
            .catch(err => console.log(err));
    }, []);

    return <>
        {/*   Context 영역에 사용자 및 인증 관련 State 및 dispatch 저장   */}
        <UsersContext.Provider value={{ usersInfo, dispatch }}>
            {children}
        </UsersContext.Provider>
    </>
}