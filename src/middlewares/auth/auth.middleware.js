const jwt = require("jsonwebtoken");
const { configEnv } = require("../../config/server.config");

const authenticate = (req, res, next) => {


    try {
        const token = req.header("token");
        const secretKey = configEnv.server.secretKey;
        const decode = jwt.verify(token, secretKey);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).send({
            message: "You are not logged in!",
        });
    }
};

const authorize = (arrayRole) => (req, res, next) => {
    const { user } = req;
    if (arrayRole.includes(user.role)) {
        next();
    } else {
        res.status(403).send({
            message: "You are logged in, but you do not have enough access rights",
        });
    }
};

module.exports = {
    authenticate,
    authorize,
};
