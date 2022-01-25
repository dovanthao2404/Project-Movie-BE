const { Cinema, Room, CinemaConnectMovie, Movie, sequelize } = require("../models");
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
        res.status(500).send(error);
    }
};

const getCinemaDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const cinema = await Cinema.findOne({
            where: {
                id
            },
            include: [Room]
        });

        const results = await sequelize.query(`
            SELECT Movies.id,name,poster,alias,description,isHot,isNowShowing,Movies.createdAt,Movies.updatedAt FROM CinemaConnectMovies
            Right JOIN Movies ON Movies.id = CinemaConnectMovies.movieId
            where cinemaId = ${id};
        `);

        const listMovie = results[0];

        cinema.dataValues.Movies = listMovie;

        res.send(cinema);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getRoomByCinema = async (req, res) => {
    try {
        const id = req.params.id;
        const cinema = await Cinema.findOne({
            where: {
                id
            },
            include: [Room]
        });
        res.send(cinema);
    } catch (error) {
        res.status(500).send(error);
    }
};


const getMovieByCinema = async (req, res) => {
    try {
        const id = req.params.id;
        const cinema = await Cinema.findOne({
            where: {
                id
            },
        });


        const results = await sequelize.query(`
            SELECT Movies.id,name,poster,alias,description,isHot,isNowShowing,Movies.createdAt,Movies.updatedAt FROM CinemaConnectMovies
            Right JOIN Movies ON Movies.id = CinemaConnectMovies.movieId
            where cinemaId = ${id};
        `);

        const listMovie = results[0];

        cinema.dataValues.Movies = listMovie;

        res.send(cinema);
    } catch (error) {
        res.status(500).send(error);
    }
};

const uploadLogo = async (req, res) => {
    try {
        const { resultImage } = req;
        const { id } = req.params;
        await Cinema.update(
            { logo: resultImage.url },
            { where: { id } }
        );
        res.status(201).send({ message: "upload logo successfully" });
    } catch (error) {
        res.status(500).send(error);

    }
};


module.exports = { createCinema, updateCinema, deleteCinema, getCinemaDetail, getRoomByCinema, getMovieByCinema, uploadLogo };