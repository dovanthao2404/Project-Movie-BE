const { Router } = require("express");
const { User } = require("../models");
const { register, login, resetPassword } = require("../controllers/auth.controllters");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");
const { sendMail } = require("../services/send-mail.services");
const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/reset-password", checkExist(User, "email"), sendMail, resetPassword);

module.exports = { authRoutes };