const { Router } = require("express");
const { uploadImage } = require("../controllers/upload.controllers");
const { createUser, uploadAvatar } = require("../controllers/user.controllers");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");
const userRouter = Router();

userRouter.post("/", authenticate, authorize(["ADMIN"]), createUser);
userRouter.post("/upload-avatar", authenticate, uploadImageSingle().single("image"), uploadImage("Avatar"), uploadAvatar);

module.exports = { userRouter };