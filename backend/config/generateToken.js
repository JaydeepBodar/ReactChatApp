const jwt = require("jsonwebtoken");
const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "4h" });
};
module.exports = generatetoken;
