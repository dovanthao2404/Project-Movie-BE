
const { Movie, Cinema, CinemaConnectMovie, Comment } = require("../models");
const slug = require("slug");
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
        console.log(error);
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

        } else {
            await Movie.destroy({
                where: {
                    id
                }
            });
            res.status(400).send({ message: "delete successfully" });
        }
    } catch (error) {

    }
};

module.exports = { createMovie, updateMovie, removeMovie };