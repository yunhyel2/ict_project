
export const URL = {
    MAIN: '/',
    FEED: '/feeds',
    JOINUS: '/meets',
    OURPLACE: '/places',
    MYPAGE: '/mypage',
    LOGIN: '/login',
    REGISTER: '/register'
};

export const REGEX = {
    ACCOUNT: "^[a-zA-Z][a-zA-Z0-9_-]{3,19}$",
    PASSWORD: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,16}$"
};

export const FEEDS = {
    ALL: 'all',
    CREATE: 'create'
};

export const GATHERING = {
    ALL: 'all',
    CREATE: 'create'
};

export const AUTH_KEY = {
    USERNAME: 'username',
    PASSWORD: 'password'
};

export const BBS_PAGING = {
    PAGESIZE: 2,
    BLOCKPAGE: 3
};

export const USERS = {
    ALL: 'all',
    LOGIN: 'login',
    LOGOUT: 'logout',
    LIKES: 'likes'
};

export const BBS = {
    ALL: 'all',
    WRITE: 'write',
    DELETE: 'delete',
    TOTALSIZE: 'totalSize',
    NOWPAGE: 'nowPage'
};



export default {};