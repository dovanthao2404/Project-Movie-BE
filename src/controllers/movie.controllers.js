
const { Movie, Cinema, CinemaConnectMovie, Comment, Showtime, Room } = require("../models");
const slug = require("slug");
const { Op } = require("sequelize");

const createMovie = async (req, res) => {
    try {
        const { name, trailer, description, isHot, isNowShowing } = req.body;
        const alias = slug(name);
        const newMovie = await Movie.create({
            name,
            alias,
            trailer,
            description,
            isHot,
            isNowShowing
        });

        res.status(201).send({ message: "create successfully", movie: newMovie });

    } catch (error) {
        res.status(500).send(error);
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, trailer, description, isHot, isNowShowing } = req.body;
        const alias = slug(name);
        const movie = await Movie.findByPk(id);
        await movie.update({
            name, trailer, description, isHot, isNowShowing, alias
        });
        res.status(200).send({ message: "update successfully" });
    } catch (error) {

        res.status(500).send(error);
    }
};

const removeMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const listCineConnectMovie = await CinemaConnectMovie.findAll({
            where: {
                movieId: id
            }
        });
        const listComment = await Comment.findAll({
            where: {
                movieId: id
            }
        });
        if (listComment.length || listCineConnectMovie.length) {
            res.status(400).send({ message: "can not delete" });
            return;
        } else {
            await Movie.destroy({
                where: {
                    id
                }
            });
            res.status(200).send({ message: "delete successfully" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const getListMovie = async (req, res) => {
    try {
        const listMovie = await Movie.findAll();
        res.send(listMovie);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getListComment = async (req, res) => {
    try {
        const { id } = req.params;
        const listMovie = await Movie.findOne({
            where: {
                id
            },
            include: [Comment]
        });
        res.send(listMovie);
    } catch (error) {
        res.status(500).send(error);
    }
};

const searchMovie = async (req, res) => {
    try {
        const { keyword } = req.query;
        const listMovie = await Movie.findAll(
            {
                where: {
                    name: {
                        [Op.substring]: keyword
                    }
                }
            }
        );

        res.send(listMovie);

    } catch (error) {
        res.status(500).send(error);
    }
};

const uploadPoster = async (req, res) => {
    try {
        const { resultImage } = req;
        const { id } = req.params;
        await Movie.update(
            { poster: resultImage.url },
            { where: { id } }
        );
        res.status(201).send({ message: "upload poster successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};

const moviePagination = async (req, res) => {
    try {
        const { pageSize, pageCurrent } = req.query;

        const { count, rows } = await Movie.findAndCountAll({
            offset: (+pageCurrent - 1) * pageSize,
            limit: +pageSize
        });
        const totalPage = Math.ceil(count / pageSize);

        res.send({ totalPage, rows });

    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movieDetail = await Movie.findOne({
            where: {
                id
            },
            include: [
                Comment
            ]
        });

        const listCineConnect = await CinemaConnectMovie.findAll({
            where: {
                movieId: id
            },
            attributes: ["cinemaId"]
        });

        let results = [];
        for (let i = 0; i < listCineConnect.length; i++) {
            console.log(listCineConnect[i].dataValues.cinemaId);
            const result = await Cinema.findOne({
                where: {
                    id: listCineConnect[i].dataValues.cinemaId
                },
                include: [
                    {
                        model: Room,
                        include: {
                            model: Showtime,
                            where: { movieId: id }
                        }
                    }
                ]
            });
            results.push(result);
        }

        movieDetail.dataValues.listShowtime = results;

        res.send(movieDetail);


    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { createMovie, updateMovie, removeMovie, getListMovie, getListComment, searchMovie, uploadPoster, moviePagination, getDetailMovie };