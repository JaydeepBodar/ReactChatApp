const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userroutes = require("./Routes/userRouter");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors("*"));
app.use(express.json());
app.use("/user", userroutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
const server = app.listen(process.env.PORT, function chk(err) {
  if (err) {
    console.log("server not starting");
  } else {
    console.log(`server starting on ${process.env.PORT}`);
  }
});
mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected succesfully"))
  .catch(() => {
    console.log("database not connected succesfully");
  });

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { credentials: true, origin: "http://localhost:3001" },
});
io.on("connection", (socket) => {
  console.log("socket connect successfully");
  socket.on("setup", (userdata) => {
    socket.join(userdata._id);
    console.log("userdata._id", userdata._id);
    socket.emit("setup");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`join room ${room}`);
  });
  socket.on("message", (newmessage) => {
    let chat = newmessage.chat;
    if (!chat.users) {
      console.log("user chat not found");
    } else {
      chat.users.forEach((user) => {
        if (user.id === newmessage.sender._id) {
          return;
        }else{
          console.log("userid",user._id)
          socket.in(user._id).emit("message recieved",newmessage)
        }
      });
    }
  });
});
