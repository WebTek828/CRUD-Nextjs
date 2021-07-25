const Posts = require("../../../models/Posts");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const deletedPost = await Posts.findByIdAndRemove(id);
    res.status(200).json("Deleted the post with provided id.");
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { title, description } = req.body;
    const post = await Posts.findById(id);
    post.title = title;
    post.description = description;
    await post.save();
    console.log(post);
    res.status(200).json({ post });
  }
};

export default handler;
