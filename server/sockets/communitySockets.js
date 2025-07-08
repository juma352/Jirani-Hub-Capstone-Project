export const setupCommunitySockets = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 New socket connected:', socket.id);

    // Join user to their community room
    socket.on('joinRoom', ({ neighborhoodId }) => {
      socket.join(neighborhoodId);
    });

    // Alert broadcast
    socket.on('sendAlert', ({ neighborhoodId, message }) => {
      io.to(neighborhoodId).emit('receiveAlert', { message });
    });

    socket.on('disconnect', () => {
      console.log('🔌 User disconnected');
    });
  });
};
