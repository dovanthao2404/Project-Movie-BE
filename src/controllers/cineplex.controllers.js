const slug = require('slug');

const { Cineplex, sequelize, Cinema, Room, Showtime } = require("../models");


const getAllCineplex = async (req, res) => {
    try {
        const results = await Cineplex.findAll();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(req);
    }
};


const createCineplex = async (req, res) => {
    try {
        const { name } = req.body;
        const alias = slug(name);

        const newCineplex = await Cineplex.create({
            alias,
            name
        });

        res.send(newCineplex);
    } catch (error) {
        res.status(500).send(req);
    }
};

const updateCineplex = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const alias = slug(name);

        const cineplexUpdate = await Cineplex.findByPk(+id);
        await cineplexUpdate.update({
            name,
            alias
        });

        res.status(200).send({ message: "update successfully" });

    } catch (error) {
        res.status(500).send(req);
    }
};


const deleteCineplex = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await Cinema.findAll();
        if (results.length) {
            res.status(400).send({ message: "Cineplex has a cinema cannot be deleted" });

        } else {
            await Cineplex.destroy({
                where: {
                    id
                }
            });
            res.send({ message: "delete successfully" });
        }
    } catch (error) {
        res.status(500).send(req);
    }
};


const getCinemaByCineplex = async (req, res) => {
    try {
        const { id } = req.params;
        const cineplex = await Cineplex.findOne({
            where: {
                id
            },
            include: [Cinema]
        });
        res.send(cineplex);
    } catch (error) {
        res.status(500).send(req);
    }
};


const getCineplexById = async (req, res) => {
    try {
        const { id } = req.params;
        const cineplex = await Cineplex.findOne({
            where: {
                id
            },
            include: [{
                model: Cinema,
                include: [{
                    model: Room,
                    include: [Showtime]
                }]
            }]
        });
        res.send(cineplex);
    } catch (error) {
        res.status(500).send(req);
    }
};

const uploadLogo = async (req, res) => {
    try {
        const { resultImage } = req;
        const { id } = req.params;
        await Cineplex.update(
            { logo: resultImage.url },
            { where: { id } }
        );
        res.status(201).send({ message: "upload logo successfully" });

    } catch (error) {
        res.status(500).send(req);
    }
};

module.exports = { getAllCineplex, createCineplex, updateCineplex, deleteCineplex, getCinemaByCineplex, getCineplexById, uploadLogo };