const jwt = require("jsonwebtoken");
const checkAuthorization = (handler) => {
  return async (req, res) => {
    if (
      req.method === "POST" ||
      req.method === "PUT" ||
      req.method === "DELETE"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        jwt.verify(
          token,
          process.env.PRIVATEKEY,
          async function (err, authorized) {
            req.userId = authorized.userId;
            if (err) {
              res.status(400).json({ msg: "Invalid token." });
            }
          }
        );
      }
    }

    return handler(req, res);
  };
};

export default checkAuthorization;
