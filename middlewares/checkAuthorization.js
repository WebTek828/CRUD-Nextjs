const jwt = require("jsonwebtoken");
const checkAuthorization = async (req, res, next) => {
  console.log("Hey");
  if (!req.headers.authorization) {
    res.status(400).json({ msg: "Authentication failed" });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.PRIVATEKEY, async function (err, authorized) {
      console.log("Hello");
      req.userId = authorized.userId;
      if (err) {
        res.status(400).json({ msg: "Invalid token." });
      }
    });
  }
};

export default checkAuthorization;
