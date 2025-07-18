import axios from 'axios';

export async function getNotificationsByAccount(account) {
    const { data } = await axios.get(`/api/notifications/${account}`);
    return data;
}
