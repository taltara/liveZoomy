module.exports = connectSockets;

function connectSockets(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("setBoard", async () => {
      console.log("SETBOARD");
      if (socket.myBoard) socket.leave(socket.myBoard);
      
      socket.join("board");
      socket.myBoard = "board";
    });

    socket.on("updateBoard", async (board) => {
        console.log("SOCKET UPDATE FOR", socket.myBoard);
      io.to(socket.myBoard).emit("loadBoard", board);
    });

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  });
}
