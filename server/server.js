import { Server } from "socket.io"

const io = new Server(3000, {
  // options

  //client run on
  cors: {
    origin: ["http://localhost:5173"],
  },
})

io.on("connection", (socket) => {
  console.log("connection socket.id = ", socket.id)

  socket.on("send-message", (message, room) => {
    console.log("room", room)
    console.log("send-message message:", message)
    //broadcast event data will only be broadcast to every sockets but the sender.
    if (room === "") {
      socket.broadcast.emit("receive-message", message)
    } else {
      //with .to(room) broadcast by default
      socket.to(room).emit("receive-message", message)
    }
  })
  //send to room with multiple receivers - custom rooms
  socket.on("join-room", (room, cb) => {
    socket.join(room)
    cb(`Joined room: ${room}`)
  })
})
