const { configEnv } = require("../../config/server.config");
const jwt = require("jsonwebtoken");
const isUserCreate = (Model) => async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userIdReq } = req.body;
        const comment = await Model.findByPk(id);
        const userIdComment = comment.dataValues.userId;
        const token = req.header("token");
        const secretKey = configEnv.server.secretKey;
        const decode = jwt.verify(token, secretKey);
        if (decode) {
            if (decode.roles === "ADMIN") {
                next();
                return;
            }
            if (userIdComment === userIdReq) {
                next();
            } else {
                res.status(400).send({ message: "can not delete" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = { isUserCreate };