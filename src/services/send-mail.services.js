
const nodemailer = require("nodemailer");
const { generatePassword } = require("../utils/generate-password");
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "projectmovie.sieucapvippro@gmail.com",
        pass: "sieucap@13"
    }
});


const sendMail = async (req, res, next) => {
    const { email } = req.body;
    const password = generatePassword;
    let details = {
        from: "projectmovie.sieucapvippro@gmail.com",
        to: email,
        subject: "Password movie",
        text: `Your account recovery password is ${password}`
    };

    await mailTransporter.sendMail(details, (err) => {
        if (!err) {
            req.password = password;
            next();
        } else {
            res.status(500).send(err);
        }
    });

};
module.exports = {
    sendMail
};