const { Router } = require("express");
const { Cineplex } = require("../models");
const { getAllCineplex, createCineplex, updateCineplex, deleteCineplex } = require("../controllers/cineplex.controllers");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");

const cineplexRouter = Router();

cineplexRouter.post("/", authenticate, authorize(["ADMIN"]), createCineplex);
cineplexRouter.get("/", getAllCineplex);
// cineplexRouter.get("/all", () => { });
// cineplexRouter.get("/cinema/:id", () => { });
// cineplexRouter.get("/:id", () => { });
cineplexRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Cineplex), updateCineplex);
cineplexRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Cineplex), deleteCineplex);

module.exports = { cineplexRouter };