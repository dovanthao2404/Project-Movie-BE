const { Router } = require("express");
const { Movie } = require("../models");
const { createMovie, updateMovie, removeMovie } = require("../controllers/movie.controllers");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const movieRouter = Router();

movieRouter.post("/", authenticate, authorize(["ADMIN"]), createMovie);
movieRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Movie), updateMovie);
movieRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Movie), removeMovie);

module.exports = { movieRouter };