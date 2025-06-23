import { createContext, useEffect, useReducer } from "react";
import bbsReducer from '../reducer/bbsReducer';
import axios from "axios";
import { BBS, URL } from "../config/constants";

const initialState = {
    totalSize: 0,
    nowPage: 1,
    posts: []
};



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