const { Router } = require("express");
const { Cineplex } = require("../models");
const { getAllCineplex, createCineplex, updateCineplex, deleteCineplex, getCinemaByCineplex, getCineplexById, uploadLogo } = require("../controllers/cineplex.controllers");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");
const { uploadImage } = require("../controllers/upload.controllers");

const cineplexRouter = Router();

cineplexRouter.post("/", authenticate, authorize(["ADMIN"]), createCineplex);
cineplexRouter.get("/", getAllCineplex);
cineplexRouter.post("/upload-logo/:id", authenticate, authorize(["ADMIN"]), checkExist(Cineplex), uploadImageSingle().single("image"), uploadImage("Logo"), uploadLogo);
cineplexRouter.get("/cinema/:id", checkExist(Cineplex), getCinemaByCineplex);
cineplexRouter.get("/:id", checkExist(Cineplex), getCineplexById);
cineplexRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Cineplex), updateCineplex);
cineplexRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Cineplex), deleteCineplex);

module.exports = { cineplexRouter };