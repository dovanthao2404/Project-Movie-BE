const { Router } = require("express");
const { Room, Cinema } = require("../models");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");
const { uploadImage } = require("../controllers/upload.controllers");
const { createRoom, updateRoom, deleteRoom, getShowtimeByRoom } = require("../controllers/room.controlers");
const roomRouter = Router();

roomRouter.post("/", authenticate, authorize(["ADMIN"]), checkExist(Cinema, "id", "cinemaId"), createRoom);
roomRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Room), updateRoom);
roomRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Room), deleteRoom);
roomRouter.get("/:id", checkExist(Room), getShowtimeByRoom);

module.exports = { roomRouter };