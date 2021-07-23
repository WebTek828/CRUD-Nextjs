const Posts = require("../../../models/Posts");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    console.log(console.log(id));
    const deletedPost = await Posts.findByIdAndRemove(id);
    res.status(200).json("Deleted the post with provided id.");
  }
};

export default handler;
