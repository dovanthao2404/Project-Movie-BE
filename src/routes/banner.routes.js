const { Router } = require("express");
const { Banner } = require("../models");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { authenticate, authorize } = require("../middlewares/auth/auth.middleware");
const { createBanner, getAllBanner, updateBanner, deleteBanner } = require("../controllers/banner.controllers");
const { uploadImageSingle } = require("../middlewares/uploads/upload-image.middleware");
const { uploadImage } = require("../controllers/upload.controllers");
const bannerRouter = Router();

bannerRouter.post("/", authenticate, authorize(["ADMIN"]), uploadImageSingle().single("image"), uploadImage("Banner"), createBanner);
bannerRouter.get("/", getAllBanner);
bannerRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Banner), uploadImageSingle().single("image"), uploadImage("Banner"), updateBanner);
bannerRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Banner), deleteBanner);

module.exports = { bannerRouter };