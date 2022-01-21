const { Banner } = require("../models");
const createBanner = async (req, res, next) => {
    try {

        if (!req.body.trailer) {
            res.status(500).send("Trailer is require");
        }
        const { resultImage } = req;

        const newBanner = await Banner.create({
            image: resultImage.url,
            trailer: req.body.trailer
        });
        res.send({ message: "Create successfully", banner: newBanner });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllBanner = async (req, res) => {
    try {
        const result = await Banner.findAll();
        res.send(result);

    } catch (error) {
        res.status(500).send(error);

    }
};

const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.body.trailer) {
            res.status(500).send("Trailer is require");
        }
        const { resultImage } = req;
        const bannerByPk = await Banner.findByPk(id);
        bannerByPk.update({
            image: resultImage.url || bannerByPk.dataValues.url,
            trailer: req.body.trailer || bannerByPk.dataValues.trailer
        });
        res.send({ message: "Update success", banner: bannerByPk });
    } catch (error) {
        res.status(500).send(error);
    }
};
const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        await Banner.destroy({
            where: {
                id
            }
        });
        res.send({ message: "delete successfully" });

    } catch (error) {
        res.status(500).send(error);
    }
};
module.exports = { createBanner, getAllBanner, updateBanner, deleteBanner };