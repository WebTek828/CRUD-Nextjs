const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import connectToDB from "../../connectDB";

const handler = async (req, res) => {
  connectToDB();
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ msg: "User with the provided email doesn't exist." });
    } else {
      const { username, email } = user;
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { username, email, userId: user._id },
            process.env.PRIVATEKEY,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({ token, username, email, userId: user._id });
        } else {
          res.status(400).json({ msg: "Incorrect password." });
        }
      });
    }
  }
};

export default handler;
