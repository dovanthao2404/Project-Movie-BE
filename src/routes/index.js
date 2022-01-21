const { Router } = require("express");
const { authRoutes } = require("./auth.routes");
const { movieRouter } = require("./movie.routes");
const { userRouter } = require("./user.routes");
const { cineplexRouter } = require("./cineplex.routes");
const { bannerRouter } = require("./banner.routes");
const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/movies", movieRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/cineplex", cineplexRouter);
rootRouter.use("/banner", bannerRouter);


module.exports = { rootRouter };