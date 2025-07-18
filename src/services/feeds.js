import axios from "axios";

export async function createFeed(post){
    const { data } = await axios.post(`/api/feeds`, post)
    return data;
}

export async function getFeeds(){
    const { data } = await axios.get(`/api/feeds`)
    return data;
}

export async function getFeedsWithPagination(page = 0, size = 10){
    const { data } = await axios.get(`/api/feeds?page=${page}&size=${size}`)
    return data;
}

export async function getFeedsRecentHot(limit){
    const { data } = await axios.get(`/api/feeds/top?limit=${limit}`)
    return data;
}

export async function getFeedById(id){
    const { data } = await axios.get(`/api/feeds/${id}`)
    return data;
}

export async function deleteFeedById(id){
    const { data } = await axios.delete(`/api/feeds/${id}`)
    return data;
}

export async function toggleLike(feedId, userId){
    const { data } = await axios.post(`/api/feeds/${feedId}/like?userId=${userId}`)
    return data;
}

export async function getComments(feedId){
    const { data } = await axios.get(`/api/feeds/${feedId}/comments`)
    return data;
}

export async function createComment(feedId, comment){
    const { data } = await axios.post(`/api/feeds/${feedId}/comments`, comment)
    return data;
}

export async function deleteComment(commentId, userId){
    await axios.delete(`/api/feeds/comments/${commentId}?userId=${userId}`)
}
