const { Router } = require("express");
const { Movie } = require("../models");
const { createMovie, updateMovie, removeMovie, getListMovie, getListComment, searchMovie, uploadPoster, moviePagination } = require("../controllers/movie.controllers");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");
const { uploadImage } = require("../controllers/upload.controllers");
const movieRouter = Router();

movieRouter.post("/", authenticate, authorize(["ADMIN"]), createMovie);
movieRouter.get("/", getListMovie);
movieRouter.get("/search", searchMovie);
movieRouter.get("/pagination", moviePagination);
movieRouter.post("/upload-poster/:id", authenticate, authorize(["ADMIN"]), checkExist(Movie), checkExist(Movie), uploadImageSingle().single("image"), uploadImage("Poster"), uploadPoster);
movieRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Movie), updateMovie);
movieRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Movie), removeMovie);
movieRouter.get("/comment/:id", checkExist(Movie), getListComment);

module.exports = { movieRouter };