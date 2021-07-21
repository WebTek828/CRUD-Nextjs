import connectDB from "../../../connectDB";

import Posts from "../../../models/Posts";

const handler = async (req, res) => {
  connectDB();
  if (req.method === "POST") {
    const { username, title, description } = req.body;
    console.log(req.body);

    const newPost = await Posts.create({
      creator: {
        username,
      },
      title,
      description,
      liked: [],
      comments: [],
    });
    res.status(200).json({ newPost });
  } else if (req.method === "GET") {
    const allPosts = await Posts.find({});
    res.status(200).json({ allPosts });
  } else {
    res.status(500).json({ msg: "This http request method is not supported." });
  }
};

export default handler;
