import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.SUNBLOCK_ENDPOINT;

export const socket = io(URL, { transports: ["websocket"] });