const User = require("../Model/Users");
const bcrypt = require("bcrypt");
const generatetoken = require("../config/generateToken");
// signup api
const registeruser = async (req, res) => {
  console.log("obj", req.body);
  const { name, email, password, pic } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User is Alreday exists" });
  } else {
    const user = await User.create({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      pic: pic,
    });
    const token = generatetoken(user._id);
    res.status(200).json({
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      token: token,
    });
  }
};
// login api
const loginuser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const comparepassword = await bcrypt.compare(password, user.password);
    if (!comparepassword) {
      res.status(403).json({ message: "wrong password try again" });
    }
    if (user && comparepassword) {
      const token = generatetoken(user._id);
      user.token = token;
      console.log("token", token);
      console.log(user);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        token: user.token,
      });
    }
  } else {
    res.status(405).json({ message: "User not Found" });
  }
};
// fetch user
// search user
const searchUser = async (req, res) => {
  setTimeout(async () => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword);
    console.log("object", users);
    res.json(users);
  },300);
};
module.exports = { registeruser, loginuser, searchUser };
