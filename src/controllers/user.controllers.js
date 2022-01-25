const { User, Ticket, Comment } = require("../models");
const slug = require('slug');
const bcrypt = require("bcrypt");
const { configEnv } = require("../config/server.config");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const userAttributes = [
    "id",
    "name",
    "phoneNumber",
    "email",
    "alias",
    "avatar",
    "roles",
    "dateOfBirth",
    "createdAt",
    "updatedAt",
];
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

const getListUser = async (req, res) => {
    try {
        const userResult = await User.findAll({
            attributes: userAttributes
        });
        res.status(200).send(userResult);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userResult = await User.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Ticket
                }
            ],
            attributes: userAttributes
        });
        res.status(200).send(userResult);
    } catch (error) {
        res.status(500).send(error);
    }
};
const uploadAvatarAdmin = async (req, res) => {
    try {
        const { resultImage } = req;
        const { id } = req.params;
        await User.update(
            { avatar: resultImage.url },
            {
                where: {
                    id
                },
            }
        );
        const userPK = await User.findByPk(id);
        const userResult = { ...userPK.dataValues };
        delete userResult.password;

        res.status(201).send(userResult);

    } catch (error) {
        res.status(500).send(error);
    }
};

const getMyInfo = async (req, res) => {
    try {
        const { user } = req;
        const userResult = await User.findOne({
            where: {
                id: user.id
            },
            include: [
                {
                    model: Ticket
                }
            ],
            attributes: userAttributes
        });
        res.status(200).send(userResult);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Ticket.destroy({
            where: {
                userId: id
            }
        });
        await Comment.destroy({
            where: {
                userId: id
            }
        });
        await User.destroy({
            where: {
                id
            }
        });

        res.send({ message: "delete successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            phoneNumber,
            dateOfBirth,
            roles
        } = req.body;
        const alias = slug(name);

        await User.update(
            {
                name,
                phoneNumber,
                dateOfBirth,
                roles: roles === "ADMIN" || roles === "CLIENT" ? roles : "CLIENT",
                alias,
            },
            {
                where: {
                    id
                },
            }
        );

        res.send({ message: "update user successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateInfo = async (req, res) => {
    try {
        const { id } = req.user;
        const {
            name,
            phoneNumber,
            dateOfBirth,
        } = req.body;
        const alias = slug(name);

        await User.update(
            {
                name,
                phoneNumber,
                dateOfBirth,
                alias,
            },
            {
                where: {
                    id
                },
            }
        );

        res.send({ message: "update user successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

const searchUser = async (req, res) => {
    try {
        const { keyword } = req.query;

        const listUser = await User.findAll(
            {
                where: {
                    name: {
                        [Op.substring]: keyword
                    }
                }
            }
        );

        res.send(listUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getUserPagination = async (req, res) => {
    try {
        const { pageSize, pageCurrent } = req.query;

        const { count, rows } = await User.findAndCountAll({
            offset: (+pageCurrent - 1) * pageSize,
            limit: +pageSize
        });
        const totalPage = Math.ceil(count / pageSize);

        res.send({ totalPage, rows });

    } catch (error) {
        console.log(totalItem);
        res.status(500).send(error);

    }
};

module.exports = {
    createUser,
    uploadAvatar,
    getListUser,
    getDetailUserById,
    uploadAvatarAdmin,
    getMyInfo,
    deleteUser,
    updateUser,
    updateInfo,
    searchUser,
    getUserPagination
};