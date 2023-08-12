import { Avatar, Tooltip,Box } from "@mui/material";
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
                  isLastmessage(message, index, user._id) && (
                    <Tooltip title={val.sender.name}>
                      <Avatar name={val.sender.name} src={val.sender.pic} />
                    </Tooltip>
                  )}
              </div>
              <p
                style={{
                  display: "flex",
                  justifyContent: isSamesendermargin(
                    message,
                    val,
                    index,
                    user._id
                  ),
                  padding:"0 10px",
                  marginTop: isSameuser(message, val, index) ? 3 : 10,
                  marginBottom:"0"
                }}
              >
                <span
                  style={{
                    backgroundColor:
                      val.sender._id === user._id ? "red" : "green",
                    color: "#fff",
                    padding:"3px 8px",
                    borderRadius:"20px"
                  }}
                >
                  {val.content}
                </span>
              </p>
            </React.Fragment>
          );
        })}
    </ScrollableFeed>
  );
};

export default Scrollchat;
