import axios from 'axios';

export async function getUserByAccount(account) {
    const { data } = await axios.get(`/api/users/${account}`);
    return data;
}

export async function createUser(user) {
    const { data } = await axios.post(`/api/users`, user);
    return data;
}

export async function updateUser(user) {
    const { data } = await axios.put(`/api/users/${user.account}`, user);
    return data;
}

export async function deleteUser(account) {
    const { data } = await axios.delete(`/api/users/${account}`);
    return data;
}

export async function verifyUser(account, password) {
    const { data } = await axios.post('/api/auth/verify-password', { account, password });
    return data;
}


export default {};