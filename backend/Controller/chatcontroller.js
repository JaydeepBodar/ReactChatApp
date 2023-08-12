const chatmodel = require("../Model/Chatmodel");
console.log("object", chatmodel);
const User = require("../Model/Users");
const accesschat = async (req, res) => {
  // for otheruser id
  const { userId } = req.body;
  if (!userId) {
    res.status(400).json({ message: "user not login" });
  }
  // populate working like sql join
  // first users for the login user and second user for another user
  else {
    let isChat = await chatmodel
      .find({
        isGroupchat: false,
        $and: [
          { users: { $elemMatch: { $eq: userId } } },
          { users: { $elemMatch: { $eq: req.user._id } } },
        ],
      })
      .populate("users")
      .populate("letestmessage");
    isChat = await User.populate(isChat, {
      path: "letestmessage.sender",
      select: "name pic email",
    });
    if (isChat.length > 0) {
      res.json(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender", 
        isGroupchat: false,
        users: [userId,req.user._id],
      };
      try {
        const createChat = await chatmodel.create(chatData);
        const fullchat = await chatmodel
          .findOne({ _id: createChat._id })
          .populate("users");
          console.log("fullchat",fullchat)
        res.status(200).json(fullchat); 
      } catch (e) {
        res.status(400).json({ message: "Chat not Found" });
      }
    }
  }
};
const fetchchat = async (req, res) => {
  chatmodel
    .find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
    .populate("users", "-password")
    .populate("groupAdmin")
    .populate("letestmessage")
    .then(async (results) => {
      results = await User.populate(results, {
        path: "letestmessage.sender",
        select: "name pic email",
      });
      res.status(200).json(results);
    });
};
const creategroup = async (req, res) => {
  if (!req.body.chatName || !req.body.users) {
    res.status(400).json({ message: "All field are required" });
  } else {
    try {
      let users = JSON.parse(req.body.users);
       users.push(req.user)
      const groupchat = await chatmodel.create({
        chatName: req.body.chatName,
        users: users,
        isGroupchat: true,
        groupAdmin: req.user,
      })
      const fullgroupchat = await chatmodel
        .findOne({ _id: groupchat._id })
        .populate("users").populate("groupAdmin")
      res.status(200).json(fullgroupchat);
    } catch (error) {
      res.status(400).json({ message: "error shown" })
    }
  }
};
const renamegroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatechat = await chatmodel
    .findByIdAndUpdate(chatId, { chatName }, { new: true })
    .populate("users")
    .populate("groupAdmin");
  if (updatechat) {
    res.status(200).json(updatechat);
  } else {
    res.status(400).json({ message: "chat not found" });v
  }
};
const addtogroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const addtogroup = await chatmodel.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
  ).populate("users").populate("groupAdmin")
  if (addtogroup) {
    res.status(200).json(addtogroup);
  } else {
    res.status(400).json({ message: "chat not found" });
  }
};
const removegroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const addtogroup = await chatmodel.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
  ).populate("users").populate("groupAdmin")
  if (addtogroup) {
    res.status(200).json(addtogroup);
  } else {
    res.status(400).json({ message: "chat not found" });
  }
};
module.exports = {
  accesschat,
  fetchchat,
  creategroup,
  renamegroup,
  addtogroup,
  removegroup,
};
