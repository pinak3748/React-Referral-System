const {check, validationResult} = require('express-validator');


exports.register_validation = [
    check("username", "username should have 3 char").isLength({min: 3}),
    check("email", "Please provide valid email").isEmail(),
    check("password", "Password should have least 6 char")
        .isLength({min: 6})
        .trim(),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({msg: errors.array()[0].msg});
        next();
    },
];

exports.login_validation = [

    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should have least 6 char")
        .isLength({min: 6})
        .trim(),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({msg: errors.array()[0].msg});
        next();
    },
];