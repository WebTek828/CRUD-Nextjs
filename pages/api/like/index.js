const Posts = require("../../../models/Posts");
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { postId, userId } = req.body;
      const post = await Posts.findById(postId);
      if (post) {
        post.likes.push(userId);
        await post.save();
        res.status(200).json({ post });
      } else {
        res
          .status(400)
          .json({ msg: "Post with the provided id can't be found." });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err });
    }
  }
};

export default handler;
