const mongoose = require("mongoose");
const Chatmodel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupchat: { type: Boolean, default: false },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", unique : true 
    }],
    letestmessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    groupimg:{
      default:"https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png",
      type:String
    }
  },
  { timestamps: true }
);
module.exports=mongoose.model('chatmodels',Chatmodel)