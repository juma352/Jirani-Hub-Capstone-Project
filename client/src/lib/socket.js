import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (
  import.meta.env.PROD 
    ? 'https://jirani-hub-capstone-project.onrender.com'
    : 'http://localhost:5000'
);

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectSocket = (neighborhoodId) => {
  if (!socket.connected) {
    socket.connect();
  }
  if (neighborhoodId) {
    socket.emit('joinRoom', { neighborhoodId });
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export default socket;
