const Posts = require("../../../models/Posts");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const deletedPost = await Posts.findByIdAndRemove(id);
    res.status(200).json("Deleted the post with provided id.");
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { title, description } = req.body;
    const updatedPost = await Posts.findByIdAndUpdate(id, {
      title,
      description,
    });
    console.log(updatedPost);
    res.status(200).json(updatedPost);
  }
};

export default handler;
