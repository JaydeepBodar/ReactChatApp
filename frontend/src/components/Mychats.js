import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Globalcontext } from "../store/context";
import { chatApi } from "../utils/config";
import { getSender } from "../utils/chatLogic";
import "./common.css"
import Groupchat from "./Groupchat";
import Usergroupcomponent from "./Usergroupcomponent";
const Mychats = () => {
  const [logged, setlogged] = useState();
  const { user, Chat, setChat, Selectedstate, setSelectedstate,fetchagain } =
    Globalcontext();
  const fetchchat = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: user.token,
      },
    };
    axios
      .get(`${chatApi}`, config)
      .then((response) => setChat(response.data))
      .catch((e) => console.log(e)); 
  };
  useEffect(() => {
    setlogged(JSON.parse(localStorage.getItem("userInfo")));
    fetchchat();
  }, [user,fetchagain]);
  return (
    <Box className="newchat">
        <Box className="chatheader">
          <Typography variant="h2" className="text">My chats</Typography>
           <Groupchat/>
        </Box>
        {Chat.map((chat,index) => {
          return (
            <Box
              onClick={()=>setSelectedstate(chat)}
              key={index}
              sx={{
                cursor: "pointer",
                backgroundColor: Selectedstate === chat ? "#F79540" : "#808080",
                color: Selectedstate === chat ? "#000" : "#fff",
                fontWeight:"900",
                borderRadius:"20px"
              }}
            >
              <Typography variant="body1">
                {!chat.isGroupchat ? logged && getSender(logged,chat.users) : <Usergroupcomponent users={chat}/>}
              </Typography>
            </Box>
          );
        })}
    </Box>
  ); 
};

export default Mychats;
