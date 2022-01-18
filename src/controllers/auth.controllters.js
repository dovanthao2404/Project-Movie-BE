const { User } = require("../models");
const slug = require('slug');
const { response } = require("express");

const register = async (req, res) => {
    try {
        const {
            name,
            phoneNumber,
            email,
            password,
            avatar,
            dateOfBirth,
        } = req.body;
        const alias = slug(name);
        const userRegister = await User.create({
            name,
            phoneNumber,
            email,
            password,
            avatar,
            dateOfBirth,
            alias
        });

        res.status(200).send(userRegister);
    } catch (error) {
        res.status(500).send(error);
    }
};

const imageUpload = (req, res) => {
    const { resultImage } = req;
    res.send(resultImage);
};

module.exports = { register, imageUpload };