const { Router } = require("express");
const { authRoutes } = require("./auth.routes");
const { movieRouter } = require("./movie.routes");
const { userRouter } = require("./user.routes");
const { cineplexRouter } = require("./cineplex.routes");
const { bannerRouter } = require("./banner.routes");
const { roomRouter } = require("./room.routes");
const { cinemaRouter } = require("./cinema.routes");
const { commentRouter } = require("./comment.routes");
const rootRouter = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/movies", movieRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/cineplex", cineplexRouter);
rootRouter.use("/banner", bannerRouter);
rootRouter.use("/cinemas", cinemaRouter);
rootRouter.use("/rooms", roomRouter);
rootRouter.use("/comments", commentRouter);




module.exports = { rootRouter };