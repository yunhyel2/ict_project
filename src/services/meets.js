import axios from "axios";

export async function createMeet(post){
    const { data } = await axios.post(`/api/meets`,post)
    return data;
}
