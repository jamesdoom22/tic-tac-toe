import axios from "axios";

const url = 'http://localhost:3001/api'
// const url = 'http://192.168.0.119:3001'
const client = axios.create({
    baseURL: url
});

export const getHttp = async (url) => {
    console.log("🚀 ~ file: axios.js:11 ~ getHttp ~ url:", url)
    try {
        const response = await client.get(url);
        console.log("🚀 ~ file: axios.js:16 ~ getHttp ~ response:", response)
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}