const Message = require("../Model/Message");
const Users = require("../Model/Users");
const Chatmodel = require("../Model/Chatmodel");
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content && !chatId) {
    console.log("Invalid data pass");
  }
  const newmessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newmessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await Users.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chatmodel.findByIdAndUpdate(req.body.chatId, {
      letestmessage: message,
    });
    res.status(200).json(message);
  } catch (e) {
    res.status(400).json({ message: "chat not found" });
  }
};
const fetchMessage = async (req, res) => {
    try{
        const message = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");
        res.status(200).json(message)
    }catch(e){
        res.status(400).json({message:"chat not found"})
    }
};
module.exports = { sendMessage, fetchMessage };
