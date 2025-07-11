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
    const { data } = await axios.put(`/api/users/${user.id}`, user);
    return data;
}

export async function deleteUser(account) {
    const { data } = await axios.delete(`/api/users/${account}`);
    return data;
}


export default {};