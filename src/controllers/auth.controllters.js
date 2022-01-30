const { User } = require("../models");
const slug = require('slug');
const bcrypt = require("bcryptjs");
const { configEnv } = require("../config/server.config");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {
        const {
            name,
            phoneNumber,
            email,
            password,
            dateOfBirth,
        } = req.body;
        const alias = slug(name);

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const userRegister = await User.create({
            name,
            phoneNumber,
            email,
            password: hashPassword,
            dateOfBirth,
            alias
        });


        res.status(200).send(userRegister);
    } catch (error) {
        res.status(500).send(error);
    }
};


const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const userLogin = await User.findOne({ where: { email } });
        if (!userLogin) {
            res.status(404).send({ message: "Email does not exist!" });
        } else {
            const isAuth = bcrypt.compareSync(password, userLogin.password);
            if (isAuth) {
                const payload = {
                    id: userLogin.id,
                    email: userLogin.email,
                    roles: userLogin.roles,
                };
                const secretKey = configEnv.server.secretKey;
                const token = jwt.sign(payload, secretKey,);

                res.status(200).send({
                    messages: "Logged in successfully",
                    token,
                    info: {
                        id: userLogin.id,
                        avatar: userLogin.avatar,
                        name: userLogin.name,
                        roles: userLogin.roles
                    },
                });
            } else {
                res.status(400).send({
                    messages: "Incorrect password",
                });
            }
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
};


const resetPassword = async (req, res) => {
    try {

        const detail = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.password, salt);
        await detail.update({
            password: hashPassword,
        });


        res.status(200).send({ message: "Sent the new password, please check email" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
module.exports = { register, login, resetPassword };