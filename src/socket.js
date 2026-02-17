import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL_ONE = import.meta.env.VITE_SUNBLOCK_ONE;
const URL_TWO = import.meta.env.VITE_SUNBLOCK_TWO;

export const socket_one = io(URL_ONE, { transports: ["websocket"] });
export const socket_two = io(URL_TWO, { transports: ["websocket"] });