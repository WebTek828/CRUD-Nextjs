const jwt = require("jsonwebtoken");
const checkAuthorization = (handler) => {
  return async (req, res) => {
    if (req.method === "POST") {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        jwt.verify(token, "PRIVATE_KEY", async function (err, authorized) {
          if (err) {
            res.status(400).json({ msg: "Invalid token." });
          }
        });
      }
    }

    return handler(req, res);
  };
};

export default checkAuthorization;
