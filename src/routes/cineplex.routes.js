const { Router } = require("express");
const { getAllCineplex, createCineplex, updateCineplex, deleteCineplex } = require("../controllers/cineplex.controllers");

const cineplexRouter = Router();

cineplexRouter.post("/", createCineplex);
cineplexRouter.get("/", getAllCineplex);
// cineplexRouter.get("/all", () => { });
// cineplexRouter.get("/cinema/:id", () => { });
// cineplexRouter.get("/:id", () => { });
cineplexRouter.put("/:id", updateCineplex);
cineplexRouter.delete("/:id", deleteCineplex);

module.exports = { cineplexRouter };