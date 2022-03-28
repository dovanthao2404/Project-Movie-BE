const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { rootRouter } = require("./src/routes");
const { configEnv } = require("./src/config/server.config");

const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();
app.use(cors());

app.use(express.json());
io.on('connection', (socket) => {
});




app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || configEnv.server.port;
server.listen(PORT, () => {
    console.log("app listen port " + PORT);
});