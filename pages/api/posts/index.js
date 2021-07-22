const jwt = require("jsonwebtoken");
import connectDB from "../../../connectDB";

import Posts from "../../../models/Posts";

const handler = async (req, res) => {
  connectDB();
  if (req.method === "POST") {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, "PRIVATE_KEY", async function (err, authorized) {
        if (err) {
          res.status(400).json({ msg: "Invalid token." });
        } else {
          const { title, description, creator } = req.body;
          const newPost = await Posts.create({
            creator,
            title,
            description,
            likes: [],
            comments: [],
          });
          res.status(200).json({ newPost });
        }
      });
    }
  } else if (req.method === "GET") {
    const allPosts = await Posts.find({});
    res.status(200).json({ allPosts });
  } else {
    res.status(500).json({ msg: "This http request method is not supported." });
  }
};

export default handler;
