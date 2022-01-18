const { Router } = require("express");
const { register, login } = require("../controllers/auth.controllters");
const { uploadImage } = require("../controllers/upload.controllers");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

module.exports = { authRoutes };