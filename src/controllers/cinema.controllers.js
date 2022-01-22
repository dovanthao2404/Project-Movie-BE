const { Cinema, Room, CinemaConnectMovie } = require("../models");
const slug = require("slug");
const createCinema = async (req, res) => {

    try {
        const { name, cineplexId } = req.body;
        const alias = slug(name);
        const newRoom = await Cinema.create({
            name, cineplexId, alias
        });

        res.status(200).send({ message: "create success", cinema: newRoom });

    } catch (error) {
        res.status(500).send(error);
    }

};

const updateCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, cineplexId } = req.body;
        const cinemaUpdate = await Cinema.findByPk(id);
        const alias = slug(name);
        await cinemaUpdate.update({
            name: name || cinemaUpdate.dataValues.name,
            cineplexId: cineplexId || cinemaUpdate.dataValues.cineplexId,
            alias: alias || cinemaUpdate.dataValues.alias,
        });
        res.send({ message: "update successfully", cinema: cinemaUpdate });
    } catch (error) {
        res.status(500).send(error);

    }
};



const deleteCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const listCineConnectMovie = await CinemaConnectMovie.findAll({
            where: {
                cinemaId: id
            }
        });
        const listRoom = await Room.findAll({
            where: {
                cinemaId: id
            }
        });

        if (listRoom.length || listCineConnectMovie.length) {
            res.status(400).send({ message: "can not delete" });

        } else {
            await Cinema.destroy({
                where: {
                    id
                }
            });
            res.status(400).send({ message: "delete successfully" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = { createCinema, updateCinema, deleteCinema };