const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import connectToDB from "../../connectDB";

const handler = async (req, res) => {
  connectToDB();
  if (req.method === "POST") {
    console.log("Oops:");
    console.log(req.body);
    const { email, username, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res
        .status(500)
        .json({ msg: "User with the provided email already exists." });
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newUser = await User.create({
          username,
          password: hash,
          email,
        });
        const userId = newUser._id;
        const token = jwt.sign({ username, email, userId }, "PRIVATE_KEY", {
          expiresIn: "1h",
        });
        res.status(200).json({ username, email, token, userId });
      });
    });
  }
};

export default handler;
