const { Comment } = require("../models");

const createComment = async (req, res) => {

    try {
        const { content, userId, movieId } = req.body;

        const comment = await Comment.create({
            content, userId, movieId
        });

        res.status(201).send({ message: "create successfully", comment });

    } catch (error) {
        res.status(500).send(error);
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const commentUpdate = await Comment.findByPk(id);
        await commentUpdate.update({
            content
        });

        res.status(201).send({ message: "update successfully" });

    } catch (error) {
        res.status(500).send(error);
    }
};
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        await Comment.destroy({
            where: {
                id
            }
        });
        res.send({ message: "delete successfully" });

    } catch (error) {
        res.status(500).send(error);
    }
};
module.exports = { createComment, updateComment, deleteComment };