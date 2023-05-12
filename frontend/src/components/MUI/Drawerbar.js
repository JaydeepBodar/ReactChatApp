import React, { useState } from "react";
import { Button, List, ListItem, Drawer, Box } from "@mui/material";
import Input from "../Input";
import { toast } from "react-toastify";
import "./Drawerbar.css";
import Userlistitem from "./Userlistitem";
import axios from "axios";
import { chatApi } from "../../utils/config";
import { Globalcontext } from "../../store/context";
import Toascontainer from "./Toascontainer";
const Drawerbar = ({
  onClose,
  isOpen,
  search,
  handleclick,
  handleChange,
  searchResult,
}) => {
  const { Chat, setChat, Selectedstate, setSelectedstate, user } =
    Globalcontext();
  const config = {
    headers: { "Content-type": "application/json", Authorization: user.token },
  };
  const accessChat = (userId) => {
    axios
      .post(`${chatApi}`, {userId}, config)
      .then((res) => {
        console.log("res",res)
        if (
          (!Chat.find((chat) => chat._id === res.data._id),
          setChat([res.data, ...Chat]))
        )
          setSelectedstate(res.data);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  };
  return (
    <Box>
      <Drawer anchor="left" variant="temporary" open={isOpen} onClose={onClose}>
        <Box className="main-drawer">
          <Box className="search-user">
            <Input
              value={search}
              onChange={handleChange}
              placeholder="Search Contact..."
            />
            <Button variant="contained" color="success" onClick={handleclick}>
              Go
            </Button>
          </Box>
          {search &&
            searchResult?.map((user) => {
              return (
                <Userlistitem
                  userId={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              );
            })}
        </Box>
      </Drawer>
      <Toascontainer/>
    </Box>
  );
};

export default Drawerbar;
