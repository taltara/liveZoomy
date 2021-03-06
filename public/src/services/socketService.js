import io from 'socket.io-client';

const BASE_URL =
    process.env.NODE_ENV === 'production' ? '/' : '//localhost:3030';

let socket;

export default {
    setup,
    terminate,
    on,
    off,
    emit
};

function setup() {
    socket = io(BASE_URL);
}

function terminate() {
    socket = null;
}

function on(eventName, cb) {
    console.log("25 SSERVICE", eventName, cb);
    socket.on(eventName, cb);
}

function off(eventName, cb) {
    socket.off(eventName, cb);
}

function emit(eventName, data) {
    console.log(data);
    socket.emit(eventName, data);
}
