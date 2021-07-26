import checkAuthorization from "../../../middlewares/checkAuthorization";
const Posts = require("../../../models/Posts");

const handler = async (req, res) => {
  checkAuthorization(req, res);
  if (req.method === "DELETE") {
    console.log(`user id is ${req.userId}`);
    const { id } = req.query;
    const post = await Posts.findById(id);
    if (post.creator.userId.toString() !== req.userId) {
      res.status(400).json({ msg: "Authorization error." });
    } else {
      const deletedPost = await Posts.findByIdAndRemove(id);
      res.status(200).json("Deleted the post with provided id.");
    }
  } else if (req.method === "PUT") {
    console.log(`user id is ${req.userId}`);
    const { id } = req.query;
    try {
      const { title, description } = req.body;
      const post = await Posts.findById(id);
      if (post.creator.userId.toString() !== req.userId) {
        res.status(400).json({ msg: "Authorization error." });
      } else {
        post.title = title;
        post.description = description;
        await post.save();
        res.status(200).json({ post });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong." });
    }
  }
};

export default handler;
