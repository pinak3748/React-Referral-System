const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { username, email, password, referral } = req.body;

  let decode_id = Buffer.from(referral, "base64").toString();

  User.findById(decode_id)
    .then(async () => {
      User.findOne({ email }, function (err, res) {
        if (res) {
          return res.status(400).json({
            msg: "User Already Exists",
          });
        }
      });

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    })
    .catch(() => {
      res.status(500).json({ msg: "Invalid referral" });
    });
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        msg: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (e) {
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

exports.me = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    let buff = Buffer.from(user.id, "utf-8");
    let encode_id = buff.toString("base64");

    res.json({ user, encode_id });
  } catch (e) {
    res.send({ msg: "Error in Fetching user" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json({
    msg: "User Signout Successfully",
  });
};
