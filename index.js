const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { rootRouter } = require("./src/routes");
const { configEnv } = require("./src/config/server.config");

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

app.use("/api/v1", rootRouter);

app.listen(configEnv.server.port, () => {
    console.log("app listen port " + configEnv.server.port);
});