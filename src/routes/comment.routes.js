const { Router } = require("express");
const { Movie, User, Comment } = require("../models");
const { } = require("../controllers/cineplex.controllers");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { createComment, updateComment, deleteComment } = require("../controllers/comment.controllers");
const { isUserCreate } = require("../middlewares/comments/is-user-create.middleware");

const commentRouter = Router();

commentRouter.post("/", checkExist(Movie, "id", "movieId"),
    checkExist(User, "id", "userId"), createComment);
commentRouter.put("/:id", checkExist(Comment), isUserCreate(Comment), updateComment);
commentRouter.delete("/:id", checkExist(Comment), isUserCreate(Comment), deleteComment);

module.exports = { commentRouter };