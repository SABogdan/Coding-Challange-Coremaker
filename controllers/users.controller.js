const bycryptjs = require('bcryptjs');
const userService = require('../services/user.services');

exports.register = (req, res, next) => {
    const { password } = req.body;
    const salt = bycryptjs.genSaltSync(10);

    req.body.password = bycryptjs.hash(password, salt);

    userService.register(req.body, (err, result) => {
        if(err) return next(err);

        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
}

exports.login = (req, res, next) => {
    const { email, password } = req.body;

    userService.login(email, password, (err, result) => {
        if(err) return next(err);

        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "User Authorized!" });
};