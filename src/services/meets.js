import axios from "axios";

export async function createMeet(post){
    const { data } = await axios.post(`/api/meets`,post)
    return data;
}

export async function getMeetAll(){
    const { data } = await axios.get(`/api/meets`)
    return data;
}

export async function getMeet(id) {
    const { data } = await axios.get(`/api/meets/${id}`)
    return data;
}

export async function deleteMeet(id){
    const { data } = await axios.delete(`/api/meets/${id}`)
    return data;
}

export async function updateMeet(post) {
    const { data } = await axios.put(`/api/meets/${post.id}`,post)
    return data;
}

