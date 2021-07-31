const Users = require("../../../models/Users");

function follow(obj, followType, uid) {
  const alreadyFollowing = obj[followType].filter(
    (id) => id.toString() === uid
  );

  if (alreadyFollowing.length > 0) {
    const updatedFollow = obj[followType].filter((id) => id.toString() !== uid);
    obj[followType] = updatedFollow;
  } else {
    obj[followType].push(uid);
  }
}

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { followerUserId, userId } = req.body;

      const follower = await Users.findById(followerUserId);
      const beingFollowedUser = await Users.findById(userId);

      follow(follower, "following", userId);
      follow(beingFollowedUser, "followers", followerUserId);
      await follower.save();
      await beingFollowedUser.save();
      res.status(200).json("Success");
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
