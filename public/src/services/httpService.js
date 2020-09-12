import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

var axios = Axios.create({
    withCredentials: true
});

export default {
    get(endpoint, data) {
        // console.log("YOYO3");
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method = 'GET', data = null) {
    console.log(`${BASE_URL}${endpoint}`, data);
    try {
        console.log("YOYO4");
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        console.log("YOYO5");
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        throw err.response.data.error;
    }
}