const { Router } = require("express");
const { register, imageUpload } = require("../controllers/auth.controllters");
const { uploadImage } = require("../controllers/upload.controllers");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");

const authRoutes = Router();

authRoutes.post("/", register);
authRoutes.post("/avatar", uploadImageSingle().single("image"), uploadImage("Avatar"), imageUpload);

module.exports = { authRoutes };