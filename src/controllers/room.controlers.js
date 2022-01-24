const { Room, Showtime } = require("../models");

const createRoom = async (req, res) => {
    try {
        const { name, cinemaId } = req.body;

        const newRoom = await Room.create({
            name, cinemaId
        });
        res.status(201).send({ message: "create success", room: newRoom });

    } catch (error) {
        res.status(500).send(error);
    }
};

const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, cinemaId } = req.body;
        const roomUpdate = await Room.findByPk(id);
        await roomUpdate.update({
            name: name || roomUpdate.dataValues.name,
            cinemaId: cinemaId || roomUpdate.dataValues.cinemaId,
        });
        res.send({ message: "update successfully", room: roomUpdate });
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const listShowtime = await Showtime.findAll({
            where: {
                roomId: id
            }
        });
        if (listShowtime.length) {
            res.status(400).send({ message: "can not delete" });
        }
        await Room.destroy({
            where: {
                id
            }
        });
        res.send({ message: "delete successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};


const getShowtimeByRoom = async (req, res) => {

    try {
        const { id } = req.params;
        const room = await Room.findOne({
            where: {
                id
            },
            include: Showtime
        });
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = { createRoom, updateRoom, deleteRoom, getShowtimeByRoom };