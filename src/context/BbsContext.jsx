import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { BBS, URL } from "../config/constants";

const initialState = {
    totalSize: 0,
    nowPage: 1,
    posts: []
};

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



export const BBSContext = createContext(null);

export function BBSProvider({ children }) {
    const [bbsModel, dispatch] = useReducer(bbsReducer, initialState);

    useEffect(() => {
        axios.get(URL.BBS)
        .then(res => dispatch({ type: BBS.TOTALSIZE, totalSize: res.data?.length || 0 }));
    }, []);

    return <>
        <BBSContext.Provider value={{ bbsModel, dispatch }}>
            {children}
        </BBSContext.Provider>
    </>
}