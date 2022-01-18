const { Router } = require("express");
const { authRoutes } = require("./auth.routes");
const { movieRouter } = require("./movie.routes");
const { userRouter } = require("./user.routes");

const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/movies", movieRouter);
rootRouter.use("/users", userRouter);

module.exports = { rootRouter };