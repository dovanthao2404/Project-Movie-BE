const { Showtime, Seat, Ticket, Cinema, Room, CinemaConnectMovie } = require("../models");

const checkTypeSeat = (name, priceNormal, priceVip) => {

    const row = Math.ceil(name / 16);
    const index = name - ((row - 1) * 16);
    if (row > 2 && row < 9 && index <= 14 && index >= 3) {
        return { price: priceVip, isVip: true };
    }

    return { price: priceNormal, isVip: false };
};

const createShowtime = async (req, res) => {
    try {
        const { movieId, roomId, movieShowtime, movieName, priceNormal, priceVip } = req.body;

        const showtime = await Showtime.create({
            movieName,
            roomId,
            movieShowtime,
            movieId
        });

        const room = await Room.findOne({
            where: {
                id: roomId
            },
        });
        const cinemaId = room.dataValues.cinemaId;
        const movieConnectCinema = await CinemaConnectMovie.findOne({
            where: { cinemaId, movieId }
        });
        console.log(movieConnectCinema);
        if (!movieConnectCinema) {
            const movieConnect = await CinemaConnectMovie.create({ cinemaId, movieId });
        }

        let i = 1;

        const a = Array.from(Array(160), () => i++);

        for (let i = 0; i < a.length; i++) {
            const { price, isVip } = checkTypeSeat(a[i], priceNormal, priceVip);
            await Seat.create({
                name: a[i],
                showtimeId: showtime.dataValues.id,
                isVip: isVip,
                price: price
            });
        }


        res.status(201).send({ message: "create successfully" });
    } catch (error) {

        res.status(500).send(error);
    }
};


const updateShowtime = async (req, res) => {
    try {
        const { movieShowtime } = req.body;
        const { id } = req.params;

        const showtime = await Showtime.findByPk(id);
        await showtime.update({
            movieShowtime
        });
        res.status(200).send({ message: "update successfully", });

    } catch (error) {
        res.status(500).send(error);

    }
};

const deleteShowtime = async (req, res) => {
    try {
        const { id } = req.params;
        const listShowtime = await Seat.findAll({
            where: {
                showtimeId: id
            }
        });
        const listId = listShowtime.map(item => item.dataValues.id);
        Seat.destroy({ where: { id: listId } });
        Showtime.destroy({ where: { id } });
        res.status(200).send({ message: "delete successfully", });

    } catch (error) {
        res.status(500).send(error);

    }
};

const ticketRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const showtime = await Showtime.findOne({
            where: {
                id
            },
            include: Seat
        });

        res.status(200).send({ showtime });

    } catch (error) {
        res.status(500).send(error);
    }
};
const ticketBooking = async (req, res) => {
    try {
        const { listIdSeat, userId, movieId, movieShowtime, movieName, linkPoster } = req.body;



        const ticketNew = await Ticket.create({
            userId,
            movieId,
            movieShowtime,
            movieName,
            linkPoster
        });
        const ticket = { ...ticketNew.dataValues };



        for (let i = 0; i < listIdSeat.length; i++) {
            const seat = await Seat.findByPk(listIdSeat[i]);
            await seat.update({
                isPlaced: true,
                ticketId: ticketNew.dataValues.id
            });
        }


        const listSeat = await Seat.findAll({
            where: {
                id: listIdSeat
            }
        });

        ticket.listSeat = listSeat;


        res.send({ message: "success", ticket });
    } catch (error) {

        res.status(500).send(error);
    }
};

module.exports = { createShowtime, updateShowtime, deleteShowtime, ticketRoom, ticketBooking };