import connectDB from "../../../../connectDB";

const Posts = require("../../../../models/Posts");

const handler = async (req, res) => {
  connectDB();
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      Posts.findById(id)
        .populate("likes")
        .exec((err, post) => {
          const likedUsers = post.likes.map((user) => {
            const { username, email, _id, followers, following } = user;
            return { username, email, _id, followers, following };
          });
          res.status(200).json(likedUsers);
        });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
};

export default handler;
