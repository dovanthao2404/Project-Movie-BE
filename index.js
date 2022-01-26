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

const PORT = process.env.PORT || configEnv.server.port;
app.listen(PORT, () => {
    console.log("app listen port " + PORT);
});