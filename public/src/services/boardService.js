import httpService from './httpService';
const BASE_URL = 'board';

export default {
    query,
    save,
}

async function query() {
    console.log("YOYO2");
    return await httpService.get(`${BASE_URL}`);
}

async function save(board) {
    console.log("SAVING1");
    var prm = await httpService.put(`${BASE_URL}`, board);
    console.log("SAVING2");
    return prm;
}

