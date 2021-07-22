import connectDB from "../../../connectDB";

import Posts from "../../../models/Posts";

const handler = async (req, res) => {
  connectDB();
  if (req.method === "POST") {
    const { title, description, creator } = req.body;
    const newPost = await Posts.create({
      creator,
      title,
      description,
      likes: [],
      comments: [],
    });
    res.status(200).json({ newPost });
  } else if (req.method === "GET") {
    console.log("Get All Posts.");
    const allPosts = await Posts.find({});
    console.log(allPosts);
    res.status(200).json({ allPosts });
  } else {
    res.status(500).json({ msg: "This http request method is not supported." });
  }
};

export default handler;
