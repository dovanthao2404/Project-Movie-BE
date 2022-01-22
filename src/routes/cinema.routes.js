const { Router } = require("express");
const { Room, Cinema, Cineplex } = require("../models");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");
const { uploadImage } = require("../controllers/upload.controllers");
const { createCinema, updateCinema, deleteCinema } = require("../controllers/cinema.controllers");
const cinemaRouter = Router();

cinemaRouter.post("/", authenticate, authorize(["ADMIN"]), checkExist(Cineplex, "id", "cineplexId"), createCinema);
cinemaRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Cinema), updateCinema);
cinemaRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Cinema), deleteCinema);

module.exports = { cinemaRouter };