const { Router } = require("express");

const userRouter = Router();

userRouter.use("/", () => { });

module.exports = { userRouter };