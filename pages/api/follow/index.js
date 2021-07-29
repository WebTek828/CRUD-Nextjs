const Users = require("../../../models/Users");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { followerUserId, userId } = req.body;
      const [follower, user] = await Users.find({
        _id: [followerUserId, userId],
      });
      follower.following.push(userId);
      user.followers.push(followerUserId);
      await follower.save();
      await user.save();
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
