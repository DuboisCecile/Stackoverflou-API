const jwt = require("jsonwebtoken");
const { JWT_TOKEN_SECRET } = require("../env");

module.exports = (req, res, next) => {
  try {
    const {
      headers: { cookie },
    } = req;
    const values =
      cookie?.split(";").reduce((res, item) => {
        const data = item.trim().split("=");
        return { ...res, [data[0]]: data[1] };
      }, {}) || {};
    // console.log(values);
    const token = values?.token;
    // const token = req.headers.authorization.split(" ")[1];
    // console.log(req.headers.cookie);
    const decodedToken = jwt.verify(token, JWT_TOKEN_SECRET);
    const userId = decodedToken.user_id;
    req.currentUser = userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
