const Posts = require("../../../models/Posts");

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    const deletedPost = await Posts.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  }
};

export default handler;
