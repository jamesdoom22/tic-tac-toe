import axios from "axios";

// const url = 'http://localhost:3001/api'
const url = '/api'
const client = axios.create({
    baseURL: url
});

export const getHttp = async (url) => {
    console.log("🚀 ~ getHttp ~ url:", url)
    try {
        const response = await client.get(url);
        console.log("🚀 ~ getHttp ~ response:", response)
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const postHttp = async (url, data) => {
    console.log("🚀 ~ postHttp ~ url:", url, data)
    try {
        const response = await client.post(url, data);
        console.log("🚀 ~ postHttp ~ response:", response)
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}