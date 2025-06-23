import { createContext, useEffect, useReducer } from "react";
import usersReducer from "../reducer/usersReducer";
import axios from "axios";
import { AUTH_KEY, URL, USERS } from "../config/constants";

//  <<  1. 리듀서를 사용해 관리할 초기 State 정의  >>
const initialState = {
    users: [],      // 사용자들 저장용
    auth: sessionStorage.getItem(AUTH_KEY.USERNAME) || null,     // 로그인한 사용자 아이디 저장용
};

//  <<  2. Context 객체 생성  >>
//  자식 컴포넌트에서 useContext(Context객체)로 데이터를 받아야 함으로
//  Context 객체를 export
export const UsersContext = createContext(null);

//  <<  3. 사용자 관련 Provider 컴포넌트 정의  >>
/*
    ** children 키워드는 React에서 기본 제공하는 Props다
       해당 컴포넌트(UsersProvider)의 자식 요소를 Props로 전달하는 역할을 한다.
       즉 <컴포넌트>자식 JSX들</컴포넌트> 형태로 사용하면
       이 자식 JSX들이 props.children 으로 전달된다.
*/

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