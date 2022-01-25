const { Router } = require("express");
const { User } = require("../models");
const { uploadImage } = require("../controllers/upload.controllers");
const { createUser, uploadAvatar, getListUser, getDetailUserById, uploadAvatarAdmin, getMyInfo, deleteUser, updateUser, updateInfo, searchUser, getUserPagination } = require("../controllers/user.controllers");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");

const userRouter = Router();

userRouter.post("/", authenticate, authorize(["ADMIN"]), createUser);
userRouter.get("/", authenticate, authorize(["ADMIN"]), getListUser);
userRouter.get("/my-info", authenticate, getMyInfo);
userRouter.get("/pagination", authenticate, authorize(["ADMIN"]), getUserPagination);
userRouter.post("/upload-avatar", authenticate, uploadImageSingle().single("image"), uploadImage("Avatar"), uploadAvatar);
userRouter.get("/search", authenticate, authorize(["ADMIN"]), searchUser);
userRouter.post("/upload-avatar/:id", authenticate, authorize(["ADMIN"]), uploadImageSingle().single("image"), uploadImage("Avatar"), uploadAvatarAdmin);
userRouter.get("/:id", authenticate, authorize(["ADMIN"]), checkExist(User), getDetailUserById);
userRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(User), deleteUser);
userRouter.put("/", authenticate, updateInfo);
userRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(User), updateUser);

module.exports = { userRouter };