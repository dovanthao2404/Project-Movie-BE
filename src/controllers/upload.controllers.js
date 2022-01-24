const { cloudinary } = require("../config/cloudinary.config");

const uploadImage = (folderName) => async (req, res, next) => {
    try {


        const result = await cloudinary.uploader.upload(req.file.path, () => { }, {
            resource_type: "auto",
            folder: folderName,
            use_filename: true
        });

        req.resultImage = result;
        next();


    } catch (error) {

        res.status(500).send(error);
    }
};

module.exports = { uploadImage };