const dotenv = require("dotenv");
dotenv.config();

const server = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    secretKey: process.env.SECRET_KEY
};

const configEnv = {
    server,
};

module.exports = { configEnv };
