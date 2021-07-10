//local env variable
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//libaries
const mongoose = require("mongoose");
const { v4 } = require("uuid");
const Folder = require("./Models/DocumentFolder");
const express = require("express");
const cors = require("cors");
const io = require("socket.io")(process.env.SOCKETPORT || 5000, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

//routes
const authRouter = require("./Routes/Auth");
const documentsRouter = require("./Routes/Documents");
const provisionRouter = require("./Routes/Provision");

//socket routes
const documentsSocket = require("./Socket.io/Documents");
const serverSocket = require("./Socket.io/ManageServer");

//mongoose config
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => console.log("Connected to Database: " + process.env.DATABASE_URL)
);

(async () => {
  let folder = await Folder.find({ path: "/" })
  if (folder.length < 1) {
    Folder.create({
      _id: v4(),
      data: [],
      createDate: +new Date(),
      name: "",
      owner: "",
      path: "/",
    })
  }
})();

//express config
const app = express();
app.use(express.json());
app.use(cors());

//router
app.use("/auth", authRouter);
app.use("/documents", documentsRouter);
app.use("/provision", provisionRouter);
app.listen(process.env.PORT || 4000, () =>
  console.log("Express on Port: " + process.env.PORT || 4000)
);

//socket
console.log("Socket.IO on Port: " + process.env.SOCKETPORT || 5000);

io.on("connection", (socket) => {
  documentsSocket(socket, io);
});
serverSocket(io);
