const Users = require("../../../models/Users");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { followerUserId, userId } = req.body;
      let follower = await Users.findById(followerUserId);
      const alreadyFollowing = follower.following.filter(
        (id) => id.toString() === userId
      );
      if (alreadyFollowing.length > 0) {
        const updatedFollower = follower.following.filter(
          (id) => id.toString() !== userId
        );
        follower.following = updatedFollower;
      } else {
        follower.following.push(userId);
      }
      await follower.save();
      res.status(200).json(follower.following);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
