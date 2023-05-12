const mongoose = require("mongoose");
const Message = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chatmodels" },
  },
  { timestamps: true }
);
module.exports=mongoose.model('Message',Message)