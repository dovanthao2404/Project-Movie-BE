const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { rootRouter } = require("./src/routes");
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter);
app.listen(500, () => {
    console.log("app listen port 500");
});