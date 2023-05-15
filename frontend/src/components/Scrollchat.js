import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastmessage,
  isSamesender,
  isSamesendermargin,
  isSameuser,
} from "../utils/chatLogic";
import { Globalcontext } from "../store/context";

const Scrollchat = ({ message }) => {
  const { user } = Globalcontext();
  return (
    <ScrollableFeed>
      {message &&
        message.map((val, index) => {
          console.log("message", val);
          return (
            <React.Fragment>
              <div key={index}>
                {isSamesender(message, val, index, user._id) &&
                  (isLastmessage(message, index, user._id) && (
                    <Tooltip title={val.sender.name}>
                      <Avatar name={val.sender.name} src={val.sender.pic} />
                    </Tooltip>
                  ))}
              </div>
              <span
                style={{
                  backgroundColor:
                    val.sender._id === user._id ? "red" : "green",
                  color: "#fff",
                  marginLeft: isSamesendermargin(message, val, index, user._id),
                  marginTop: isSameuser(message, val, index) ? 3 : 10,
                }}
              >
                {val.content}
              </span>
            </React.Fragment>
          );
        })}
    </ScrollableFeed>
  );
};

export default Scrollchat;
