const { User } = require("../models");
const slug = require('slug');
const bcrypt = require("bcrypt");
const { configEnv } = require("../config/server.config");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
    try {
        const {
            name,
            phoneNumber,
            email,
            password,
            dateOfBirth,
            roles
        } = req.body;
        const alias = slug(name);

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const userCreate = await User.create({
            name,
            phoneNumber,
            email,
            password: hashPassword,
            dateOfBirth,
            alias,
            roles
        });

        res.status(201).send(userCreate);
    } catch (error) {
        res.status(500).send(error);
    }
};

const uploadAvatar = async (req, res) => {
    try {
        const { user, resultImage } = req;
        await User.update(
            { avatar: resultImage.url },
            {
                where: {
                    id: user.id,
                },
            }
        );
        const userPK = await User.findByPk(user.id);
        const userResult = { ...userPK.dataValues };
        delete userResult.password;

        res.status(201).send(userResult);

    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createUser, uploadAvatar
};