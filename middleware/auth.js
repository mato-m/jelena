const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send({ status: 3, data: "Token nije pronađen" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ status: 3, data: "Greška pri verifikaciji tokena" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
